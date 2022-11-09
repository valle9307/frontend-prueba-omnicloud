<template>
    <card
        :header="true"
        clasesCard="border-0 shadow-sm"
        clasesHeader="bg-white"
    >
        <template #header>
            <div class="d-flex justify-content-between align-items-center">
                <h4 class="mb-0">
                    <iconos :icon="['fas','address-book']" /> Editoriales
                </h4>
                <router-link
                    class="btn btn-primary"
                    :to="{ name: 'editoriales-nuevo' }"
                >
                    Nueva <iconos :icon="['fas','plus']" />
                </router-link>
            </div>
        </template>
         <template #body>
            <listado-editoriales />
        </template>
    </card>
</template>

<script>
import ListadoEditoriales from '../components/Listado.vue'

export default {
   components: { ListadoEditoriales }
}
</script>