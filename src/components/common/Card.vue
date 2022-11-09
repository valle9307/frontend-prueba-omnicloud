<template>
  <div :class="`card ${clasesCard}`">
      <div
          v-if="header"
          :class="`card-header ${clasesHeader}`"
      >
         <slot name="header"></slot>
      </div>
      <div :class="`card-body ${clasesBody}`">
          <slot name="body"></slot>
      </div>
      <div
          v-if="footer"
          :class="`card-footer ${clasesFooter}`"
      >
          <slot name="footer"></slot>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        clasesBody:{
            type: String,
            default: ''
        },
        clasesCard:{
            type: String,
            default: ''
        },
        clasesFooter: {
            type: String,
            default: ''
        },
        clasesHeader: {
            type: String,
            default: ''
        },
        header: {
            type: Boolean,
            defeault: false
        },
        footer: {
            type: Boolean,
            default: false
        }
    }
}
</script>