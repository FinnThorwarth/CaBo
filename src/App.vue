<template>
  <ion-app>
    <ion-split-pane content-id="main-content">
      <!-- Insert Menu -->
      <main-menu :userLoggedIn="userLoggedIn" :userData="userData"  />
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
</template>

<script lang="ts">
import { defineComponent} from "vue";
import axios from "axios";
import { userTypes } from "./types/UserTypes";
import  MainMenu from "./views/components/MainMenuComponent.vue";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/vue";

import {
  archiveOutline,
  archiveSharp,
  trashOutline,
  trashSharp,
  warningOutline,
  warningSharp,
} from "ionicons/icons";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    MainMenu,
  },
  setup() {
    return {
      archiveOutline,
      archiveSharp,
      trashOutline,
      trashSharp,
      warningOutline,
      warningSharp,
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
    this.refreshAuthTokenInterval();
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

    // Interval zum Prüfen und reaktivieren des Tokens
    refreshAuthTokenInterval() {
      if (this.onlineMode && this.userLoggedIn) {
        setInterval(() => {
          console.log("Refreshing token");
          this.refreshAuthToken();
        }, 300000);
      }
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
  },
});
</script>