<template>
    <card
        :header="true"
        clasesCard="border-0 shadow-sm"
        clasesHeader="bg-white"
    >
        <template #header>
            <div class="d-flex justify-content-between align-items-center">
                <h4 class="mb-0">
                    <iconos :icon="['fas','user-tie']" /> Autores
                </h4>
                <router-link
                    class="btn btn-primary"
                    :to="{ name: 'autores-nuevo' }"
                >
                    Nuevo <iconos :icon="['fas','plus']" />
                </router-link>
            </div>
        </template>
         <template #body>
            <lista-autores />
        </template>
    </card>
</template>

<script>
import ListaAutores from '../components/Listado.vue'

export default {
    components: { ListaAutores },
    setup () {
        

        return {}
    }
}
</script>