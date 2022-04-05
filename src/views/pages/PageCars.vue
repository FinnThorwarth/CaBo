<template>
  <ion-page>
    <Header :title="title" />
    <ion-content :fullscreen="true">
      <create-car-component />
    </ion-content>
  </ion-page>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import createCarComponent from "../components/createCarComponent.vue";
import Header from "../components/HeaderComponent.vue";
import { IonPage, IonContent } from "@ionic/vue";
export default defineComponent({
  components: { createCarComponent, Header, IonPage, IonContent },
  data() {
    return {
      title: "Fahrzeuge",
    };
  },
  methods: {},
});
</script>