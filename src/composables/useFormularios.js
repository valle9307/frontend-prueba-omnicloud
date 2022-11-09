import { ref } from 'vue'

export default () => {
    //Data
    const errores  = ref({})
    const loading  = ref(false)
    const verModal = ref(false)

    //Methods
    const manejoErroresApi = (errorCatch,registro) => {
        let accion        = (registro.id) ? 'editar' : 'guardar'
        let { status }    =  errorCatch.response
        let valoresAlerta = {}
        let erroresApi    = {}
        let message       = ''

        if (status === 422) {
            let { errors } = errorCatch.response.data

            erroresApi = errors
            valoresAlerta = {
                cerrar: true,
                texto: `No se pudo ${accion} el registro`,
                tipo: 'danger',
                ver: true
            }
        } else {
            let { error, message: messageApi } =  errorCatch.response.data
            erroresApi = error
            message = `${status} - ${messageApi} ${error || ''}`
            valoresAlerta = {
                cerrar: true,
                texto: message,
                tipo: 'danger',
                ver: true
            }
        }

        return { erroresApi,valoresAlerta }
    }

    return {
        errores,
        loading,
        manejoErroresApi,
        verModal
    }
}