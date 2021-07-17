<template>
  <v-card >
      <v-card-title>
          نهار
      </v-card-title>
      <v-card-subtitle>
          99/11/3
      </v-card-subtitle>
      
      <v-card-text>
          <v-row
          align="center"
          justify="center"         
          >
              <v-col
              class="text-center pt-0 mt-0 pb-4"
              cols="10"
              sm="6"
              >
              <div class="text-h4">
                256 کالری
              </div>

              </v-col>
              <v-col
              cols="12"
              md="12"
              >
              <v-row>

                <v-col
                cols="4"
                class="text-center  py-0 my-0">
                <div class="text-h6">
                  پروتئین:
                </div>
                  <br>
                  {{protein.taken}}
                  
                  گرم
                </v-col>

                <v-col
                cols="4"
                class="text-center  py-0 my-0">                  
                <div class="text-h6">
                  کربو:
                </div>
                  <br>
                  {{carbo.taken}}
                  
                  گرم
                </v-col>


                <v-col
                cols="4"
                class="text-center  py-0 my-0">                  
                <div class="text-h6">
                  چربی:
                </div>
                  <br>
                  {{fat.taken}}
                  
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