
<template>
  <v-container fill-height="fill-height">
    <v-layout align-center justify-center>
      <v-flex class="biometric-form text-center">
        <v-card elevation="0">
          <v-card-text>
            <div class="subheading">ٍثبت ماده غذایی جدید</div>
            <v-form v-model="valid" ref="form">
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="name"
                    light="light"
                    label="نام"
                    type="text"
                    required
                    :rules="rules.name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="8">
                  <v-text-field
                    v-model="desc"
                    light="light"
                    label="توضیحات"
                    :rules="rules.desc"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="6" md="3">
                  <v-text-field
                    outlined
                    v-model="protein"
                    light="light"
                    label="پروتئین(گرم)"
                    type="number"
                    min="0"
                    :rules="rules.macro"
                  ></v-text-field>
                </v-col>

                <v-col cols="6" md="3">
                  <v-text-field
                    outlined
                    v-model="fat"
                    light="light"
                    label="چربی(گرم)"
                    type="number"
                    min="0"
                    :rules="rules.macro"
                  ></v-text-field>
                </v-col>

                <v-col cols="6" md="3">
                  <v-text-field
                    outlined
                    v-model="carb"
                    light="light"
                    label="کربوهیدرات(گرم)"
                    type="number"
                    min="0"
                    :rules="rules.macro"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field
                    outlined
                    v-model="calorie"
                    light="light"
                    label="کالری"
                    type="number"
                    :min="this.fat * 9 + this.carb * 4 + this.protein * 4"
                    :rules="rules.calorie"
                  ></v-text-field>
                </v-col>
                <v-row>
                <v-col cols="3" md="3" class="mt-4 text-h6"> در هر </v-col>
                <v-col cols="4" md="3">
                  <v-text-field
                    v-model="perAmount"
                    light="light"
                    type="number"
                    :min="(this.fat * 1 + this.carb * 1 + this.protein * 1) || 1"
                    :rules="rules.perAmount"
                    outlined
                  ></v-text-field>
                </v-col>

                <v-col cols="5" md="4">
                  <v-select
                    v-model="unit"
                    :items="units"
                    label="یکا"
                    outlined
                  ></v-select>
                </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12">
                    <div>
                      برای این ماده غذایی پیمانه ای برای اندازه گیری راحت تر
                      تعریف کنید:
                    </div>
                  </v-col>
                </v-row>
                <v-row >
                  <v-col cols="5" md="5">
                    <v-text-field
                      v-model="servingName"
                      light="light"
                      label="نام پیمانه"
                      type="text"
                      persistent-hint
                      hint="تعریف یک پیمانه"
                      :rules="rules.servingName"
                      solo
                    ></v-text-field>
                  </v-col>
                  <v-col cols="2" md="2">
                    <div class="text-subtitle-1 mt-2"> شامل:</div>
                  </v-col>
                 <v-col cols="5" md="5">
                    <v-text-field
                      v-model="servingUnits"
                      light="light"
                      label="اندازه پیمانه"
                      type="number"
                      min="1"
                      persistent-hint
                      hint="مقدار در هر پیمانه"
                      :rules="rules.servingUnits"
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-col cols="12">
                  <v-btn
                    @click.prevent=""
                    :disabled="!valid"
                    @click="onSubmit()"
                    text
                    type="submit"
                    >ثبت</v-btn
                  >
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog.active" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> خطا </v-card-title>
        <v-card-subtitle>
          {{ dialog.msg }}
        </v-card-subtitle>
        <v-card-text>
          <div v-for="(error, i) in dialog.errors" :key="i">
            {{ error.msg }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="errorSeen()">
            فهمیدم
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackBar" timeout="2000">
      ایجاد ماده غذایی با موفقیت انجام شد
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: false,
      name: "",
      desc: "",
      unit: { text: "گرم", value: "gr" },
      servingName: "",
      servingUnits: 1,
      isPublic: false,
      calorie: 0,
      fat: 0,
      protein: 0,
      carb: 0,
      perAmount: 1,
      dialog: {
        active: false,
        msg: "",
        errors: [],
      },
      selectedDiet: { text: "متعادل", value: [40, 30, 30] },
      units: [
        { text: "گرم", value: "gr" },
        { text: "میلی‌لیتر", value: "ml" },
      ],
      snackBar: false,
      rules: {
        macro: [
          (v) => !(v < 0) || "مقدار باید از 0 بیشتر باشد",
          (v) => !!v || "هیچ یک از ماکروها نباید خالی باشد",
        ],
        calorie: [
          (v) => !(v < 0) || "مقدار باید از 0 بیشتر باشد",
          (v) =>
            !(v < this.fat * 9 + this.carb * 4 + this.protein * 4) ||
            "مقدار کالری با مقدار مواد سازگار نیست",
        ],
        perAmount: [
          (v) => !(v < 0) || "مقدار باید از 0 بیشتر باشد",
          (v) =>
            !(v < this.fat * 1 + this.carb * 1 + this.protein * 1) ||
            "اندازه محتوا بیشتر از کل غذا می‌باشد",
        ],
        name: [(v) => !!v || "نام الزامی است"],
        desc: [(v) => !!v || "توضیحات الزامی است"],
        servingName: [(v) => !!v || "نام پیمانه الزامی است"],
        servingUnits: [(v) => !!v || "مقدار پیمانه الزامی است"],
      },
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      const formData = {
        name: this.name,
        desc: this.desc,
        calorie: this.calorie / this.perAmount,
        protein: this.protein / this.perAmount,
        carb: this.carb / this.perAmount,
        fat: this.fat / this.perAmount,
        unit: this.unit,
        serving: { name: this.servingName, units: this.servingUnits },
        public: this.isPublic,
      };
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .post("/food/add", formData, config)
        .then((res) => {
          if (res) {
            this.snackBar = true;
            setTimeout(() => {
              this.$router.push("/foods/myfoods");
            }, 2000);
          }
        })
        .catch((error) => {
          this.dialog.active = true;
          this.dialog.msg = error.response.data.message;
          this.dialog.errors = error.response.data.data;
          console.log(error.response.data);
        });
    },
    errorSeen() {
      this.dialog.active = false;
      this.dialog.msg = "";
    },
  },
};
</script>

<style scoped>
.biometric-form {
  max-width: 500px;
}
</style>