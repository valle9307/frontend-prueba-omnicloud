import { ref } from 'vue'

export default (listado = null) => {
    const params = ref({
        page: 1,
        per_page: 15,
        query: ''
    })

    //Methods
    const cambioPagina = ({ page,rows }) => {
        if (page === 0) {
            page = 1
        } else {
            page = page + 1
        }

        params.value.page     = page
        params.value.per_page = rows
        params.value.query    = ''

        if (listado) {
            (async () => await listado(params.value))()
        }
    }

    const existenRegistros = (data) => (data.length > 0)

    const filtrarDatos = (query) => {
        params.value.page  = 1
        params.value.query = query
        
        if (listado) {
            (async () => await listado(params.value))()
        }
    }

    const mensajeRegistrosPaginados = ({from,to,total}) => {
        return `Mostrando del ${from} al ${to} de ${total} registros`
    }

    return {
        cambioPagina,
        existenRegistros,
        filtrarDatos,
        mensajeRegistrosPaginados,
        params
    }
}