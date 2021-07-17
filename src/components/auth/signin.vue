<template>


  <v-container fill-height="fill-height">
    <v-layout align-center justify-center>
      <v-flex class="login-form text-center">
        <v-card light="light">
          <v-card-text>
            <div class="subheading">ورود به حساب کاربری</div>
            <v-form
              v-model="valid"
            >
              <v-text-field
                v-model="email"
                light="light"
                label="ایمیل"
                :rules="rules.email"
                type = "email"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                light="light"
                label="گذرواژه"
                type = "password"
                :rules="rules.password"
              ></v-text-field>
              <v-checkbox
                v-model="rememberMe"
                light="light"
                label="مرا به خاطر بسپار"
              ></v-checkbox>
              <v-btn @click.prevent="" :disabled="!valid" @click="onSubmit()" text type="submit">ورود</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="dialog.active"
      persistent
      max-width="290"
    >

      <v-card>
        <v-card-title class="text-h5">
          خطا
        </v-card-title>
        <v-card-text>{{dialog.msg}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="errorSeen()"
          >
            فهمیدم
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackBar"
      timeout=2000
    >
      ثبت نام با موفقیت انجام شد
    </v-snackbar>
  </v-container>

</template>

<script>
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
        v => !!v || 'گذر واژه الزامی است',
        v => v.length >= 5 || 'طول گذرواژه بیشتر از 5 می‌باشد',
      ],
        email: [
        v => !!v ||   'ایمیل الزامی است',
        v => /.+@.+/.test(v) || 'ایمیل صحیح نیست',
      ],
      }
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      };
      console.log(formData);
      this.$store.dispatch("login", formData);
    },
  },
};
</script>

<style scoped>
.login-form {
  max-width: 500px;
}
</style>