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
            v-if="existenRegistros((editorials.data || editorials))"
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
                    <tr v-for="editorial in editorials.data" :key="editorial.id">
                        <td class="text-center">
                            {{ editorial.name }}
                        </td>
                        <td class="text-center">
                            {{ editorial.address }}
                        </td>
                        <td class="text-center">
                            {{ editorial.phone_number }}
                        </td>
                        <td class="text-center">
                            <badge tipo="primary">{{ editorial.books_count }}</badge>
                        </td>
                        <td class="text-center">
                            <button
                                type="button"
                                class="btn btn-sm btn-warning me-1"
                                @click="editar(editorial.id)"
                            >
                                <iconos :icon="['fas','pen']" />
                            </button>
                            <el-popconfirm
                                confirm-button-type="success"
                                cancel-button-type="danger"
                                :title="`¿Eliminar editorial - ${editorial.name}?`"
                                width="autho"
                                @confirm="eliminar(editorial.id)"
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
                v-if="existenRegistros((editorials.data || editorials))"
                class="d-flex align-items-center justify-content-between mt-2"
            >
                <div class="col-6">
                    <h6 class="mb-0">
                    {{ mensajeRegistrosPaginados(editorials) }}
                    </h6>
                </div>
                <div class="col-auto">
                    <paginador 
                        :rows="editorials.per_page"
                        :totalRecords="editorials.total"
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
                let { data } = await api.get('/editorials', { params: { ...paginacion } })
                let { editorials: editorialsApi } = data

                editorials.value = editorialsApi
            } catch (error) {
                let {
                    editorials: editorialsApi,
                    error: errorApi,
                    message
                } = error.response.data

                editorials.value = editorialsApi
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
        const editorials = ref({})
        const headers    = ['NOMBRE','DIREECIÓN','TÉLEFONO','LIBROS','ACCIONES']
        const loading    = ref(false)

        //Methods
        const editar = (editorial_id) => {
            router.push({
                name: 'editoriales-editar',
                params: { 
                    id: editorial_id
                }
            })
        }

        const eliminar = async (editorial_id) => {
            try {
                let { data }    = await api.delete(`/editorials/${editorial_id}`)
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
            editorials,
            loading,
            headers,
            editar,
            eliminar
        }
    }
}
</script>