declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void
    dataLayer: unknown[]
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

export function useAnalytics() {
  const isEnabled = (): boolean => {
    return !!GA_MEASUREMENT_ID && typeof window !== 'undefined' && !!window.gtag
  }

  const trackPageView = (path: string, title?: string): void => {
    if (!isEnabled()) return

    window.gtag('config', GA_MEASUREMENT_ID!, {
      page_path: path,
      page_title: title
    })
  }

  const trackEvent = (eventName: string, params?: Record<string, unknown>): void => {
    if (!isEnabled()) return

    window.gtag('event', eventName, params)
  }

  const trackCalculatorUsed = (brokerType: string): void => {
    trackEvent('calculator_used', {
      event_category: 'engagement',
      event_label: brokerType
    })
  }

  const trackFileUploaded = (fileType: string): void => {
    trackEvent('file_uploaded', {
      event_category: 'engagement',
      event_label: fileType
    })
  }

  const trackRegistration = (): void => {
    trackEvent('sign_up', {
      method: 'email'
    })
  }

  const trackLogin = (): void => {
    trackEvent('login', {
      method: 'email'
    })
  }

  const trackCtaClick = (ctaName: string): void => {
    trackEvent('cta_click', {
      event_category: 'engagement',
      event_label: ctaName
    })
  }

  const trackFaqExpanded = (question: string): void => {
    trackEvent('faq_expanded', {
      event_category: 'engagement',
      event_label: question
    })
  }

  return {
    isEnabled,
    trackPageView,
    trackEvent,
    trackCalculatorUsed,
    trackFileUploaded,
    trackRegistration,
    trackLogin,
    trackCtaClick,
    trackFaqExpanded
  }
}
