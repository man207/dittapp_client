<template>
  <v-card elevation="12">
    <v-card-title class="align-center justify-center">
      <v-icon> mdi-run </v-icon>
      <v-icon> mdi-weight-lifter </v-icon>
      <v-icon> mdi-bike </v-icon>
    </v-card-title>
<v-card-subtitle class="text-center">
  فعالیت‌ها
</v-card-subtitle>
    <v-card-text>
      <v-list two-line height="300px">
        <v-list-item v-for="burn in burns" :key="burn._id">
          <v-list-item-content>
            <v-list-item-title>{{ burn.activity.name }}</v-list-item-title>
            <v-list-item-subtitle
              >{{ burn.minutes }} دقیقه -
              {{ Math.round((burn.minutes * burn.activity.caloriePerMinute + Number.EPSILON) * 100) / 100  }}
              کالری</v-list-item-subtitle
            >
          </v-list-item-content>
          <v-list-item-action>
            <burn-edit :item="burn"></burn-edit>
          </v-list-item-action>
          <v-list-item-action>
            <burn-delete :item="burn"></burn-delete>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>

    <v-card-actions class="justify-center">
      <search-activity></search-activity>
    </v-card-actions>
  </v-card>
</template>

<script>
import SearchActivity from "./SearchActivity.vue";
import BurnDelete from "./BurnDelete.vue";
import BurnEdit from "./BurnEdit.vue";
import axios from "axios";

export default {
  components: {
    SearchActivity,
    BurnDelete,
    BurnEdit,
  },
  props: {
    title: String,
    name: String,
  },
  computed: {
    burns() {
      return this.$store.getters.burn;
    },
  },
  mounted() {
    const config = {
      headers: { Authorization: `Bearer ${this.$store.state.token}` },
    };
    axios
      .get(`/profile/burn/day/${this.$store.state.day}`, config)
      .then((res) => {
        let x = res.data.result;
        this.$store.dispatch("setBurn", { burn: x });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.desktop-height {
  height: 1200px;
}
</style>