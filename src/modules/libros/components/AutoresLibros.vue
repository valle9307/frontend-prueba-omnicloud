<template>
    <card clasesBody="p-0" :header="true">
        <template #header>
            <div class="d-flex justify-content-between align-items-center">
                <h4 class="mb-0">Autores</h4>
                <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    @click="$emit('close')"
                >
                </button>
            </div>
        </template>
        <template #body>
            <ul class="list-group list-group-flush">
                <li
                    v-for="{ id,name,last_name } in autores"
                    :key="id"
                    class="list-group-item text-center"
                >
                    {{ name }} {{ last_name }}
                </li>
            </ul>
        </template>
    </card>
</template>

<script>
export default {
    props:{
        autores:{
            type: Array,
            require: true
        }
    },
    emits: ['close']
}
</script>