import { onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

export interface SeoMetaConfig {
  title?: string
  description?: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogUrl?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonical?: string
  robots?: string
}

const defaultConfig: SeoMetaConfig = {
  title: 'Оподаткувайко - Автоматизований розрахунок податків з інвестицій',
  description:
    'Інноваційний інструмент для автоматизованого розрахунку податків з інвестиційної діяльності. Підтримка Interactive Brokers та Freedom Finance.',
  keywords:
    'податки з інвестицій, розрахунок податків інвестиції, Interactive Brokers податки, Freedom Finance податки, брокерський звіт, податки трейдинг',
  ogImage: 'https://opodatkuv.ayco.group/og-image.jpg',
  robots: 'index, follow'
}

export function useSeo(config: SeoMetaConfig = {}) {
  const router = useRouter()
  const siteUrl = 'https://opodatkuv.ayco.group'

  const updateMetaTags = () => {
    const fullConfig = { ...defaultConfig, ...config }

    // Update title
    if (fullConfig.title) {
      document.title = fullConfig.title
    }

    // Update or create meta tags
    updateMetaTag('name', 'title', fullConfig.title)
    updateMetaTag('name', 'description', fullConfig.description)
    updateMetaTag('name', 'keywords', fullConfig.keywords)
    updateMetaTag('name', 'robots', fullConfig.robots)

    // Open Graph tags
    updateMetaTag('property', 'og:title', fullConfig.ogTitle || fullConfig.title)
    updateMetaTag('property', 'og:description', fullConfig.ogDescription || fullConfig.description)
    updateMetaTag('property', 'og:image', fullConfig.ogImage)
    updateMetaTag('property', 'og:url', fullConfig.ogUrl || `${siteUrl}${router.currentRoute.value.path}`)

    // Twitter tags
    updateMetaTag('property', 'twitter:title', fullConfig.twitterTitle || fullConfig.title)
    updateMetaTag('property', 'twitter:description', fullConfig.twitterDescription || fullConfig.description)
    updateMetaTag('property', 'twitter:image', fullConfig.twitterImage || fullConfig.ogImage)
    updateMetaTag('property', 'twitter:url', fullConfig.ogUrl || `${siteUrl}${router.currentRoute.value.path}`)

    // Canonical link
    updateCanonicalLink(fullConfig.canonical || `${siteUrl}${router.currentRoute.value.path}`)
  }

  const updateMetaTag = (
    attribute: 'name' | 'property',
    attributeValue: string | undefined,
    content: string | undefined
  ) => {
    if (!attributeValue || !content) return

    let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`)
    if (element) {
      element.setAttribute('content', content)
    } else {
      element = document.createElement('meta')
      element.setAttribute(attribute, attributeValue)
      element.setAttribute('content', content)
      document.head.appendChild(element)
    }
  }

  const updateCanonicalLink = (url: string) => {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (link) {
      link.href = url
    } else {
      link = document.createElement('link')
      link.rel = 'canonical'
      link.href = url
      document.head.appendChild(link)
    }
  }

  onMounted(() => {
    updateMetaTags()
  })

  // Watch for route changes and update meta tags
  const unwatchRoute = watch(
    () => router.currentRoute.value.path,
    () => {
      updateMetaTags()
    }
  )

  onUnmounted(() => {
    unwatchRoute()
  })

  return {
    updateMetaTags
  }
}
