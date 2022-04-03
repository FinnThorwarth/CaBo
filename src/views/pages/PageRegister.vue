<template>
  <ion-page>
    <ion-grid>
      <ion-row>
        <ion-col size="12">
          <ion-card>
            <ion-card-header>
              <ion-card-title>
                <ion-label>
                  <h2>Registrieren</h2>
                </ion-label>
              </ion-card-title>
            </ion-card-header>
            <ion-card-content>
              <ion-grid>
                <ion-row>
                  <ion-col size="12">
                    <ion-item>
                      <ion-label position="floating">Vorname</ion-label>
                      <ion-input
                        type="firstname"
                        v-model="firstname"
                      ></ion-input>
                    </ion-item>
                    <ion-item>
                      <ion-label position="floating">Nachname</ion-label>
                      <ion-input type="lastname" v-model="lastname"></ion-input>
                    </ion-item>
                    <ion-item>
                      <ion-label position="floating" required>Email</ion-label>
                      <ion-input type="email" v-model="email"></ion-input>
                    </ion-item>
                    <ion-item>
                      <ion-label position="floating" required
                        >Password</ion-label
                      >
                      <ion-input type="password" v-model="password"></ion-input>
                    </ion-item>
                    <ion-item>
                      <ion-label position="floating" required
                        >Passwort wiederholen</ion-label
                      >
                      <ion-input
                        type="password"
                        v-model="password2"
                      ></ion-input>
                    </ion-item>
                    <ion-item>
                      <ion-checkbox
                        v-model="acceptTerms"
                        required
                      ></ion-checkbox>
                      <ion-label class="ion-padding-start"
                        >Ich habe die
                        <a href="/terms">Nutzungsbedingungen</a> gelesen und
                        akzeptiere diese.</ion-label
                      >
                    </ion-item>
                    <ion-item>
                      <ion-checkbox
                        v-model="acceptPrivacy"
                        required
                      ></ion-checkbox>
                      <ion-label class="ion-padding-start"
                        >Ich habe die
                        <a href="/privacy">Datenschutzerklärung</a> gelesen und
                        akzeptiere diese.</ion-label
                      >
                    </ion-item>
                    <ion-button expand="block" @click="register"
                      >Registrieren</ion-button
                    >
                  </ion-col>
                  <ion-col size="12" class="ion-padding">
                    Bereits einen Account? Jetzt
                    <a href="/login">Einloggen</a>
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

<script>
import {
  IonPage,
  IonLabel,
  IonInput,
  IonItem,
  IonCheckbox,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from "@ionic/vue";
import axios from "axios";

export default {
  name: "PageLogin",

  components: {
    IonPage,
    IonLabel,
    IonInput,
    IonItem,
    IonCheckbox,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
  },

  data() {
    return {
      userRole: "892029d0-b29b-4559-a93d-876107046e21",
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      password2: "",
      acceptTerms: false,
      acceptPrivacy: false,
    };
  },
  methods: {
    register() {
      if (this.password !== this.password2) {
        alert("Passwörter stimmen nicht überein.");
        return;
      }
      if (!this.acceptTerms) {
        alert("Bitte akzeptiere die Nutzungsbedingungen.");
        return;
      }
      if (!this.acceptPrivacy) {
        alert("Bitte akzeptiere die Datenschutzerklärung.");
        return;
      }
      axios
        .post("https://api.cabo-management.de/users", {
          first_name: this.firstname,
          last_name: this.lastname,
          email: this.email,
          password: this.password,
          userRole: this.userRole,
        })
        .then(() => {
          alert("Registrierung erfolgreich. Bitte logge dich ein.");
          this.$router.push("/login");
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    },
  },
};
</script>

<style>
</style>