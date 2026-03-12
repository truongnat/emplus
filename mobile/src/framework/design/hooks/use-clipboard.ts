import { useState, useCallback } from 'react'
import * as Clipboard from 'expo-clipboard'
import { useSharedValue, withSpring } from 'react-native-reanimated'

/**
 * Custom hook xử lý việc copy vào clipboard kèm theo feedback UI (animation + state).
 */
export function useClipboardWithFeedback() {
  const [isCopied, setIsCopied] = useState(false)
  const feedbackScale = useSharedValue(1)

  const copy = useCallback(async (text: string) => {
    if (!text) return
    
    await Clipboard.setStringAsync(text)
    setIsCopied(true)
    
    // Animation feedback
    feedbackScale.value = withSpring(1.2, { damping: 10 }, () => {
      feedbackScale.value = withSpring(1)
    })

    setTimeout(() => setIsCopied(false), 2000)
  }, [feedbackScale])

  return { isCopied, copy, feedbackScale }
}
