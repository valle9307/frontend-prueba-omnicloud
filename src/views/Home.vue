<template>
    <filtros
        @borrar-filtros="borrarFiltros"
        @filtrar-libros="filtrarLibros"
    />
    <div class="row gy-3">
        <columna sm="12" md="8" lg="8" xl="8" xxl="8">
            <libros
                :books="books"
                :loading="loading"
                @cambio-pagina="cambiarPagina"
                @seleccionar-libro="seleccionarLibro"
            />
        </columna>
        <columna sm="12" md="4" lg="4" xl="4" xxl="4">
            <detalle-libro 
                :libro-seleccionado="libroSeleccionado"
                
            />
        </columna>
    </div>
</template>

<script>
import { onMounted,ref } from 'vue'

import useAlertaStore from '@/store/alerta'

import DetalleLibro from '@/components/home/DetalleLibro.vue'
import Filtros from '@/components/home/Filtros.vue'
import Libros from '@/components/home/Libros.vue'

import api from '@/api'

export default {
    components: {
        DetalleLibro,
        Filtros,
        Libros
    },  
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
                alertaStore.valoresAlerta({
                    texto: `${message} - ${errorApi}`,
                    tipo: 'danger',
                    ver: true,
                })
            }
        }

        //Composables
        const alertaStore = useAlertaStore()

        //Data
        const books = ref({})

        const libroSeleccionado = ref({})

        const loading = ref(false)

        const params = ref({
            page: 1,
            per_page: 10,
            nombre: null,
            editorial_id: null
        })

        //Methods
        const borrarFiltros = async() => {
            params.value = {
                ...params.value,
                page: 1,
                nombre: null,
                editorial_id: null
            }
            libroSeleccionado.value = {}

            loading.value = true
            await listado(params.value)
            loading.value = false
        }

        const cambiarPagina = async (page) => {
            params.value = {
                ...params.value,
                page
            }

            await listado(params.value)
            window.scrollTo(0,0)
        }

        const filtrarLibros = async ({ nombre,editorial_id }) => {
            params.value = {
                ...params.value,
                page: 1,
                nombre,
                editorial_id
            }
            libroSeleccionado.value = {}

            loading.value = true
            await listado(params.value)
            loading.value = false
        }

        const seleccionarLibro =  (libro) => {
            libroSeleccionado.value = libro
            window.scrollTo(0,0)
        }

        return { 
            books,
            libroSeleccionado,
            loading,
            params,
            borrarFiltros,
            cambiarPagina,
            filtrarLibros,
            seleccionarLibro
        }
    }
}
</script>