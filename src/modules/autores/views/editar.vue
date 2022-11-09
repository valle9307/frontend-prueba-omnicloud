<template>
    <card
        :header="true"
        clasesBody="p-0"
        clasesCard="border-0 shadow-sm border-0"
        clasesHeader="bg-white"
    >
        <template #header>
            <div class="d-flex justify-content-between align-items-center">
                <h4 class="mb-0">
                    <iconos :icon="['fas','user-tie']" /> Editar autor
                </h4>
                <router-link
                    class="btn btn-secondary"
                    :to="{ name: 'autores-index' }"
                >
                    Regresar <iconos :icon="['fas','arrow-left-long']" />
                </router-link>
            </div>
        </template>
         <template #body>
            <formulario-autor /> 
        </template>
    </card>
</template>

<script>
import FormularioAutor from '../components/Formulario.vue'

export default {
    components: { FormularioAutor }
}
</script>