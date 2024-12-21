import { parse } from "dotenv";

export const ChatGpt4o = async (conversationID, text, bot, chatId) => {
  try {
    if (!conversationID) return { err: true, msg: "required conversation id" };
    if (!text) return { err: true, msg: "required Text" };
    const response = await fetch("https://api.julius.ai/api/chat/message", {
      headers: {
        accept: "*/*",
        "accept-language": "en-GB,en;q=0.9,en-US;q=0.8",
        authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InJoM0dwdVZXd2JMMTJpYnBtamlxWCJ9.eyJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vdXNlcl9lbWFpbCI6InRhbGhhcmlhejc4M0BnbWFpbC5jb20iLCJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vdXNlcl9pcCI6IjgxLjE3LjEyMi4yMTIiLCJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vdXNlcl9jb3VudHJ5Q29kZSI6IklOIiwiaHR0cHM6Ly9jaGF0d2l0aHlvdXJkYXRhLmlvL3VzZXJfY29udGluZW50Q29kZSI6IkFTIiwiaHR0cHM6Ly9jaGF0d2l0aHlvdXJkYXRhLmlvL2VtYWlsX3ZlcmlmaWVkIjp0cnVlLCJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8vc3Vic2NyaXB0aW9uX3N0YXR1cyI6ImFjdGl2ZSIsImh0dHBzOi8vY2hhdHdpdGh5b3VyZGF0YS5pby9wcm9kdWN0IjoicHJvZF9PN1F1dTdlSlZ6cXE1TiIsImh0dHBzOi8vY2hhdHdpdGh5b3VyZGF0YS5pby9jcmVhdGVkX2F0IjoiMjAyNC0xMi0xM1QxMDoxNToyMy43ODJaIiwiaXNzIjoiaHR0cHM6Ly9hdXRoLmp1bGl1cy5haS8iLCJzdWIiOiJnb29nbGUtb2F1dGgyfDEwMDYyMzczOTE0ODQzNzYwNzI3NyIsImF1ZCI6WyJodHRwczovL2NoYXR3aXRoeW91cmRhdGEuaW8iLCJodHRwczovL2NoYXR3aXRoeW91cmRhdGEudXMuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTczNDc3Nzg2NCwiZXhwIjoxNzM3MzY5ODY0LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIG9mZmxpbmVfYWNjZXNzIiwiYXpwIjoiUVhUc1dEbHR5VEkxVnJSSE9RUlJmVHRHMWNmNFlESzgifQ.lJqP8C6J2-pTBmKb6G2PoioX56NmW1Ecudv_ApRRpNzXYQbjWJdIrnmx3H5rOeenGQUKovTeVvwzwnLUPAvscLjc8OkMUxsPQUtrai_P-FwhrIYdZohlefHPZgTl457xAZLRzzV8Crp5-jmS0ojwX0FyI87C_4FqPGOH_3y91xpX6aXqTFWAh-mRXg4Y8eZPhXaC3fyTqhSGpUhdBFHiVvhWa3q6WqZFm4xPGQhGgMNnvY8VqgRPMsaOdT7LK7JPoAt1_DqHt9wX6em3F3YeC6saAyKuWxriVi2VwdVwDRBAUDV18KJecsi1MPQtCxl77hLZWn_Slh9SX7HJcxAR3Q",
        "content-type": "application/json",
        "conversation-id": conversationID,
        "cypress-test-id": "0a105805",
        "ga-client-id": "2092621048.1734420801",
        gcs: "true",
        "interactive-charts": "true",
        "is-demo": "null",
        "is-native": "false",
        platform: "web",
        priority: "u=1, i",
        "request-id": "undefined",
        "sec-ch-ua":
          '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "use-dict": "true",
        "visitor-id": "undefined",
        Referer: "https://julius.ai/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: JSON.stringify({
        message: {
          content: text,
          role: "user",
        },
        provider: "GPT-4o",
        chat_mode: "auto",
        client_version: "20240130",
        theme: "dark",
        new_images: [],
        new_attachments: {},
        dataframe_format: "json",
        selectedModels: null,
      }),
      method: "POST",
    });
    if (!response.body) {
      throw new Error("ReadableStream not supported or empty response body");
    }
    const { message_id } = await bot.sendMessage(chatId, "bot thinking...");
    console.log(message_id);

    const reader = response.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let done = false;

    console.log("Streaming packets:");
    let msg = "";
    let i = 0;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;

      if (value) {
        const chunk = decoder.decode(value, { stream: true });
        console.log(chunk);
        let msg_data = null;
        try {
          msg_data = JSON.parse(chunk);
        } catch (err) {
          console.log(err);
        }
        if (msg_data?.function_metadata) {
          const msgofPython = msg_data?.arguments?.python;
          msg += " ```python\n" + msgofPython + "``` ";
        }
        if (msg_data?.name == "search_internet") {
          const data = JSON.parse(msg_data?.content);
          console.log(data);
          for (const source of data?.sources) {
            const formattedMessage = `<b>${source.title}</b>\n\n<a href="${source.favicon}">✅</a> <i>${source.snippet}</i>\n\n🔗 <a href="${source.link}">Read more here</a>`;
            await bot.sendMessage(chatId, formattedMessage, {
              parse_mode: "HTML",
            });
          }
          return;
        }
        if (msg_data?.content) {
          msg += msg_data.content;
          i = i + 1;
          //   await
          if (i % 9 == 0)
            bot.editMessageText(msg, {
              chat_id: chatId,
              message_id: message_id,
            });
          //   console.log(msg);
        }
        //   console.log(chunk); // Log the chunk, which is part of the streaming response.
      }
    }

    bot.editMessageText(msg, {
      chat_id: chatId,
      message_id: message_id,
      parse_mode: "Markdown",
    });
    return { err: false, msg: "Stream completed" };
  } catch (error) {
    console.log(error);
    return { err: true, msg: error?.message || "failed to create chat" };
  }
};
