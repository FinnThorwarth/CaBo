<template>
  <ion-header :translucent="true">
    <ion-toolbar>
      <ion-buttons>
        <ion-menu-button color="primary"></ion-menu-button>
      </ion-buttons>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
</template>
<script lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle,
  IonButtons,
} from "@ionic/vue";
export default {
  components: {
    IonHeader,
    IonToolbar,
    IonMenuButton,
    IonTitle,
    IonButtons,
  },
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>