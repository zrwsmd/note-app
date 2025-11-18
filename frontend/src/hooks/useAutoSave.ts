import { useEffect, useRef } from 'react'

export function useAutoSave(
  callback: () => void,
  delay: number = 30000, // 30秒
  dependencies: any[] = []
) {
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // 清除之前的定时器
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    // 设置新的定时器
    timeoutRef.current = setTimeout(() => {
      callback()
    }, delay)

    // 清理函数
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, dependencies)
}
