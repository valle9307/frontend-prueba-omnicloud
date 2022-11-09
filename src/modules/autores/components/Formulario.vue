<template>
    <form @submit.prevent="submit()" enctype="multipart/form-data">
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
                            v-model="autor.name"
                        >
                        <errores-formulario
                            v-if="errores.name"
                            :errores="errores.name"
                        />
                    </columna>
                    <columna sm="12" md="6" lg="6" xl="6" xxl="6">
                        <label class="form-label">Apellidos</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="ingresar apellidos"
                            :disabled="loading"
                            v-model="autor.last_name"
                        >
                        <errores-formulario
                            v-if="errores.last_name"
                            :errores="errores.last_name"
                        />
                    </columna>
                    <columna sm="12" md="6" lg="6" xl="6" xxl="6">
                        <label class="form-label">Email</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="ingresar email"
                            :disabled="loading"
                            v-model="autor.email"
                        >
                        <errores-formulario
                            v-if="errores.email"
                            :errores="errores.email"
                        />
                    </columna>
                    <columna sm="12" md="6" lg="6" xl="6" xxl="6">
                        <label class="form-label">Imagen</label>
                        <input
                            type="file"
                            class="form-control"
                            accept=".png,.jpg,.jpeg"
                            :disabled="loading"
                            @input="cargarArchivo($event)"
                        >
                        <errores-formulario
                            v-if="errores.file"
                            :errores="errores.file"
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
                (async () => await buscarAutor(id))()
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
        const autor = ref({
            id: null,
            name: '',
            last_name: '',
            email: '',
            file: null
        })

        //Methods
        const buscarAutor = async (author_id) => {
            loading.value = true

            try {
                let { data }   = await api.get(`/authors/${author_id}`)
                let { author } = data

                autor.value = author
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

        const cargarArchivo = ({ target }) => {
            let [image] = target.files

            autor.value.file =  image
        }

        const submit = async () => {
            loading.value = true
            errores.value = {}

            try {
                let headers    = {'Content-Type': 'multipart/form-data'}
                let { data } = (autor.value.id)
                ? await api.put(`/authors/${autor.value.id}`, autor.value, { headers })
                : await api.post(`/authors`, autor.value , { headers })

                let { message } = data 

                alertaStore.valoresAlerta({
                    texto: message,
                    tipo: 'success',
                    ver: true
                })
                router.push({ name: 'autores-index' })
            } catch (error) {
                let { erroresApi,valoresAlerta } = manejoErroresApi(error,autor)
                
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
            autor,
            cargarArchivo,
            regresar: () => router.push({ name: 'autores-index' }),
            submit
        }
    }
}
</script>