<template>
  <v-container fill-height="fill-height">
    <v-layout align-center justify-center>
      <v-flex class="login-form text-center">
        <v-card light="light" elevation="12">
          <v-card-text>
            <div class="subheading">ورود به حساب کاربری</div>
            <v-form v-model="valid" ref="form">
              <v-text-field
                v-model="email"
                light="light"
                label="ایمیل"
                :rules="rules.email"
                type="email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                light="light"
                label="گذرواژه"
                type="password"
                :rules="rules.password"
              ></v-text-field>
              <v-checkbox
                v-model="rememberMe"
                light="light"
                label="مرا به خاطر بسپار"
              ></v-checkbox>
              <v-btn
                @click.prevent=""
                :disabled="!valid"
                @click="onSubmit()"
                text
                type="submit"
                >ورود</v-btn
              >
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog.active" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> خطا </v-card-title>
        <v-card-text>{{ dialog.msg }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="errorSeen()">
            فهمیدم
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackBar" timeout="2000">
      ورود با موفقیت انجام شد
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "./axios-auth";

export default {
  data() {
    return {
      valid: false,
      email: "",
      password: "",
      rememberMe: false,
      dialog: {
        active: false,
        msg: "",
      },
      snackBar: false,
      rules: {
        password: [
          (v) => !!v || "گذر واژه الزامی است",
          (v) => v.length >= 5 || "طول گذرواژه بیشتر از 5 می‌باشد",
        ],
        email: [
          (v) => !!v || "ایمیل الزامی است",
          (v) => /.+@.+/.test(v) || "ایمیل صحیح نیست",
        ],
      },
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe,
      };
      this.logIn(formData);
    },
    logIn(authData) {
      axios
        .post("/login", {
          email: authData.email,
          password: authData.password,
        })
        .then((res) => {
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + res.data.expiresIn * 1000
          );

          if (authData.rememberMe) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.userId);
            localStorage.setItem("expirationDate", expirationDate);
          }
          this.$store.dispatch("login", res.data);
          this.snackBar = true;
          setTimeout(() => {
            this.$router.push({ path: "/dashboard" });
          }, 2000);
        })
        .catch((error) => {
          this.dialog.active = true;
          this.dialog.msg = error.response.data.message;
          this.dialog.errors = error.response.data.data;
          console.log(error.response.data);
        });
    },
    errorSeen() {
      this.$refs.form.reset();
      this.dialog.active = false;
      this.dialog.msg = "";
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 500px;
}
</style>