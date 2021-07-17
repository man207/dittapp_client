<template>
  <v-card >
      <v-card-title>
          شنبه
      </v-card-title>
      <v-card-subtitle>
          99/11/3
      </v-card-subtitle>
      <v-progress-linear height="5" value="75"></v-progress-linear>
      <v-card-text>
          <v-row
          align="center"
          justify="center"         
          >
              <v-col
              class=" pt-0 mt-0 pb-4"
              cols="10"
              sm="6"
              >
              <v-row justify="space-around" align="center">
                <v-chip
                
                outlined
                color="blue darken-2"
                dark
              >
                  2300
                <v-avatar right class="pb-1">
                  <v-icon color="blue darken-2">mdi-food</v-icon>
                </v-avatar>
              </v-chip>
              
              <v-avatar
               color="blue darken-2"
                size="72"

              >
                <div class="white--text">

                700 مانده
                </div>
              </v-avatar>
              
              <v-chip
              outlined
               color="blue"
               
              >
                3000
                <v-avatar right>
                  <v-icon color="blue">mdi-fire</v-icon>
                </v-avatar>
              </v-chip>
              </v-row>
                
              </v-col>
              <v-col
              cols="12"
              md="12"
              >
              <v-row>

                <v-col
                cols="4"
                class="text-center  py-0 my-0">                  
                  <v-progress-circular
                  rotate="-90"
                  size="72"
                  width="10"
                  class="mb-2"
                  :value="protein.taken/protein.recommended * 100"
                  color="red"
                  >
                  پروتئین
                  </v-progress-circular>
                  <br>
                  {{protein.taken}} از {{protein.recommended}}
                  <br>
                  گرم
                </v-col>

                <v-col
                cols="4"
                class="text-center  py-0 my-0">                  
                  <v-progress-circular
                  rotate="-90"
                  size="72"
                  width="10"
                  class="mb-2"
                  :value="carbo.taken/carbo.recommended * 100"
                  color="green"
                  >
                  کربو
                  </v-progress-circular>
                  <br>
                  {{carbo.taken}} از {{carbo.recommended}}
                  <br>
                  گرم
                </v-col>


                <v-col
                cols="4"
                class="text-center  py-0 my-0">                  
                  <v-progress-circular
                  rotate="-90"
                  size="72"
                  width="10"
                  class="mb-2"
                  :value="fat.taken/fat.recommended * 100"
                  color="orange"
                  >
                  چربی
                  </v-progress-circular>
                  <br>
                  {{fat.taken}} از {{fat.recommended}}
                  <br>
                  گرم
                </v-col>
              </v-row>
              </v-col>

          </v-row>
      </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      protein: {
        recommended: 30,
        taken:10
      },
      carbo: {
        recommended: 499,
        taken:300
      },
      fat: {
        recommended: 23,
        taken:4
      }
    }
  }

}
</script>

<style>

</style>