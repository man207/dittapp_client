<template>
  <v-container fill-height="fill-height">
    <v-layout align-center justify-center>
      <v-flex class="signup-form text-center">
        <v-card light="light">
          <v-card-text>
            <div class="subheading">ساخت حساب کاربری</div>
            <v-form v-model="valid" ref="form">
              <v-text-field
                v-model="firstName"
                light="light"
                label="نام"
                type="firstName"
                required
              ></v-text-field>
              <v-text-field
                v-model="lastName"
                light="light"
                label="نام خانوادگی"
                type="lastName"
                required
              ></v-text-field>
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
              <v-text-field
                v-model="confirmPassword"
                light="light"
                label="تکرار گذرواژه"
                type="password"
                :rules="rules.confirmPassword"
              ></v-text-field>
              <v-checkbox
                light="light"
                label="با قوانین موافقم"
                :rules="rules.policy"
              ></v-checkbox>
              <v-btn
                @click.prevent=""
                :disabled="!valid"
                @click="onSubmit()"
                text
                type="submit"
                >ثبت نام</v-btn
              >
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
        <v-card-subtitle>
          {{dialog.msg}}
        </v-card-subtitle>
        <v-card-text>
            <div v-for="error , i in dialog.errors" :key="i">
                {{error.msg}}
            </div>
        </v-card-text>
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
import axios from './axios-auth'

export default {
  data() {
    return {
      valid: false,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dialog: {
        active: false,
        msg: "",
        errors: []
      },
      snackBar: false,
      rules: {
        password: [
          (v) => !!v || "گذر واژه الزامی است",
          (v) => v.length >= 5 || "طول گذرواژه بیشتر از 5 می‌باشد",
        ],
        confirmPassword: [
          (v) => !!v || "تکرار گذر واژه الزامی است",
          (v) => this.password == v || "تکرار با گذرواژه برابر نیست",
        ],
        policy: [
          (v) => v === true || "پذیرش قوانین الزامی است",
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
        firstName: this.firstName,
        lastName: this.lastName,

      };
      console.log(formData);
      this.signup(formData);
    },
    signup (authData) {
      axios.post('/signup', {
        email: authData.email,
        password: authData.password,
        firstName: authData.firstName,
        lastName: authData.lastName,
      }).then(res => {
          if (res) {
            this.snackBar = true,
            setTimeout( ()=> {
              this.$router.push({ path: '/signin' });
            }, 2000)
            
          }
        }).catch(error => {
          this.dialog.active = true;
          this.dialog.msg = error.response.data.message;
          this.dialog.errors = error.response.data.data;
          console.log(error.response.data);
        })
    },
    errorSeen () {
      this.$refs.form.reset()
      this.dialog.active = false;
      this.dialog.msg = "";
    }
  },
};
</script>

<style scoped>
.signup-form {
  max-width: 500px;
}
</style>