<template>
    <span :class="'badge bg-'+tipoBadge">
        <slot></slot>
    </span>
</template>

<script>
import { computed } from 'vue'

export default {
    props:{
        tipo:{
            type: String,
            default: ''
        }
    },
    setup(props) {
        //Computed
        const tipoBadge = computed(() => {
            if (props.tipo === 'warning' || props.tipo === 'secondary') {
                return `${props.tipo} text-dark`
            }

            return props.tipo
        })

        return { tipoBadge }
    }
}
</script>