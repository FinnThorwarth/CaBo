<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <ion-menu v-if="userLoggedIn" content-id="main-content" type="overlay">
        <ion-content>
          <ion-list id="inbox-list">
            <ion-list-header>Menü</ion-list-header>
            <ion-note class="ion-padding-start" v-if="userData"
              >{{ userData.first_name }} {{ userData.last_name }}</ion-note
            >

            <ion-menu-toggle
              auto-hide="false"
              v-for="(p, i) in appPages"
              :key="i"
            >
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
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import {
  IonApp,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterOutlet,
  IonSplitPane,
} from "@ionic/vue";

import {
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
  settingsSharp,
  settingsOutline,
  homeOutline,
  homeSharp,
} from "ionicons/icons";

import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonContent,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterOutlet,
    IonSplitPane,
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
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
      isSelected: (url: string) => (url === route.path ? "selected" : ""),
    };
  },
  data() {
    return {
      onlineMode: false,
      userLoggedIn: false,
      userData: {},
      timer: 0,
    };
  },
  mounted() {
    this.getOnlineMode();
    this.getUserData();
    this.getLoggedIn();

    // Heartbeat
    this.timer = setInterval(() => {
      this.refreshAuthToken();
    }, 800000);
  },
  methods: {
    getUserData() {
      if (this.onlineMode) {
        axios
          .get("https://api.cabo-management.de/users/me", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          })
          .then((response) => {
            console.log(response.data.data);
            localStorage.setItem(
              "user_data",
              JSON.stringify(response.data.data)
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getLoggedIn() {
      if (localStorage.getItem("access_token") != null) {
        this.userLoggedIn = true;
        // Userdaten aus dem LocalStorage holen
        if (localStorage.getItem("user_data") != null) {
          this.userData = JSON.parse(localStorage.getItem("user_data")!);
        }
      }else{
        this.userLoggedIn = false;
        this.$router.push("/login");
      }
    },
    getOnlineMode() {
      return true;
    },

    refreshAuthToken() {
      if (this.onlineMode) {
        console.log("Refreshing token");
        axios
          .post("https://api.cabo-management.de/auth/refresh", {
            refresh_token: localStorage.getItem("refresh_token")!,
          })
          .then((response) => {
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("refresh_token", response.data.refresh_token);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
});
</script>