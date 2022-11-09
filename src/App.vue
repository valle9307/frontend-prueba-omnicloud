<template>
    <div id="contenedor-principal">
        <component :is="layout" />
    </div>
</template>

<script>
import { computed } from 'vue'
import useAuthStore from '@/store/auth'
import LayoutLogin from '@/layouts/Login.vue'
import LayoutSitio from '@/layouts/Sitio.vue'

export default {
    components:{
        LayoutLogin,
        LayoutSitio
    },
    setup(){
        //Composables
        const authStore = useAuthStore()

        return { 
            layout: computed(() => authStore.layoutActive)
        }
    }
}
</script>