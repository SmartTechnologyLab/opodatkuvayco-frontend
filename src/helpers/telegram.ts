/**
 * Opens Telegram link with deep link support
 * If Telegram app is installed, opens in app; otherwise opens in web
 *
 * @param username - Telegram username (without @) or full URL
 */
export function openTelegramLink(username: string): void {
  // Remove @ if present
  const cleanUsername = username.replace('@', '').replace('https://t.me/', '').replace('http://t.me/', '')

  // Try to open in Telegram app first
  const deepLink = `tg://resolve?domain=${cleanUsername}`
  const webLink = `https://t.me/${cleanUsername}`

  // Detect if mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (isMobile) {
    // On mobile, try deep link first
    window.location.href = deepLink

    // Fallback to web after a delay if app didn't open
    setTimeout(() => {
      window.open(webLink, '_blank')
    }, 1500)
  } else {
    // On desktop, open web version (it will prompt to open in app if installed)
    window.open(webLink, '_blank')
  }
}

/**
 * Opens Telegram chat by ID with deep link support
 *
 * @param chatId - Telegram chat ID (with or without -)
 */
export function openTelegramChat(chatId: string): void {
  // Remove leading - if present and convert to positive number
  const cleanChatId = chatId.replace('-100', '')

  // For private channels/groups, use the c/ format
  const webLink = `https://t.me/c/${cleanChatId}`

  // On mobile, try to construct deep link
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

  if (isMobile) {
    const deepLink = `tg://resolve?domain=c/${cleanChatId}`
    window.location.href = deepLink

    // Fallback to web
    setTimeout(() => {
      window.open(webLink, '_blank')
    }, 1500)
  } else {
    window.open(webLink, '_blank')
  }
}

/**
 * Universal Telegram link handler
 * Automatically detects the type of link and opens appropriately
 *
 * @param event - Click event
 * @param link - Telegram link or username
 */
export function handleTelegramLink(event: Event, link: string): void {
  event.preventDefault()

  // Check if it's a chat ID link
  if (link.includes('web.telegram.org') && link.includes('#-')) {
    const match = link.match(/#(-?\d+)/)
    if (match) {
      openTelegramChat(match[1])
      return
    }
  }

  // Otherwise treat as username
  openTelegramLink(link)
}
