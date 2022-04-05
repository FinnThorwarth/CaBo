<template>
  <!-- Formular for creating a car -->
  <ion-grid>
    <ion-row>
      <ion-col size="12">
        <ion-card>
          <ion-card-header>
            <ion-card-title>
              <ion-label>
                <h2>Fahrzeug hinzufügen</h2>
                <ion-text>
                  <p>Lege hier ein neues Fahrzeug an.</p>
                </ion-text>
              </ion-label>
            </ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-grid>
              <ion-row>
                <ion-col size="12">
                  <ion-item>
                    <ion-label position="floating">Marke</ion-label>
                    <ion-input type="text" v-model="car.brand"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Model</ion-label>
                    <ion-input type="text" v-model="car.model"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Jahr</ion-label>
                    <ion-input type="text" v-model="car.year"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Farbe</ion-label>
                    <ion-input type="text" v-model="car.color"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Kaufpreis</ion-label>
                    <ion-input type="text" v-model="car.price"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Beschreibung</ion-label>
                    <ion-textarea
                      type="text"
                      v-model="car.description"
                    ></ion-textarea>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Kilometerstand</ion-label>
                    <ion-input type="text" v-model="car.mileage"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-label position="floating">Kraftstoff</ion-label>
                    <ion-input type="text" v-model="car.fuel"></ion-input>
                  </ion-item>
                  <ion-item>
                    <ion-button @click="createCar"
                      >Fahrzeug hinzufügen</ion-button
                    >
                  </ion-item>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-card-content>
        </ion-card>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import {
  IonLabel,
  IonInput,
  IonTextarea,
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

import { CarTypes } from "../../types/carTypes";

export default defineComponent({
  name: "createCarComponent",
  components: {
    IonLabel,
    IonInput,
    IonTextarea,
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
      car: {} as CarTypes,
      carbrands: {} as any,
    };
  },

  async mounted() {
    // get car brands with graphql
    await axios({
      method: "POST",
      url: "https://api.cabo-management.de/graphql",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      data: {
        query: `
        {
          CarBrands {
            id
            Name
          }
        }
      `,
      },
    })
      .then((res) => {
        this.carbrands = res.data.data.carbrands;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  methods: {
    async createCar() {
      const header = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };
      await axios
        .post("https://api.cabo-management.de/items/cars", this.car, header)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
</script>