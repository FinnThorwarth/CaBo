<template>
  <ion-page>
    <Header :title="title" />

    <ion-content :fullscreen="true">
      <div id="container"></div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "../components/HeaderComponent.vue";
import { IonContent, IonPage } from "@ionic/vue";

export default defineComponent({
  name: "HomePage",
  components: {
    IonContent,
    IonPage,
    Header,
  },
  data() {
    return {
      title: "Home",
    };
  },
});
</script>

<style scoped>
</style>
