import { createApp } from 'vue'
import App from './App.vue'
import Button from 'primevue/button'
import Image from 'primevue/image';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';

// import './assets/main.css'
const app = createApp(App);
app.use(PrimeVue, {
    theme: {
      preset: Aura
    }
});
app.component('Button', Button);
app.component('Image', Image)
app.mount('#app')
