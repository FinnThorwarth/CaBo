<template>
  <ion-menu v-if="userLoggedIn" content-id="main-content" type="overlay">
    <ion-content>
      <ion-list id="inbox-list">
        <ion-list-header>Menü</ion-list-header>
        <ion-note class="ion-padding-start" v-if="userData"
          ><span v-if="userData.first_name != ''">{{
            userData.first_name
          }}</span
          ><span v-if="userData.last_name != ''">{{
            userData.last_name
          }}</span></ion-note
        >

        <ion-menu-toggle auto-hide="false" v-for="(p, i) in appPages" :key="i">
          <ion-item
            @click="selectedIndex = i"
            router-direction="root"
            :router-link="p.url"
            lines="none"
            detail="false"
            class="hydrated"
            :class="{ selected: selectedIndex === i }"
          >
            <ion-icon :ios="p.iosIcon" :md="p.mdIcon"></ion-icon>
            <ion-label>{{ p.title }}</ion-label>
          </ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/vue";

import {
  settingsSharp,
  settingsOutline,
  homeOutline,
  homeSharp,
} from "ionicons/icons";

export default defineComponent({
  name: "MainMenu",
  components: {
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
  },
  props: {
    userLoggedIn: {
      type: Boolean,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },

  setup() {
    const selectedIndex = ref(0);
    const appPages = [
      {
        title: "Home",
        url: "/home",
        iosIcon: homeOutline,
        mdIcon: homeSharp,
      },
      {
        title: "Settings",
        url: "/settings",
        iosIcon: settingsOutline,
        mdIcon: settingsSharp,
      },
    ];

    const path = window.location.pathname.split("folder/")[1];
    if (path !== undefined) {
      selectedIndex.value = appPages.findIndex(
        (page) => page.title.toLowerCase() === path.toLowerCase()
      );
    }

    const route = useRoute();
    return {
      selectedIndex,
      appPages,
      isSelected: (url: string) => (url === route.path ? "selected" : ""),
    };
  },
  data() {
    return {};
  },
});
</script>
<style scoped>
.menu-side-start .item {
  cursor: pointer;
}
ion-icon {
  margin-right: 10px;
}
</style>