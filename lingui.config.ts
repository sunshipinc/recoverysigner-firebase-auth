import type { LinguiConfig } from '@lingui/conf'

const config: LinguiConfig = {
  locales: ['en', 'es', 'es-AR', 'fr', 'pt', 'ru', 'uk'],
  sourceLocale: 'en',
  format: 'po',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['src'],
    },
  ],
}

export default config