import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

//JS Bootstrap
import * as bootstrap from 'bootstrap'

//Plugins
import ElementPlus from './plugins/element-ui-plus'
import Iconos from './plugins/vue-font-awesome'
import PriveVue from './plugins/prime-vue'

//Router
import Router from './router'

//Componentes globales
import Alerta from './components/common/Alerta.vue'
import Badge from './components/common/Badge.vue'
import Buscar from './components/common/Buscar.vue'
import Card from './components/common/Card.vue'
import Columna from './components/common/Columna.vue'
import ErroresFormulario from './components/common/ErroresFormulario.vue'
import Modal from './components/common/Modal.vue'
import Spinner from './components/common/Spinner.vue'


//Styles
import './assets/scss/styles.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app   = createApp(App)

app.use(Router)
app.use(pinia)
app.use(ElementPlus)
app.use(Iconos)
app.use(PriveVue)

app.component('Alerta', Alerta)
app.component('Badge', Badge)
app.component('Buscar', Buscar)
app.component('Card', Card)
app.component('Columna', Columna)
app.component('ErroresFormulario', ErroresFormulario)
app.component('Modal',Modal)
app.component('Spinner',Spinner)

app.mount('#app')