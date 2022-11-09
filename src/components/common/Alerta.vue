<template>
  <div :class="`alert ${colorAlerta} alert-dismissible fade show`" role="alert">
    <iconos :icon="['fas', icono]" size="lg" />
    {{ texto }}
    <button
      v-if="cerrar"
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="$emit('cerrar-alerta')"
    ></button>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    cerrar: {
      type: Boolean,
      default: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    //Computed
    const colorAlerta = computed(() => {
      let colores = {
        danger: "alert-danger",
        success: "alert-success",
        info: "alert-info",
        primary: "alert-primary",
        warning: "alert-warning",
        dark: "alert-dark",
      };

      return colores[props.tipo];
    });

    const icono = computed(() => {
      let tipos = {
        danger: "exclamation-circle",
        info: "info-circle",
        success: "check-circle",
        warning: "exclamation-triangle",
        primary: "check",
      };

      return tipos[props.tipo];
    });

    return { colorAlerta, icono };
  },
};
</script>

<style scoped>
.alert {
  font-size: 17px;
}
</style>
