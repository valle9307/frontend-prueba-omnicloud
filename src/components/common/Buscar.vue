<template>
    <div class="input-group">
        <input
            type="text"
            class="form-control"
            v-model="textoFiltro"
            @keyup.enter="filtrar"
            placeholder="ingrese texto para buscar..."
        />
        <button
            type="button"
            class="btn btn-secondary"
            @click="borrarFiltro"
        >
            <iconos :icon="['fas','eraser']" />
        </button>
        <button
            type="button"
            class="btn btn-primary"
            @click="filtrar"
        >
            <iconos :icon="['fas','search']" />
        </button>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    emits:['filtrar'],
    setup(props, { emit }) {
        const textoFiltro = ref('')

        //Methods
        const borrarFiltro = () => {
            textoFiltro.value = ''
            emit('filtrar', textoFiltro.value)
        }

        const filtrar = () => {
            emit('filtrar', textoFiltro.value)
        }

        return { 
            borrarFiltro,
            filtrar,
            textoFiltro
        }
    }
}
</script>