
<template>
  <v-container fill-height="fill-height">
    <v-layout align-center justify-center>
      <v-flex class="biometric-form text-center">
        <v-card light="light">
          <v-card-text>
            <div class="subheading">اطلاعات جسمی</div>
            <v-form v-model="valid" ref="form">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="age"
                    light="light"
                    label="سن"
                    type="number"
                    required
                    min="13"
                    max="130"
                    :rules="rules.age"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-radio-group
                    v-model="gender"
                    row
                    mandatory
                    label="جنسیت:"
                    :rules="rules.gender"
                  >
                    <v-radio label="زن" value="0"></v-radio>
                    <v-radio label="مرد" value="1"></v-radio>
                  </v-radio-group>
                </v-col>

                <v-col cols="4">
                  <v-text-field
                    v-model="height"
                    light="light"
                    label="قد(سانتی‌متر)"
                    :rules="rules.height"
                    type="number"
                    min="120"
                    max=300
                    required
                    placeholder="0"
                  ></v-text-field>
                </v-col>

                <v-col cols="4">
                  <v-text-field
                    v-model="weight"
                    light="light"
                    label="وزن(کیلوگرم)"
                    type="number"
                    min="30"
                    max=300
                    :rules="rules.weight"
                  ></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="weightChange"
                    light="light"
                    label="تغییر وزن مطلوب در هفته"
                    type="number"
                    min="-1"
                    max="1"
                    step="0.1"
                    hint="تغییر وزن بیشتر از 1 کیلو در هفته سالم نیست"
                    :rules="rules.weightChange"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="selectedDiet"
                    :hint="`کربوهیدرات: %${selectedDiet.value[0]}, پروتئین: %${selectedDiet.value[1]}, چربی: %${selectedDiet.value[2]}`"
                    :items="diets"
                    label="نوع رژیم"
                    persistent-hint
                    return-object
                    outlined
                    :disabled="customize"
                  ></v-select>
                  </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="selectedActivityLevel"
                    :items="activityLevel"
                    label="میزان تحرک روزانه"
                    return-object
                    outlined
                    :disabled="customize"
                  ></v-select>
                  </v-col>
                <v-col cols="12">
                  <v-checkbox
                    v-model="customize"
                    label="شخصی سازی"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field
                    outlined
                    v-model="protein"
                    light="light"
                    label="پروتئین(گرم)"
                    type="number"
                    :rules="rules.macro"
                    :disabled="!customize"
                  ></v-text-field>
                </v-col>

                <v-col cols="6" md="3">
                  <v-text-field
                    outlined
                    v-model="fat"
                    light="light"
                    label="چربی(گرم)"
                    type="number"
                    :rules="rules.macro"
                    :disabled="!customize"
                  ></v-text-field>
                </v-col>

                <v-col cols="6" md="3">
                  <v-text-field
                    outlined
                    v-model="carb"
                    light="light"
                    label="کربوهیدرات(گرم)"
                    type="number"
                    :rules="rules.macro"
                    :disabled="!customize"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field
                    outlined
                    v-model="calcCalorie"
                    light="light"
                    label="کالری"
                    type="number"
                    :rules="rules.calorie"
                    disabled
                    :value="calcCalorie"
                  ></v-text-field>
                </v-col>
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
      ثبت با موفقیت انجام شد
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: false,
      age: "",
      weightChange: 0,
      height: "",
      weight: "",
      gender: 0,
      calorie: 0,
      fat: 0,
      protein: 0,
      carb: 0,
      customize: false,
      dialog: {
        active: false,
        msg: "",
        errors: [],
      },
      selectedDiet: { text: "متعادل", value: [40, 30, 30] },
      diets: [
        { text: "متعادل", value: [40, 30, 30] },
        { text: "کم کربوهیدارت", value: [20, 40, 40] },
        { text: "کم چرب", value: [40, 40, 20] },
        { text: "کم پروتئین", value: [40, 20, 40] },
      ],
      selectedActivityLevel: { text: "بی تحرک", value: 1.2 },
      activityLevel: [
        { text: "بی تحرک", value: 1.2},
        { text: "کم تحرک (شغل‌هایی مانند صندوقداری)", value: 1.5 },
        { text: "تحرک متوسط (شغل های نسبتا پر تحرک)", value:1.7 },
        { text: "پر تحرک (شغل‌های مانند کشاورزی)", value: 1.9 },
      ],
      snackBar: false,
      rules: {
        macro: [(v) => !!v || "هیچ یک از ماکروها نباید خالی باشد"],
        weightChange: [(v) => !(v < -1) || "مقدار باید از -1 کمتر نباشد" , (v) => !(v > 1) || "مقدار باید از 1 بیشتر نباشد" ,
                  ],
        height: [(v) => !!v || "قد الزامی است"],
        weight: [(v) => !!v || "وزن الزامی است"],
        age: [(v) => !!v || "سن الزامی است"],
        gender: [(v) => !!v || "جنسیت الزامی است"],
      },
    };
  },
  computed: {
    calcCalorie() {
      var x = 0;
      if (this.customize) {
        x = this.carb * 4 + this.fat * 9 + this.protein * 4;
      } 

      
      else {
        if (!this.height || !this.weight || !this.age) {
          return 0
        }
        x =
          this.gender == 1
            ? 10 * this.weight + 6.25 * this.height - 5 * this.age + 5
            : 10 * this.weight + 6.25 * this.height - 5 * this.age - 161;

        x = x * this.selectedActivityLevel.value

        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.fat = parseInt((parseFloat(x) * parseFloat(this.selectedDiet.value[2]) / 100 ) / 9);
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.carb = parseInt((parseFloat(x) * parseFloat(this.selectedDiet.value[0]) / 100) / 4);
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.protein = parseInt((parseFloat(x) * parseFloat(this.selectedDiet.value[1]) / 100) / 4);

      }
      return parseInt(x + (this.weightChange * 9000 / 7)) ;
    },
  },
  methods: {
    onSubmit() {
      const formData = {
        height: this.height,
        age: this.age,
        male: this.gender == 0 ? false : true,
        calorie: this.calcCalorie,
        protein: this.protein,
        carb: this.carb,
        fat: this.fat,
        weight: this.weight,
      };
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .post("/profile/biometric/add", formData , config)
        .then((res) => {
          if (res) {
            (this.snackBar = true),
              setTimeout(() => {
                this.$router.push({ path: "/dashboard" });
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