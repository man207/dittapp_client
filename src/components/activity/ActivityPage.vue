<template>
  <v-container>
    <v-row>
      <v-col cols="12" lg="2">
        <v-card>
          <v-list color="transparent">


            <v-list-item link to="/activity/myactivities">
              <v-list-item-content>
                <v-list-item-title>فعالیت‌های من
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link to="/activity/addactivity">
              <v-list-item-content>
                <v-list-item-title> اضافه کردن فعالیت </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" lg="10">
        <v-sheet min-height="500px" class="mt-3" rounded elevation="6">
            <v-row >
              <v-col
                cols="12"
                lg="3"
                class="d-flex justify-center align-center"
              >
                <div class="text-h5" >{{this.$route.meta.name}}</div>
              </v-col>
              <v-divider vertical> </v-divider>
              <v-col cols="12" lg="9">
                <router-view></router-view>
              </v-col>
            </v-row>
          </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>