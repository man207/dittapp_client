<template>
  <v-col cols="12">
    <v-card>
      <v-card-title class="align-center justify-center">
        <v-icon> mdi-food-fork-drink </v-icon>
      </v-card-title>

      <v-row>
        <v-col cols="12">
          <v-list two-line>
            <v-list-item v-for="food in consume" :key="food._id">
              <v-list-item-content>
                <v-list-item-title>غذا {{ food.food.name }}</v-list-item-title>
                <v-list-item-subtitle>کالری های غذا</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="blue lighten-1">mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
              <v-list-item-action>
                <v-btn icon>
                  <v-icon color="red lighten-1">mdi-delete</v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" class="text-center">
          <add-meal></add-meal>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>

import AddMeal from "./AddMeal.vue";
import axios from 'axios'

export default {
  components: {
    AddMeal
  },
  props: {
    title: String,
    name: String,
  },
  computed: {
    consume() {
      return this.$store.getters.consume
    }
  },
  methods: {
    selectFood() {},
  },
  mounted() {
    const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .get(`/profile/consume/day/${this.$store.state.day}`, config)
        .then((res) => {
          this.$store.dispatch("setConsume" , {consume: res.data.result});
        })
        .catch((err) => {
          console.log(err);
        });
    
  }
};
</script>

<style>
</style>