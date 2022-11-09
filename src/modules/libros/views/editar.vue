<template>
    <card
        clasesBody="p-0"
        clasesCard="border-0 shadow-sm"
        clasesHeader="bg-white"
        :header="true"
    >
        <template #header>
            <div class="d-flex justify-content-between align-items-center">
                <h4 class="mb-0">
                    <iconos :icon="['fas','book']" /> Editar libro
                </h4>
                <router-link
                    class="btn btn-secondary"
                    :to="{ name: 'libros-index' }"
                >
                    Regresar <iconos :icon="['fas','arrow-left-long']" />
                </router-link>
            </div>
        </template>
         <template #body>
            <formulario-libro />
        </template>
    </card>
</template>

<script>
import FormularioLibro from '../components/Formulario.vue'

export default {
    components: { FormularioLibro }
}
</script>