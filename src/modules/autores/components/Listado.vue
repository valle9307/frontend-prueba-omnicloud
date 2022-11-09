<template>
    <div class="row justify-content-md-end justify-content-lg-end mb-3">
        <columna sm="12" md="6" lg="4" xl="4" xxl="4">
            <buscar @filtrar="filtrarDatos" />
        </columna>
    </div>
    <div v-if="loading" class="d-flex justify-content-center my-5">
        <spinner tipo="dark" :agrandar="true" />
    </div>
    <div v-else>
        <div
            v-if="existenRegistros((authors.data || authors))"
            class="table-responsive"
        >
            <table  class="table table-striped mb-0">
                <thead>
                    <tr>
                        <th 
                            v-for="header in headers"
                            :key="header"
                            class="text-center"
                        >
                            {{ header}}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="author in authors.data" :key="author.id">
                        <td class="text-center">
                            {{ author.name }}
                        </td>
                        <td class="text-center">
                            {{ author.last_name }}
                        </td>
                        <td class="text-center">
                            {{ author.email }}
                        </td>
                        <td class="text-center">
                            <button
                                type="button"
                                class="btn btn-sm btn-warning me-1"
                                @click="editar(author.id)"
                            >
                                <iconos :icon="['fas','pen']" />
                            </button>
                            <el-popconfirm
                                confirm-button-type="success"
                                cancel-button-type="danger"
                                :title="`¿Eliminar autor - ${author.name} ${author.last_name}?`"
                                width="autho"
                                @confirm="eliminar(author.id)"
                            >
                                <template #reference>
                                    <button 
                                        type="button"
                                        class="btn btn-sm btn-danger"
                                    >
                                        <iconos :icon="['fas','trash-alt']" />
                                    </button>
                                </template>
                            </el-popconfirm>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div 
                v-if="existenRegistros((authors.data || authors))"
                class="d-flex align-items-center justify-content-between mt-2"
            >
                <div class="col-6">
                    <h6 class="mb-0">
                    {{ mensajeRegistrosPaginados(authors) }}
                    </h6>
                </div>
                <div class="col-auto">
                    <paginador 
                        :rows="authors.per_page"
                        :totalRecords="authors.total"
                        :rowsPerPageOptions="[15,30,50]"
                        @page="cambioPagina($event)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted,ref } from 'vue'
import { useRouter } from 'vue-router'

import useAlertaStore from '@/store/alerta'
import usePaginacion from '@/composables/usePaginacion'

import api from '@/api'

export default {
    setup () {
        onMounted(async () => {
            loading.value = true
            await listado(params.value)
            loading.value = false
        })

        const listado = async (paginacion) => {
            try {
                let { data } = await api.get('/authors', { params: { ...paginacion } })
                let { authors: authorsApi } = data

                authors.value = authorsApi
            } catch (error) {
                let {
                    authors: authorsApi,
                    error: errorApi,
                    message
                } = error.response.data

                authors.value = authorsApi
                valoresAlerta({
                    texto: `${message} - ${errorApi}`,
                    tipo: 'danger',
                    ver: true,
                })
            }
        }

        //Composables
        const alertaStore = useAlertaStore()

        const {
            cambioPagina,
            existenRegistros,
            filtrarDatos,
            mensajeRegistrosPaginados,
            params
        } = usePaginacion(listado)

        const router = useRouter()

        //Data
        const authors = ref({})
        const headers = ['NOMBRE','APELLIDOS','EMAIL','ACCIONES']
        const loading = ref(false)

        //Methods
        const editar = (author_id) => {
            router.push({
                name: 'autores-editar',
                params: { 
                    id: author_id
                }
            })
        }

        const eliminar = async (author_id) => {
            try {
                let { data }    = await api.delete(`/authors/${author_id}`)
                let { message } = data

                alertaStore.valoresAlerta({
                    cerrar:true,
                    texto: message,
                    tipo: 'success',
                    ver: true
                })

                await listado(params.value)
            } catch (error) {
                let { error: errorApi } = error.response.data
                
                alertaStore.valoresAlerta({
                    cerrar: true,
                    tipo: 'danger',
                    texto: `${errorApi}`,
                    ver: true
                })
            }

            window.scrollTo(0,0)
        }

        return {
            cambioPagina,
            existenRegistros,
            filtrarDatos,
            mensajeRegistrosPaginados,
            params,
            authors,
            loading,
            headers,
            editar,
            eliminar
        }
    }
}
</script>