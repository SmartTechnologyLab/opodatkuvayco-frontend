import { createApp } from 'vue'
import { createPinia } from 'pinia'
import generalConfig from '@/config'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faStar, faCalculator, faRobot } from '@fortawesome/free-solid-svg-icons'
import { faGoogleDrive } from '@fortawesome/free-brands-svg-icons'
import { initAnalytics } from '@/plugins/analytics'

library.add(faCheck, faStar, faCalculator, faRobot, faGoogleDrive)

import App from './App.vue'
import router from './router'

const app = createApp(App)

generalConfig(app)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

initAnalytics(router)

app.mount('#app')
