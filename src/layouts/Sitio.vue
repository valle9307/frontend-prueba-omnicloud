<template>
    <encabezado />
    <div id="contenedor-secundario" class="container">
        <alerta
            v-if="alertaStore.ver"
            :cerrar="alertaStore.cerrar"
            :tipo="alertaStore.tipo"
            :texto="alertaStore.texto"
            @cerrar-alerta="cerrarAlertaGlobal()"
        />
        <router-view></router-view>
    </div>
</template>

<script>
import { computed } from 'vue'
import Encabezado from '@/components/layouts/Encabezado.vue'

import useAlertaStore from '@/store/alerta'

export default {
    components: { Encabezado },
    setup () {
        //Composables
        const alertaStore = useAlertaStore()

        return { 
            alertaStore: computed(() => alertaStore.alerta),
            cerrarAlertaGlobal: () => alertaStore.resetearAlerta()
        }
    }
}
</script>