<template>
  <v-card>
    <v-card-title> {{theDay.day}} </v-card-title>
    <v-card-subtitle> {{theDay.date}} </v-card-subtitle>
    <v-progress-linear height="5" value="75"></v-progress-linear>
    <br>
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col class="pt-0 mt-0 pb-4" cols="10" sm="6">
          <v-row justify="space-around" align="center">
            <v-chip outlined color="blue darken-2" dark>
                            {{calorie.consumed}}

              <v-avatar right class="pb-1">
                <v-icon color="blue darken-2">mdi-food</v-icon>
              </v-avatar>
            </v-chip>

            

            <v-chip outlined color="blue">
              <v-avatar right>
                <v-icon color="blue">mdi-fire</v-icon>
              </v-avatar>
            </v-chip>
          </v-row>
        </v-col>
        <v-col cols="12" md="12">
          <v-row>
            <v-col cols="4" class="text-center py-0 my-0">
              <v-progress-circular
                rotate="-90"
                size="72"
                width="10"
                class="mb-2"
                :value="(protein.taken / protein.recommended) * 100"
                color="red"
              >
                پروتئین
              </v-progress-circular>
              <br />
              {{ protein.taken }} از {{ protein.recommended }}
              <br />
              گرم
            </v-col>

            <v-col cols="4" class="text-center py-0 my-0">
              <v-progress-circular
                rotate="-90"
                size="72"
                width="10"
                class="mb-2"
                :value="(carb.taken / carb.recommended) * 100"
                color="green"
              >
                کربو
              </v-progress-circular>
              <br />
              {{ carb.taken }} از {{ carb.recommended }}
              <br />
              گرم
            </v-col>

            <v-col cols="4" class="text-center py-0 my-0">
              <v-progress-circular
                rotate="-90"
                size="72"
                width="10"
                class="mb-2"
                :value="(fat.taken / fat.recommended) * 100"
                color="orange"
              >
                چربی
              </v-progress-circular>
              <br />
              {{ fat.taken }} از {{ fat.recommended }}
              <br />
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
        taken: 0,
      },
      carb: {
        recommended: 499,
        taken: 0,
      },
      fat: {
        recommended: 23,
        taken: 0,
      },
      calorie: {
        burned: 0,
        consumed: 0,
        recommended: 0,
      }

    };
  },
  computed: {
    consumes() {
      return this.$store.getters.consume;
    },
    theDay() {
      let x = this.$store.getters.day.split('-')
      let persianDays = ['یکشنبه' ,'دوشنبه','سه شنبه','چهارشنبه','پنج شنبه','جمعه','شنبه',]
      let date = new Date(x[0],x[1] - 1, x[2])
      let day = persianDays[date.getDay()]
      return { 
        date: date.toLocaleDateString('fa-ir'),
        day
        }
    }
  },
  methods: {
    initialize() {
      console.log(this.consumes)
      this.consumes.forEach((consume) => {
        this.protein.taken =
          (consume.serving
            ? consume.food.protein * consume.amount * consume.food.serving.units
            : consume.food.protein * consume.amount) + this.protein.taken;
        this.carb.taken =
          (consume.serving
            ? consume.food.carb * consume.amount * consume.food.serving.units
            : consume.food.carb * consume.amount) + this.carb.taken;
        this.fat.taken =
          (consume.serving
            ? consume.food.fat * consume.amount * consume.food.serving.units
            : consume.food.fat * consume.amount) + this.fat.taken;
        this.calorie.consumed =
          (consume.serving
            ? consume.food.calorie *
              consume.amount *
              consume.food.serving.units
            : consume.food.calorie * consume.amount) + this.calorie.consumed;
      });
    },
  },
  watch: {
    consumes() {
      this.initialize();
    }
  },
  mounted() {
  }
};
</script>

<style>
</style>