
<template>
  <v-container fill-height="fill-height">
    <v-layout align-center justify-center>
      <v-flex class="biometric-form text-center">
        <v-card elevation="0" height="500px">
          <v-card-text>
            <div class="subheading">ثبت فعالیت جدید</div>
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

                <v-col cols="12" md="12">
                  <v-text-field
                    v-model="desc"
                    light="light"
                    label="توضیحات"
                    :rules="rules.desc"
                    type="text"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="caloriePerMinute"
                    label="کالری در دقیقه"
                    type="number"
                    min="0"
                    required
                    :rules="rules.caloriePerMinute"
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
      ایجاد فعالیت   با موفقیت انجام شد
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
      caloriePerMinute: 0,
      dialog: {
        active: false,
        msg: "",
        errors: [],
      },
      snackBar: false,
      rules: {
        caloriePerMinute: [
          (v) => !(v < 0) || "مقدار باید از 0 بیشتر باشد",
        ],
        name: [(v) => !!v || "نام الزامی است"],
        desc: [(v) => !!v || "توضیحات الزامی است"],
      },
    };
  },
  computed: {},
  methods: {
    onSubmit() {
      const formData = {
        name: this.name,
        desc: this.desc,
        caloriePerMinute: this.caloriePerMinute,
      };
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .post("/activity/add", formData, config)
        .then((res) => {
          if (res) {
            this.snackBar = true;
            setTimeout(() => {
              this.$router.push("/activity/myactivities");
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