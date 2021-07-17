<template>
  <v-col cols="12">
    <v-card>
      <v-card-title class="align-center justify-center">
        <v-icon> mdi-food-fork-drink </v-icon>
      </v-card-title>

      <v-row>
        <v-col cols="12">
          <v-list two-line>
            <v-list-item v-for="i in 12" :key="i">
              <v-list-item-content>
                <v-list-item-title>غذا {{ i }}</v-list-item-title>
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
      <v-row>
        <v-col cols="12">
          <activity-card></activity-card>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>

import ActivityCard from "./AddMeal.vue";


export default {
  components: {
    ActivityCard
  },
  props: {
    title: String,
    name: String,
  },
  data() {
    
  },
  methods: {
    selectFood() {},
  },
};
</script>

<style>
</style>