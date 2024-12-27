
import React, { useRef, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

interface AutoGrowTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number
  maxRows?: number
}

export const AutoGrowTextArea = React.forwardRef<HTMLTextAreaElement, AutoGrowTextAreaProps>(
  ({ className, minRows = 1, maxRows = 5, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      const textarea = textareaRef.current
      if (!textarea) return

      const adjustHeight = () => {
        textarea.style.height = 'auto'
        const singleRowHeight = parseInt(getComputedStyle(textarea).lineHeight)
        const desiredHeight = Math.min(
          Math.max(textarea.scrollHeight, singleRowHeight * minRows),
          singleRowHeight * maxRows
        )
        textarea.style.height = `${desiredHeight}px`
      }

      textarea.addEventListener('input', adjustHeight)
      adjustHeight()

      return () => {
        textarea.removeEventListener('input', adjustHeight)
      }
    }, [minRows, maxRows])

    return (
      <Textarea
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          // textareaRef.current = node
        }}
        className={cn('resize-none overflow-hidden', className)}
        {...props}
      />
    )
  }
)

AutoGrowTextArea.displayName = 'AutoGrowTextArea'

