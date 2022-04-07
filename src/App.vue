<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
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
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { userTypes } from "./types/UserTypes";
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
      userData: {} as userTypes,
    };
  },
  async mounted() {
    console.log("mounted");
    this.getOnlineMode();
    this.getLoggedIn();
    this.getUserData();
    // Heartbeat
    this.refreshAuthToken();
  },
  methods: {
    getUserData() {
      if (this.onlineMode && this.userLoggedIn) {
        axios({
          method: "POST",
          url: "https://api.cabo-management.de/graphql/system",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          data: {
            query: `
              {
                users_me {
                  first_name 
                  last_name
                }
              }
            `,
          },
        })
          .then((response) => {
            console.log(response.data.data);
            localStorage.setItem(
              "user_data",
              JSON.stringify(response.data.data.users_me)
            );
          })
          .catch((error) => {
            console.log(error);
            //if error is 403 refresh token
            if (error.response.status === 403) {
              this.refreshAuthToken();
            }
          });
      }
    },
    getLoggedIn() {
      if (
        localStorage.getItem("access_token") != null &&
        localStorage.getItem("access_token") != "undefined"
      ) {
        this.userLoggedIn = true;
        // Userdaten aus dem LocalStorage holen
        if (localStorage.getItem("user_data") != null) {
          this.userData = JSON.parse(
            (localStorage.getItem("user_data") as string) || ""
          );
        }
      } else {
        this.userLoggedIn = false;
        this.$router.push("/login");
      }
    },
    getOnlineMode() {
      this.onlineMode = true;
    },

    refreshAuthToken() {
      let refresh_token = localStorage.getItem("refresh_token" as string);
      axios({
        method: "POST",
        url: "https://api.cabo-management.de/graphql/system",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        data: {
          query: `
              mutation {
              auth_refresh(refresh_token: "${refresh_token}", mode: json) {
              access_token
              refresh_token
                }
              }
            `,
        },
      })
        .then((response) => {
          // Store data in localStorage
          localStorage.setItem(
            "access_token",
            response.data.data.auth_refresh.access_token
          );
          localStorage.setItem(
            "refresh_token",
            response.data.data.auth_refresh.refresh_token
          );
        })

        .catch((error) => {
          console.log(error);
          //if error is 403 redirect to login
          if (error.response.status === 403) {
            this.userLoggedIn = false;
            this.$router.push("/login");
          }
        });
    },

    refreshAuthTokenInterval() {
      if (this.onlineMode && this.userLoggedIn) {
        setInterval(function (this: any) {
          console.log("Refreshing token");
          this.refreshAuthToken();
        }, 60000);
      }
    },
  },
});
</script>