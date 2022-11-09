<template>
    <card 
        clasesCard="border-0 shadow-sm h-100"
        clasesHeader="bg-white"
        :header="true"
    >
        <template #header>
            <h4 class="mb-0">Libros</h4>
        </template>
        <template #body>
            <div v-if="loading" class="d-flex justify-content-center my-5">
                <spinner tipo="dark" :agrandar="true" />
            </div>
            <div v-else>
                <table  class="table table-hover table-striped mb-0">
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
                        <tr 
                            v-for="book in books.data"
                            :key="book.id"
                            :class="{ 'border-row': (idLibroSeleccionado === book.id) }"
                            @click="libroSeleccionado(book)"
                        >
                            <td class="text-center">
                                {{ book.editorial.name }}
                            </td>
                            <td class="text-center">
                                <badge tipo="primary">
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
                            @page="cambioPagina($event)"
                        />
                    </div>
                </div>
            </div>
        </template>
    </card>
</template>

<script>
import { ref } from 'vue'

import useAlertaStore from '@/store/alerta'
import usePaginacion from '@/composables/usePaginacion'

import accounting from 'accounting'

export default {
    props: {
        books: {
            type: Object,
            require: true
        },
        loading: {
            type: Boolean,
            require: true
        }
    },
    emits: [
        'cambio-pagina',
        'seleccionar-libro'
    ],
    setup (props,{ emit }) {
        //Composables
        const { existenRegistros,mensajeRegistrosPaginados } = usePaginacion()

        //Data
        const headers = ['EDITORIAL','AUTORES','TITULO','FECHA','PRECIO']
        const idLibroSeleccionado = ref(null)

        //Methods
        const cambioPagina = ({ page }) => {
            if (page === 0) {
                page = 1
            } else {
                page = page + 1
            }

            emit('cambio-pagina', page)
        }

        const libroSeleccionado = (libro) => {
            idLibroSeleccionado.value = libro.id
            emit('seleccionar-libro',libro)
        }

        return {
            existenRegistros,
            mensajeRegistrosPaginados,
            headers,
            idLibroSeleccionado,
            cambioPagina,
            formatoMoneda: (valor) => accounting.formatMoney(valor),
            libroSeleccionado
        }
    }
}
</script>

<style scoped>
tr {
    cursor: pointer;
}

tr.border-row {
    border: 3px solid#212529;
}
</style>