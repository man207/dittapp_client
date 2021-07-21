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
                <v-list-item-title>{{ food.food.name }}</v-list-item-title>
                <v-list-item-subtitle>{{food.amount}} {{food.serving ? food.food.serving.name : food.food.unit }} - {{food.serving ? food.food.calorie * food.amount * food.food.serving.units : food.food.calorie * food.amount}} کالری</v-list-item-subtitle>
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
          <search-meal></search-meal>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>

import SearchMeal from "./SearchMeal.vue";
import axios from 'axios'

export default {
  components: {
    SearchMeal
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
          let x = res.data.result;
          x.map( food => {
            let w = food.food;
            if (w.unit == 'gr') w.unit = 'گرم' 
            if (w.unit == 'ml') w.unit = 'میلی لیتر' 
          })
          this.$store.dispatch("setConsume" , {consume: x});
        })
        .catch((err) => {
          console.log(err);
        });
    
  }
};
</script>

<style>
</style>