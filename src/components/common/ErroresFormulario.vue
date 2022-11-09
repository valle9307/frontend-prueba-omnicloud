<template>
    <div class="text-danger">
        <div 
            v-for="error in errores"
            :key="error"
        >
            <small>{{ error }}</small>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            errores:{
                type: Array,
                required: true
            }
        }
    }
</script>

<style scoped>
    small {
        font-weight: 500;
    }
</style>