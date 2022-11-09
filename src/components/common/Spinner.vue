<template>
    <div
        :class="[
            isSmall,
            `text-${tipo} ms-1`,
            { agrandar: agrandar }
        ]"
        role="status"
    >
    </div>
</template>

<script>
import { computed } from 'vue'

export default {
    props:{
        agrandar: {
            type: Boolean,
            default: false
        },
        small: {
            type:Boolean,
            default: false
        },
        tipo: {
            type: String,
            required: true
        },
    },
    setup(props) {
        return {
            isSmall: computed(() => {
                if (props.small) {
                    return 'spinner-border spinner-border-sm mb-1';
                }

                return 'spinner-border';
            })
        }
    }
}
</script>

<style scoped>
.agrandar {
    height: 50px;
    width: 50px;
}
</style>