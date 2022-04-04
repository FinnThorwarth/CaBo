<template>
  <ion-page>
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <ion-card>
            <ion-card-header>
              <ion-card-title>
                <ion-label>
                  <h2>Login</h2>
                </ion-label>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-grid>
                <ion-row>
                  <ion-col size="12">
                    <ion-text v-if="this.error != ''" color="danger">
                      <h4>{{ error }}</h4>
                    </ion-text>
                    <ion-item>
                      <ion-label position="floating">Email</ion-label>
                      <ion-input type="email" v-model="email"></ion-input>
                    </ion-item>
                    <ion-item>
                      <ion-label position="floating">Password</ion-label>
                      <ion-input type="password" v-model="password"></ion-input>
                    </ion-item>
                    <ion-button expand="block" @click="login">Login</ion-button>
                  </ion-col>
                  <ion-col size="12" class="ion-padding">
                    Noch keinen Account? Jetzt
                    <a href="/register">Registrieren</a>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-card-content>
          </ion-card>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
} from "@ionic/vue";
import axios from "axios";

export default {
  name: "PageLogin",

  components: {
    IonPage,
    IonLabel,
    IonInput,
    IonItem,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonText,
  },

  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  methods: {
    login() {
      axios
        .post("https://api.cabo-management.de/auth/login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data.data);
          if (response.data.data.access_token != null) {
            localStorage.setItem(
              "access_token",
              response.data.data.access_token
            );
            localStorage.setItem(
              "refresh_token",
              response.data.data.refresh_token
            );
            this.$router.push("/");
          } else this.error = "Falsche Email oder Passwort";
        })
        .catch((error) => {
          console.log(error);
          this.error = "Falsche Email oder Passwort";
        });
    },
  },
};
</script>

<style>
</style>