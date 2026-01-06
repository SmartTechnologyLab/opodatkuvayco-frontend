import type { SeoMetaConfig } from '@/composables/useSeo'

export const seoConfig: Record<string, SeoMetaConfig> = {
  home: {
    title: 'Opodatkuvayco - Калькулятор податків та оподаткування',
    description:
      'Безкоштовний калькулятор податків для ФОП та фізичних осіб. Розрахуйте податки, ЄСВ та інші платежі онлайн. Точні розрахунки згідно з чинним законодавством України.',
    keywords:
      'калькулятор податків, оподаткування, ФОП, податки Україна, ЄСВ, розрахунок податків, податковий калькулятор, єдиний податок, податок на прибуток',
    ogTitle: 'Opodatkuvayco - Калькулятор податків для ФОП і фізичних осіб',
    ogDescription:
      'Безкоштовний онлайн калькулятор для розрахунку податків, ЄСВ та інших платежів. Просто, швидко, точно.',
    canonical: 'https://opodatkuvayco.com/'
  },
  about: {
    title: 'Про нас - Opodatkuvayco',
    description:
      'Дізнайтеся більше про Opodatkuvayco - сервіс для розрахунку податків. Наша місія - зробити оподаткування простим та зрозумілим для кожного.',
    keywords: 'про нас, opodatkuvayco, команда, місія, податковий сервіс',
    ogTitle: 'Про Opodatkuvayco - Хто ми і що робимо',
    ogDescription:
      'Opodatkuvayco допомагає ФОП та фізичним особам розраховувати податки онлайн. Простий, безкоштовний та точний інструмент.',
    canonical: 'https://opodatkuvayco.com/about'
  },
  register: {
    title: 'Реєстрація - Opodatkuvayco',
    description:
      'Зареєструйтеся на Opodatkuvayco для доступу до розширених функцій калькулятора податків. Зберігайте історію розрахунків та отримуйте персональні рекомендації.',
    keywords: 'реєстрація, створити акаунт, opodatkuvayco, особистий кабінет',
    ogTitle: 'Створити акаунт на Opodatkuvayco',
    ogDescription:
      'Реєстрація дає доступ до розширених функцій: збереження історії, персональні налаштування, експорт даних.',
    canonical: 'https://opodatkuvayco.com/register',
    robots: 'noindex, nofollow'
  },
  policy: {
    title: 'Політика конфіденційності - Opodatkuvayco',
    description:
      'Політика конфіденційності Opodatkuvayco. Дізнайтеся, як ми збираємо, використовуємо та захищаємо ваші персональні дані.',
    keywords: 'політика конфіденційності, захист даних, приватність, GDPR',
    ogTitle: 'Політика конфіденційності - Opodatkuvayco',
    ogDescription: 'Як ми збираємо та захищаємо ваші персональні дані. Прозора політика конфіденційності.',
    canonical: 'https://opodatkuvayco.com/policy',
    robots: 'noindex, follow'
  },
  terms: {
    title: 'Умови використання - Opodatkuvayco',
    description:
      'Умови використання сервісу Opodatkuvayco. Ознайомтеся з правилами та умовами користування нашим калькулятором податків.',
    keywords: 'умови використання, правила, terms of service, користувацька угода',
    ogTitle: 'Умови використання сервісу - Opodatkuvayco',
    ogDescription: 'Правила та умови користування калькулятором податків Opodatkuvayco.',
    canonical: 'https://opodatkuvayco.com/terms',
    robots: 'noindex, follow'
  }
}
