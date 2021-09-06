<template>
  <v-container fill-height="fill-height">
    <v-layout align-center justify-center>
      <v-flex class="text-center">
        <v-card elevation="0" min-height="500px" >
          <v-card-title class="justify-center">تم مورد نظر را انتخاب کنید</v-card-title>
          <v-card-text class="justify-center d-flex align-center" style="min-height:400px">
              <v-row>
                  <v-col cols="6" lg="3" class="d-flex justify-center ">
                      <v-card class="mello" height="100px" width="100px" @click="changeTheme('mello')"></v-card>
                  </v-col>
                  <v-col cols="6" lg="3" class="d-flex justify-center">
                      <v-card style="background: #414141" height="100px" width="100px" @click="changeTheme('normalgrey')"></v-card>
                  </v-col>
                  <v-col cols="6" lg="3" class="d-flex justify-center">
                      <v-card class="cinnamint" height="100px" width="100px" @click="changeTheme('cinnamint')"></v-card>
                  </v-col>
                  <v-col cols="6" lg="3" class="d-flex justify-center">
                      <v-card class="shalala" height="100px" width="100px" @click="changeTheme('shalala')"></v-card>
                  </v-col>
                  <v-col cols="6" lg="3" class="d-flex justify-center">
                      <v-card class="celestial" height="100px" width="100px" @click="changeTheme('celestial')"></v-card>
                  </v-col>
                  <v-col cols="6" lg="3" class="d-flex justify-center">
                      <v-card class="nepal" height="100px" width="100px" @click="changeTheme('nepal')" ></v-card>
                  </v-col>
                  <v-col cols="6" lg="3" class="d-flex justify-center" >
                      <v-card class="royal" height="100px" width="100px" @click="changeTheme('royal')" ></v-card>
                  </v-col>
                  <v-col cols="6" lg="3" class="d-flex justify-center" >
                      <v-card height="100px" width="100px" @click="changeTheme('')" ></v-card>
                  </v-col>
                  
              </v-row>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
    methods: {
        changeTheme(themeName) {
            this.$store.dispatch('setTheme', themeName)
        }
    }
}
</script>

<style>

</style>