<template>
  <v-col cols="12">
    <v-card>
      <v-card-title class="align-center justify-center">
        <v-icon> mdi-run </v-icon>
        <v-icon> mdi-weight-lifter </v-icon>
        <v-icon> mdi-bike </v-icon>
      </v-card-title>

      <v-row>
        <v-col cols="12">
          <v-list two-line>
            <v-list-item v-for="i in 12" :key="i">
              <v-list-item-content>
                <v-list-item-title>ورزش {{ i }}</v-list-item-title>
                <v-list-item-subtitle>اطلاعات فعالیت</v-list-item-subtitle>
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
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    title: String,
    name: String,
  },
  methods: {
    selectFood() {},
  },
};
</script>

<style>
</style>