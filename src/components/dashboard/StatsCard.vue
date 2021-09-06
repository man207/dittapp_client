<template>
  <v-card elevation="12" outlined>
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn text @click="setDayToYesterday">
        <v-icon> mdi-chevron-right </v-icon>
        دیروز
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="setDayToToday"> بازگشت به امروز </v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="setDayToTomorrow">
        فردا
        <v-icon> mdi-chevron-left </v-icon>
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
    <v-card-title class="justify-center"> {{ theDay.day }} </v-card-title>
    <v-card-subtitle class="text-center"> {{ theDay.date }} </v-card-subtitle>
    <v-progress-linear
      height="5"
      :value="(100 * calorie.consumed) / calorie.burned"
      :indeterminate="loading"
    ></v-progress-linear>
    <br />
    <v-card-text>
      <v-row align="center" justify="center">
        <v-col class="pt-0 mt-0 pb-8" cols="10" sm="6">
          <v-row justify="space-around" align="center">
            <div class="text-center text-h6 blue--text text--darken-2">

              {{ calorie.consumed }}
                از
              {{ calorie.burned }}
                کالری
            </div>
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
                :indeterminate="loading"
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
                :indeterminate="loading"
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
                :indeterminate="loading"
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
    <template v-if="weight">
      <v-card-title class="justify-center">
        وزن: {{ weight.weight }} کیلوگرم <weight-edit></weight-edit
      ></v-card-title>
      <v-card-subtitle class="text-center">
        ثبت شده در: {{ weight.date }}
      </v-card-subtitle>
    </template>
    <template v-if="!weight">
      <v-card-subtitle class="text-center"
        ><weight-edit></weight-edit> تا آخر این روز وزنی اضافه نشده است
      </v-card-subtitle>
    </template>
    <v-card-actions class="justify-center"> </v-card-actions>
  </v-card>
</template>

<script>
import WeightEdit from "./WeightEdit.vue";

export default {
  components: {
    WeightEdit,
  },
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
      },
      loading: false,
    };
  },
  computed: {
    consumes() {
      return this.$store.state.consume;
    },
    burns() {
      return this.$store.state.burn;
    },
    recommended() {
      return this.$store.state.recommended;
    },
    theDay() {
      let x = this.$store.state.day.split("-");
      let persianDays = [
        "یکشنبه",
        "دوشنبه",
        "سه شنبه",
        "چهارشنبه",
        "پنج شنبه",
        "جمعه",
        "شنبه",
      ];
      let date = new Date(x[0], x[1] - 1, x[2]);
      let day = persianDays[date.getDay()];
      return {
        date: date.toLocaleDateString("fa-ir"),
        day,
      };
    },
    weight() {
      if (this.$store.state.weight) {
        let x = this.$store.getters.weight;
        x.date = new Date(x.date).toLocaleDateString("fa-ir");
        return x;
      } else {
        return null;
      }
    },
  },
  methods: {
    setBurn() {
      this.calorie.burned = 0;
      this.burns.forEach((burn) => {
        this.calorie.burned =
          burn.minutes * burn.activity.caloriePerMinute + this.calorie.burned;
      });
      this.calorie.burned += this.recommended.calorie;
      if (this.recommended.macroRatio) {
        this.protein.recommended = parseInt(
          (this.recommended.macroRatio.protein * this.calorie.burned) / 4
        );
        this.carb.recommended = parseInt(
          (this.recommended.macroRatio.carb * this.calorie.burned) / 4
        );
        this.fat.recommended = parseInt(
          (this.recommended.macroRatio.fat * this.calorie.burned) / 9
        );
      }
    },
    setConsume() {
      this.protein.taken = 0;
      this.carb.taken = 0;
      this.fat.taken = 0;
      this.calorie.consumed = 0;
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
            ? consume.food.calorie * consume.amount * consume.food.serving.units
            : consume.food.calorie * consume.amount) + this.calorie.consumed;
      });
    },
    setDayToTomorrow() {
      let day = this.$store.state.day.replaceAll("-", "/");
      let today = new Date(day);

      let tomorrow = new Date(today);

      tomorrow.setDate(tomorrow.getDate() + 1);
      this.$store.dispatch(
        "setDay",
        `${tomorrow.getFullYear()}-${
          tomorrow.getMonth() + 1
        }-${tomorrow.getDate()}`
      );
    },
    setDayToYesterday() {
      let day = this.$store.state.day.replaceAll("-", "/");
      let today = new Date(day);
      let yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      this.$store.dispatch(
        "setDay",
        `${yesterday.getFullYear()}-${
          yesterday.getMonth() + 1
        }-${yesterday.getDate()}`
      );
    },
    setDayToToday() {
      let today = new Date();
      this.$store.dispatch(
        "setDay",
        `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
      );
    },
  },
  watch: {
    consumes() {
      this.setConsume();
    },
    burns() {
      this.setBurn();
    },
  },
  mounted() {
    let today = new Date();
    this.$store.dispatch(
      "setDay",
      `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    );
  },
};
</script>

<style>
</style>