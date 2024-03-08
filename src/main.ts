import { createApp } from 'vue'
import { createPinia } from 'pinia'
import generalConfig from '@/config'

import App from './App.vue'
import router from './router'

const app = createApp(App)

generalConfig(app)

app.use(createPinia())
app.use(router)

app.mount('#app')
