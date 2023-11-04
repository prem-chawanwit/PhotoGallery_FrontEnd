/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */
// main.ts
// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import store from './store'; // Import your Vuex store
// Plugins
import { registerPlugins } from '@/plugins'

const app = createApp(App)

app.use(store);
registerPlugins(app)

app.mount('#app')
