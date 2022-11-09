import { defineStore } from 'pinia'

const useAlertaStore = defineStore('alerta',{
    state: () => ({
        alerta: {
            cerrar: true,
            texto: null,
            tipo: null,
            ver: false
        }
    }),
    actions:{
        valoresAlerta(valores) {
            this.alerta = valores
        },
        resetearAlerta() {
            this.alerta = {
                cerrar: true,
                texto: null,
                tipo: null,
                ver: false
            }
        }
    }
})

export default useAlertaStore