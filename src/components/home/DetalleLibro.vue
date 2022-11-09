<template>
  <card clasesCard="border-0 shadow-sm h-100" clasesHeader="bg-white" :header="true">
    <template #header>
      <h4 class="mb-0">Detalle de libro</h4>
    </template>
    <template #body>
      <alerta
        v-if="!libroSeleccionado.id"
        texto="No se ha selecciado algun libro"
        tipo="warning"
        :cerrar="false"
      />
      <div v-else>
        <dl>
          <dt>Titulo</dt>
          <dd>
            {{ libroSeleccionado.title }}
          </dd>
          <dt>Editorial</dt>
          <dd>
            {{ libroSeleccionado.editorial.name }}
          </dd>
          <dt>Autores</dt>
          <dd class="d-flex">
            <div
              v-for="{ id, name, last_name, file } in libroSeleccionado.authors"
              :key="id"
            >
              <div class="text-center">
                <img :src="file.url" height="30" width="30" />
              </div>
              <badge class="me-1" tipo="primary"> {{ name }} {{ last_name }} </badge>
            </div>
          </dd>
          <dt>Fecha de publicación</dt>
          <dd>
            {{ libroSeleccionado.publish_at }}
          </dd>
          <dt>Precio</dt>
          <dd>
            {{ formatoMoneda(libroSeleccionado.price) }}
          </dd>
        </dl>
        <a
          :href="libroSeleccionado.file.url"
          target="_blank"
          class="btn btn-primary btn-sm"
        >
          Ver libro
        </a>
      </div>
    </template>
  </card>
</template>

<script>
import accounting from "accounting";

export default {
  props: {
    libroSeleccionado: {
      type: Object,
      require: true,
    },
  },
  setup() {
    return {
      formatoMoneda: (valor) => accounting.formatMoney(valor),
    };
  },
};
</script>
