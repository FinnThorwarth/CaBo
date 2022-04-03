<template>
  <ion-grid>
    <ion-row>
      <ion-col size="12" size-md="6" offset-md="3">
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-label>
                <h2>Login</h2>
              </ion-label>
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Email</ion-label>
              <ion-input type="email" v-model="email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Password</ion-label>
              <ion-input type="password" v-model="password"></ion-input>
            </ion-item>
            <ion-button expand="block" @click="login">Login</ion-button>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script>
import { IonLabel, IonInput, IonItem } from "@ionic/vue";
import axios from "axios";

export default {
  name: "PageLogin",

  components: { IonLabel, IonInput, IonItem },

  data() {
    return {
      email: "",
      password: "",
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
          localStorage.setItem("access_token", response.data.data.access_token);
          localStorage.setItem("refresh_token", response.data.data.refresh_token);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style>
</style>