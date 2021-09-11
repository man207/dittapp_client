<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="2">
        <v-card>
          <v-list color="transparent">


            <v-list-item link to="/settings/editbiometric">
              <v-list-item-content>
                <v-list-item-title> اطلاعات جسمی   </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link to="/settings/changepassword">
              <v-list-item-content>
                <v-list-item-title> تغییر رمز </v-list-item-title>
              </v-list-item-content>
            </v-list-item>

            <v-list-item link to="/settings/themes">
              <v-list-item-content>
                <v-list-item-title> انتخاب تم </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="10">
        <v-sheet min-height="500px" class="mt-3" rounded elevation="6">
            <v-row >
              <v-col
                cols="12"
                lg="3"
                class="d-flex justify-center align-center"
              >
                <div class="text-h5">{{this.$route.meta.name}}</div>
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