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
            v-if="existenRegistros((books.data || books))"
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
                    <tr v-for="book in books.data" :key="book.id">
                        <td class="text-center">
                            {{ book.editorial.name }}
                        </td>
                        <td class="text-center">
                            <badge tipo="primary" @click="$emit('autores-libros',book.authors)">
                                {{ book.authors_count }}
                            </badge>
                        </td>
                        <td class="text-center">
                            {{ book.title }}
                        </td>
                        <td class="text-center">
                            {{ book.publish_at }}
                        </td>
                        <td class="text-center">
                            {{ formatoMoneda(book.price) }}
                        </td>
                        <td class="text-center">
                            <button
                                type="button"
                                class="btn btn-sm btn-warning me-1"
                                @click="editar(book.id)"
                            >
                                <iconos :icon="['fas','pen']" />
                            </button>
                            <el-popconfirm
                                confirm-button-type="success"
                                cancel-button-type="danger"
                                :title="`¿Eliminar libro - ${book.title}?`"
                                width="autho"
                                @confirm="eliminar(book.id)"
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
                v-if="existenRegistros((books.data || books))"
                class="d-flex align-items-center justify-content-between mt-2"
            >
                <div class="col-6">
                    <h6 class="mb-0">
                    {{ mensajeRegistrosPaginados(books) }}
                    </h6>
                </div>
                <div class="col-auto">
                    <paginador 
                        :rows="books.per_page"
                        :totalRecords="books.total"
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

import accounting from 'accounting'
import api from '@/api'

export default {
    emits: ['autores-libros'],
    setup () {
        onMounted(async () => {
            loading.value = true
            await listado(params.value)
            loading.value = false
        })

        const listado = async (paginacion) => {
            try {
                let { data } = await api.get('/books', { params: { ...paginacion } })
                let { books: booksApi } = data

                books.value = booksApi
            } catch (error) {
                let {
                    books: booksApi,
                    error: errorApi,
                    message
                } = error.response.data

                books.value = booksApi
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
        const books   = ref({})
        const headers = ['EDITORIAL','AUTORES','TITULO','FECHA PUBLICACIÓN','PRECIO','ACCIONES']
        const loading = ref(false)

        //Methods
        const editar = (book_id) => {
            router.push({
                name: 'libros-editar',
                params: { 
                    id: book_id
                }
            })
        }

        const eliminar = async (book_id) => {
            try {
                let { data }    = await api.delete(`/books/${book_id}`)
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
            books,
            loading,
            headers,
            editar,
            eliminar,
            formatoMoneda: (valor) => accounting.formatMoney(valor)
        }
    }
}
</script>

<style scoped>
.badge {
    cursor: pointer;
}
</style>