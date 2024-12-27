'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AutoGrowTextArea } from '@/components/auto-grow';

// Import languages
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import cpp from 'react-syntax-highlighter/dist/esm/languages/hljs/cpp';
import csharp from 'react-syntax-highlighter/dist/esm/languages/hljs/csharp';
import ruby from 'react-syntax-highlighter/dist/esm/languages/hljs/ruby';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import swift from 'react-syntax-highlighter/dist/esm/languages/hljs/swift';
import go from 'react-syntax-highlighter/dist/esm/languages/hljs/go';
import rust from 'react-syntax-highlighter/dist/esm/languages/hljs/rust';
import typescript from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript';

// Register languages
[
  { name: 'javascript', lang: js },
  { name: 'python', lang: python },
  { name: 'java', lang: java },
  { name: 'cpp', lang: cpp },
  { name: 'csharp', lang: csharp },
  { name: 'ruby', lang: ruby },
  { name: 'php', lang: php },
  { name: 'swift', lang: swift },
  { name: 'go', lang: go },
  { name: 'rust', lang: rust },
  { name: 'typescript', lang: typescript },
].forEach(({ name, lang }) => SyntaxHighlighter.registerLanguage(name, lang));

interface ChatMessage {
  content: string;
  sender: 'user' | 'bot';
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (!chatId) {
      const startResponse = await fetch('/api/start');
      const startData = await startResponse.json();
      setChatId(startData.id);
      await sendMessage(input, startData.id);
    } else {
      setMessages((prev) => [...prev, { content: input, sender: 'user' }]);
      setInput('');
      await sendMessage(input, chatId);
    }
  };

  const sendMessage = async (content: string, chatId: string) => {
    const response = await fetch('/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, conversationId: chatId }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    setMessages((prev) => [...prev, { content: '', sender: 'bot' }]);

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      lines.forEach((line) => {
        if (line.startsWith('data: ')) {
          try {
            const jsonObject = JSON.parse(line.replace('data: ', '').trim());
            if (jsonObject.content) {
              setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].content += jsonObject.content;
                return newMessages;
              });
            }
          } catch (err) {
            console.error('Error parsing JSON:', err);
          }
        }
      });
    }
  };

  const convertSpecialContent = (content: string) => {
    const parts = content.split(/(\$\$[^$]+\$\$|\$[^$]+\$|```[\s\S]+?```|`[^`]+`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        return <BlockMath key={index}>{part.slice(2, -2)}</BlockMath>;
      }
      if (part.startsWith('$') && part.endsWith('$')) {
        return <InlineMath key={index}>{part.slice(1, -1)}</InlineMath>;
      }
      if (part.startsWith('```') && part.endsWith('```')) {
        const match = part.match(/```(\w+)?\n([\s\S]+?)```/);
        if (!match) return part;
        const [, language, code] = match;
        return (
          <SyntaxHighlighter
            key={index}
            language={language || 'text'}
            style={atomOneDark}
            customStyle={{ background: 'transparent' }}
          >
            {code.trim()}
          </SyntaxHighlighter>
        );
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={index} className="bg-secondary text-secondary-foreground rounded px-1">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-100 p-4">
      <Card className="w-full max-w-2xl bg-gray-800 text-gray-100">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Chat</CardTitle>
        </CardHeader>
        <CardContent className="h-[60vh] overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.sender === 'user' ? 'bg-blue-700 text-blue-100' : 'bg-gray-700 text-gray-100'
                }`}
              >
                {convertSpecialContent(message.content)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full items-end space-x-2">
            <AutoGrowTextArea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow bg-gray-800 text-gray-100"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-500">Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
