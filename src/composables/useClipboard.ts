import { ref } from 'vue'

export function formatPlainAmount(value: number): string {
  const fixed = Math.abs(value).toFixed(2)
  return value < 0 ? `-${fixed}` : fixed
}

function fallbackCopy(text: string): boolean {
  try {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(textarea)
    return ok
  } catch {
    return false
  }
}

export function useClipboard() {
  const copiedKey = ref<string | null>(null)

  const copy = async (key: string, value: number): Promise<void> => {
    const text = formatPlainAmount(Number(value))
    let copied = false
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(text)
        copied = true
      } else {
        copied = fallbackCopy(text)
      }
    } catch {
      copied = fallbackCopy(text)
    }
    if (copied) {
      copiedKey.value = key
      setTimeout(() => {
        if (copiedKey.value === key) copiedKey.value = null
      }, 1500)
    }
  }

  return { copy, copiedKey }
}
