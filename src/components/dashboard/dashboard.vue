<template>
  <v-container style="max-width: 720px">
    <v-row>
      <v-col cols="12">
        <stats-card></stats-card>
      </v-col>
    </v-row>
    <div class="text-h5 pt-4">تغذیه</div>
    <v-row>
      <meal-card></meal-card>
    </v-row>
    <div class="text-h5 pt-4">فعالیت‌ها</div>
    <v-row>
      <activity-card></activity-card>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import StatsCard from "./StatsCard.vue";
import MealCard from "./MealCard.vue";
import ActivityCard from "./ActivityCard.vue";

export default {
  name: "Home",
  components: {
    StatsCard,
    MealCard,
    ActivityCard,
  },
};
</script>
