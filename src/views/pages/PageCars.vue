<template>
  <create-car-component />
</template>
<script lang="ts">
import { defineComponent } from "vue";
import createCarComponent from "../components/createCarComponent.vue";
export default defineComponent({
  components: { createCarComponent },
  methods: {},
});
</script>