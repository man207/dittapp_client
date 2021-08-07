<template>
  <v-col cols="12">
    <v-card>
      <v-card-title class="align-center justify-center">
        <v-icon> mdi-food-fork-drink </v-icon>
      </v-card-title>

      <v-row>
        <v-col cols="12">
          <v-list two-line>
            <v-list-item v-for="consume in consumes" :key="consume._id">
              <v-list-item-content>
                <v-list-item-title>{{ consume.food.name }}</v-list-item-title>
                <v-list-item-subtitle>{{consume.amount}} {{consume.serving ? consume.food.serving.name : consume.food.unit }} - {{consume.serving ? consume.food.calorie * consume.amount * consume.food.serving.units : consume.food.calorie * consume.amount}} کالری</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <meal-edit :item="consume"></meal-edit>
              </v-list-item-action>
              <v-list-item-action>
                <meal-delete :item="consume"></meal-delete>
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
import MealDelete from "./MealDelete.vue";
import MealEdit from "./MealEdit.vue";

export default {
  components: {
    SearchMeal,
    MealDelete,
    MealEdit
  },
  props: {
    title: String,
    name: String,
  },
  computed: {
    consumes() {
      return this.$store.getters.consume;
    }
  }
};
</script>

<style>
</style>