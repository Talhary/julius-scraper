import React, { useEffect, useRef, ChangeEvent, TextareaHTMLAttributes } from 'react';

interface AutoGrowTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const AutoGrowTextArea: React.FC<AutoGrowTextAreaProps> = ({ value, onChange, ...props }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      {...props}
      style={{ resize: 'none', overflow: 'hidden', minHeight: '20px' }}
    />
  );
};

export default AutoGrowTextArea;
