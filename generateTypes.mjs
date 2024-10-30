import { generateApi } from 'swagger-typescript-api'

import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import process from 'process'
import dotenv from 'dotenv'

dotenv.config()

generateApi({
  name: 'opodatkuvayco-backend-api-types',
  output: resolve(process.cwd(), './src/types'),
  url: String(new URL('/docs-json', process.env.VITE_API_URL)),
  generateClient: false,
  generateUnionEnums: false,
  prettier: {
    ...JSON.parse(readFileSync(resolve(process.cwd(), '.prettierrc.json'), 'utf-8')),
    endOfLine: 'lf'
  }
}).catch((e) => console.error(e))
