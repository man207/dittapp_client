<template>
  <v-container style="max-width: 720px">
    <v-row>
      <v-col cols="12" md="12">
        <stats-card></stats-card>
      </v-col>

      <v-col cols="12" md="6">
        <meal-card></meal-card>
      </v-col>
      <v-col cols="12" md="6">
        <burn-card></burn-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import StatsCard from "./StatsCard.vue";
import MealCard from "./Meal/MealCard.vue";
import BurnCard from "./Burn/BurnCard.vue";

export default {
  name: "Home",
  components: {
    StatsCard,
    MealCard,
    BurnCard,
  },
  mounted() {
    if (!this.$store.state.day) {
      let today = new Date();
      this.$store.dispatch(
        "setDay",
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      );
    }
  },
};
</script>

<style scoped>
</style>
