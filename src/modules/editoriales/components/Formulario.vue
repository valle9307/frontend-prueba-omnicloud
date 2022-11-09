<template>
    <form @submit.prevent="submit()">
        <card
            clasesCard="border-0" 
            clasesFooter="bg-white"
            :footer="true"
        >
            <template #body>
                <div class="row mb-2 gy-3">
                    <columna sm="12" md="6" lg="6" xl="6" xxl="6">
                        <label class="form-label">Nombre</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="ingresar nombre"
                            :disabled="loading"
                            v-model="editorial.name"
                        >
                        <errores-formulario
                            v-if="errores.name"
                            :errores="errores.name"
                        />
                    </columna>
                    <columna sm="12" md="6" lg="6" xl="6" xxl="6">
                        <label class="form-label">Télefono</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="ingresar email"
                            :disabled="loading"
                            v-model="editorial.phone_number"
                        >
                        <errores-formulario
                            v-if="errores.phone_number"
                            :errores="errores.phone_number"
                        />
                    </columna>
                    <columna sm="12" md="12" lg="12" xl="12" xxl="12">
                        <label class="form-label">Dirección</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="ingresar direccion"
                            :disabled="loading"
                            v-model="editorial.address"
                        >
                        <errores-formulario
                            v-if="errores.address"
                            :errores="errores.address"
                        />
                    </columna>
                </div>
            </template>
            <template #footer>
                <div class="d-flex justify-content-end align-items-center">
                    <spinner
                        v-if="loading"
                        tipo="dark"
                    />
                    <button
                        type="submit"
                        class="btn btn-success mx-2"
                        :disabled="loading"    
                    >
                        Guardar
                    </button>
                    <button
                        type="button"
                        class="btn btn-danger"
                        :disabled="loading"
                        @click="regresar()"
                    >
                        Cancelar
                    </button>
                </div>
            </template>
        </card>
    </form>
</template>

<script>
import { onMounted,ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import useAlertaStore from '@/store/alerta'

import useFormularios from '@/composables/useFormularios'

import api from '@/api'

export default {
    setup () {
        onMounted(() => {
            let { id } = route.params

            if (id) {
                (async () => await buscarEditorial(id))()
            }
        })

        //Composables
        const {
            errores,
            loading,
            manejoErroresApi
        } = useFormularios()

        const route = useRoute()

        const router = useRouter()
        
        const alertaStore = useAlertaStore()

        //Data
        const editorial = ref({
            id: null,
            name: null,
            address: null,
            phone_number: null
        })

        //Methods
        const buscarEditorial = async (editorial_id) => {
            loading.value = true

            try {
                let { data } = await api.get(`/editorials/${editorial_id}`)
                let { editorial: editorialApi } = data

                editorial.value = editorialApi
            } catch (error) {
                let { error: errorApi } = error.response.data
                
                alertaStore.valoresAlerta({
                    cerrar: true,
                    tipo: 'danger',
                    texto: `${errorApi}`,
                    ver: true
                })
            } finally {
                loading.value = false
            }
        }

        const submit = async () => {
            loading.value = true
            errores.value = {}

            try {
                let { data } = (editorial.value.id)
                ? await api.put(`/editorials/${editorial.value.id}`, editorial.value)
                : await api.post(`/editorials`, editorial.value)

                let { message } = data 

                alertaStore.valoresAlerta({
                    texto: message,
                    tipo: 'success',
                    ver: true
                })
                router.push({ name: 'editoriales-index' })
            } catch (error) {
                let { erroresApi,valoresAlerta } = manejoErroresApi(error,editorial)
                
                errores.value = erroresApi
                alertaStore.valoresAlerta(valoresAlerta)
            } finally {
                loading.value = false
            }
        }

        return {
            errores,
            loading,
            manejoErroresApi,
            editorial,
            regresar: () => router.push({ name: 'editoriales-index' }),
            submit
        }
    }
}
</script>