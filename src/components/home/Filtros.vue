<template>
  <card clasesCard="border-0 shadow-sm mb-4" clasesHeader="bg-white" :header="true">
    <template #header>
      <h4 class="mb-0">Filtros</h4>
    </template>
    <template #body>
      <div class="row">
        <columna sm="12" md="6" lg="4" xl="4" xxl="4">
          <input
            type="text"
            class="form-control"
            v-model="filtros.nombre"
            placeholder="ingrese nombre para buscar..."
            @keyup.enter="filtrar"
          />
        </columna>
        <columna sm="12" md="6" lg="4" xl="4" xxl="4">
          <el-select
            v-model="filtros.editorial_id"
            class="w-100"
            clearable
            filterable
            placeholder="Seleccionar editorial..."
          >
            <el-option
              v-for="{ id, name } in editorials"
              :key="id"
              :label="name"
              :value="id"
            />
          </el-select>
        </columna>
        <columna sm="12" md="6" lg="4" xl="4" xxl="4">
          <div class="btn-group" role="group">
            <button
              type="button"
              class="btn btn-secondary"
              :disabled="deshabilitarBotones"
              @click="borrarFiltros()"
            >
              <iconos :icon="['fas', 'eraser']" />
            </button>
            <button
              type="button"
              class="btn btn-primary"
              :disabled="deshabilitarBotones"
              @click="filtrar()"
            >
              <iconos :icon="['fas', 'search']" />
            </button>
          </div>
        </columna>
      </div>
    </template>
  </card>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import useAlertaStore from "@/store/alerta";

import api from "@/api";

export default {
  emits: ["borrar-filtros", "filtrar-libros"],
  setup(props, { emit }) {
    onMounted(async () => {
      try {
        let { data } = await api.get("/editorials/list");
        let { editorials: editorialsApi } = data;

        editorials.value = editorialsApi;
      } catch (error) {
        let { error: errorApi } = error.response.data;

        alertaStore.valoresAlerta({
          cerrar: true,
          tipo: "danger",
          texto: `${errorApi}`,
          ver: true,
        });
      }
    });

    //Composables
    const alertaStore = useAlertaStore();

    //Data
    const filtros = ref({
      libro: null,
      editorial_id: null,
    });
    const editorials = ref([]);

    //Methods
    const borrarFiltros = () => {
      filtros.value = {
        editorial_id: null,
        nombre: null,
      };

      emit("borrar-filtros");
    };

    const filtrar = () => {
      emit("filtrar-libros", filtros.value);
    };

    return {
      filtros,
      deshabilitarBotones: computed(
        () => !filtros.value.nombre && !filtros.value.editorial_id
      ),
      borrarFiltros,
      editorials,
      filtrar,
    };
  },
};
</script>
