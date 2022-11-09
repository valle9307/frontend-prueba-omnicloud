import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';

//Componentes
import Paginator from 'primevue/paginator/Paginator.vue'


export default {
    install: (app) => {
        app.use(PrimeVue)

        app.component('paginador', Paginator)
    }
}