<template>
    <card
        :header="true"
        clasesCard="border-0 shadow-sm"
        clasesHeader="bg-white"
    >
        <template #header>
            <div class="d-flex justify-content-between align-items-center">
                <h4 class="mb-0">
                    <iconos :icon="['fas','book']" /> Libros
                </h4>
                <router-link
                    class="btn btn-primary"
                    :to="{ name: 'libros-nuevo' }"
                >
                    Nuevo <iconos :icon="['fas','plus']" />
                </router-link>
            </div>
        </template>
         <template #body>
            <listado-libros @autores-libros="abrirModal"/>
            <modal v-if="verModal">
                <autores-libros :autores="autores" @close="cerrarModal()" />
            </modal>
        </template>
    </card>
</template>

<script>
import { ref } from 'vue'

import AutoresLibros from '../components/AutoresLibros.vue'
import ListadoLibros from '../components/Listado.vue'

import useFormularios from '@/composables/useFormularios'

export default {
    components: {
        AutoresLibros, 
        ListadoLibros
    },
    setup() {
        //Composables
        const { verModal } = useFormularios()

        //Data
        const autores = ref([])

        //Methods
        const abrirModal = (autoresLibro) => {
            autores.value  = autoresLibro
            verModal.value = true
        }

        const cerrarModal = () => {
            autores.value  = []
            verModal.value = false
        }

        return {
            verModal,
            autores,
            abrirModal,
            cerrarModal
        } 
    }
}
</script>