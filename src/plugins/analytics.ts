import type { Router } from 'vue-router'
import { useAnalytics } from '@/composables/useAnalytics'

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined

function loadGoogleAnalytics(measurementId: string): void {
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.gtag('js', new Date())
  window.gtag('config', measurementId, {
    send_page_view: false
  })
}

export function initAnalytics(router: Router): void {
  if (!GA_MEASUREMENT_ID) {
    console.info('[Analytics] GA_MEASUREMENT_ID not set, analytics disabled')
    return
  }

  loadGoogleAnalytics(GA_MEASUREMENT_ID)

  const { trackPageView } = useAnalytics()

  router.afterEach((to) => {
    trackPageView(to.fullPath, to.meta.title as string | undefined)
  })

  console.info('[Analytics] Google Analytics initialized')
}

export function analyticsPlugin(router: Router) {
  return {
    install() {
      initAnalytics(router)
    }
  }
}
