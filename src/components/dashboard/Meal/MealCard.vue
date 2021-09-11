<template>
  <v-card elevation="12">
    <v-card-title class="align-center justify-center">
      <v-icon> mdi-food-fork-drink </v-icon>
    </v-card-title>
    <v-card-subtitle class="text-center"> غذاها </v-card-subtitle>
    <v-card-text>
      <v-list two-line class="overflow-y-auto" height="300px">
        <v-list-item v-for="consume in consumes" :key="consume._id">
          <v-list-item-content>
            <v-list-item-title>{{ consume.food.name }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ consume.amount }}
              {{
                consume.serving ? consume.food.serving.name : consume.food.unit
              }}
              -
              {{
                Math.round(
                  (consume.serving
                    ? consume.food.calorie *
                      consume.amount *
                      consume.food.serving.units
                    : consume.food.calorie * consume.amount + Number.EPSILON) *
                    100
                ) / 100
              }}
              کالری</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <meal-edit :item="consume"></meal-edit>
          </v-list-item-action>
          <v-list-item-action>
            <meal-delete :item="consume"></meal-delete>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions class="justify-center">
      <search-meal></search-meal>
    </v-card-actions>
  </v-card>
</template>

<script>
import SearchMeal from "./SearchMeal.vue";
import MealDelete from "./MealDelete.vue";
import MealEdit from "./MealEdit.vue";

export default {
  components: {
    SearchMeal,
    MealDelete,
    MealEdit,
  },
  props: {
    title: String,
    name: String,
  },
  computed: {
    consumes() {
      return this.$store.getters.consume;
    },
  },
};
</script>

<style>
</style>