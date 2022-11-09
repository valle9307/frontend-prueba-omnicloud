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
                        <label class="form-label">Editorial</label>
                        <el-select
                            v-model="libro.editorial_id"
                            class="w-100"
                            clearable
                            filterable
                            placeholder="Seleccionar editorial..."
                            :disabled="loading"
                        >
                            <el-option
                                v-for="{ id,name } in editorials"
                                :key="id"
                                :label="name"
                                :value="id"
                            />
                        </el-select>
                        <errores-formulario
                            v-if="errores.editorial_id"
                            :errores="errores.editorial_id"
                        />
                    </columna>
                    <columna sm="12" md="6" lg="6" xl="6" xxl="6">
                        <label class="form-label">Título</label>
                        <input
                            type="text"
                            class="form-control"
                            placeholder="ingresar título"
                            :disabled="loading"
                            v-model="libro.title"
                        >
                        <errores-formulario
                            v-if="errores.title"
                            :errores="errores.title"
                        />
                    </columna>
                    <columna sm="12" md="6" lg="6" xl="6" xxl="6">
                        <label class="form-label">Fecha de publicación</label>
                        <el-date-picker
                            v-model="libro.publish_at"
                            class="w-100"
                            type="date"
                            placeholder="Seleccionar fecha"
                            size="large"
                            value-format="YYYY-MM-DD"
                            :disabled="loading"
                        />
                        <errores-formulario
                            v-if="errores.publish_at"
                            :errores="errores.publish_at"
                        />
                    </columna>
                    <columna sm="12" md="6" lg="6" xl="6" xxl="6">
                        <label class="form-label">Precio</label>
                        <el-input-number
                            class="w-100"
                            v-model="libro.price"
                            controls-position="right"
                            :min="0"
                            :precision="2"
                            :step="0.01"
                            :disabled="loading"
                        />
                        <errores-formulario
                            v-if="errores.price"
                            :errores="errores.price"
                        />
                    </columna>
                    <columna sm="12" md="12" lg="12" xl="12" xxl="12">
                        <label class="form-label">Autores</label>
                        <el-select
                            v-model="libro.authors"
                            class="w-100"
                            filterable
                            multiple
                            placeholder="Seleccionar autores..."
                            :disabled="loading"
                        >
                            <el-option
                                v-for="{ id,name,last_name } in authors"
                                :key="id"
                                :label="`${name} ${last_name}`"
                                :value="id"
                            />
                        </el-select>
                        <errores-formulario
                            v-if="errores.authors"
                            :errores="errores.authors"
                        />
                    </columna>
                    <columna sm="12" md="6" lg="6" xl="6" xxl="6">
                        <label class="form-label">Archivo</label>
                        <input
                            type="file"
                            class="form-control"
                            accept="application/pdf"
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
        onMounted(async () => {
            let { id }  = route.params
            let bookApi = null

            if (id) {
                bookApi = api.get(`/books/${id}`)
            }

            let authorsApi    = api.get('/authors/list')
            let editorialsApi = api.get('/editorials/list')

            loading.value = (id) ? true : false

            await Promise.all([authorsApi,editorialsApi,bookApi])
                .then(response => {
                    let [responseAuthors,responseEditorials,responseBook] = response
                    
                    authors.value    = responseAuthors.data.authors
                    editorials.value = responseEditorials.data.editorials
                    
                    if (bookApi) {
                        libro.value         = responseBook.data.book
                        libro.value.authors = getAuthorsIds(responseBook.data.book.authors)
                    }
                })
                .catch(error => {
                    let { error: errorApi } = error.response.data
                
                    alertaStore.valoresAlerta({
                        cerrar: true,
                        tipo: 'danger',
                        texto: `${errorApi}`,
                        ver: true
                    })
                })

            loading.value = false
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
        const authors    = ref([])

        const editorials = ref([])

        const libro = ref({
            id: null,
            editorial_id: '',
            title: '',
            publish_at: '',
            price: 0,
            authors: [],
            file: ''
        })

        //Methods
        const cargarArchivo = ({ target }) => {
            let [image] = target.files

            libro.value.file =  image
        }

        const getAuthorsIds = (authors) => authors.map(autor => autor.id)

        const submit = async () => {
            loading.value = true
            errores.value = {}

            try {
                let headers    = {'Content-Type': 'multipart/form-data'}

                let { data } = (libro.value.id)
                ? await api.put(`/books/${libro.value.id}`, libro.value, { headers })
                : await api.post(`/books`, libro.value, { headers })

                let { message } = data 

                alertaStore.valoresAlerta({
                    texto: message,
                    tipo: 'success',
                    ver: true
                })
                router.push({ name: 'libros-index' })
            } catch (error) {
                let { erroresApi,valoresAlerta } = manejoErroresApi(error,libro)
                
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
            authors,
            editorials,
            libro,
            cargarArchivo,
            regresar: () => router.push({ name: 'libros-index' }),
            submit
        }
    }
}
</script>