<template>
    <div :class="clasesColumna">
        <slot></slot>
    </div>
</template>

<script>
import { computed } from 'vue'

export default {
    props: {
        sm: {
            type: String,
            default: ''
        },
        md: {
            type: String,
            default: ''
        },
        lg: {
            type: String,
            default: ''
        },
        xl: {
            type: String,
            default: ''
        },
        xxl: {
            type: String,
            default: ''
        },
        clases: {
            type: String,
            default: ''
        }
    },
    setup(props) {
        const clasesColumna = computed(() => {
            return `col-sm-${props.sm} col-md-${props.md} col-lg-${props.lg} col-xl-${props.xl} col-xxl-${props.xxl} ${props.clases}`
        })

        return { clasesColumna }
    }
}
</script>