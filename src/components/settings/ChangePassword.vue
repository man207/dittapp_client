<template>
  <v-container fill-height="fill-height">
    <v-layout align-center justify-center>
      <v-flex class="text-center">
        <v-card elevation="0" height="500px" >
          <v-card-subtitle>برای تغییر گذرواژه خود، گذرواژه قبلی را وارد کنید</v-card-subtitle>
          <v-card-text class="justify-center d-flex align-center" style="height:460px">
            <v-row align="center" justify="center" >
              <v-col cols="12" lg="6">
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    v-model="password"
                    light="light"
                    label="گذرواژه"
                    type="password"
                    :rules="rules.password"
                    dense
                    outlined
                  ></v-text-field>
                  <v-text-field
                    v-model="confirmPassword"
                    light="light"
                    label="تکرار گذرواژه"
                    type="password"
                    :rules="rules.confirmPassword"
                    dense
                    outlined
                  ></v-text-field>

                  <v-text-field
                    v-model="oldPassword"
                    light="light"
                    label="گذرواژه فعلی"
                    :rules="rules.oldPassword"
                    type="password"
                    required
                    dense
                    outlined
                  ></v-text-field>
                  <div class="text-center">
                    <v-btn
                      @click.prevent=""
                      :disabled="!valid"
                      @click="onSubmit()"
                      text
                      type="submit"
                      >تغییر رمز</v-btn
                    >
                  </div>
                </v-form>
              </v-col>
            </v-row>
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
      تغییر رمز با موفقیت انجام شد
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "../auth/axios-auth";

export default {
  data() {
    return {
      valid: false,
      password: "",
      confirmPassword: "",
      oldPassword: "",
      snackBar: false,
      dialog: {
        active: false,
        msg: "",
        errors: [],
      },
      rules: {
        password: [
          (v) => !!v || "گذر واژه الزامی است",
          (v) => v.length >= 5 || "طول گذرواژه بیشتر از 5 می‌باشد",
        ],
        confirmPassword: [
          (v) => !!v || "تکرار گذر واژه الزامی است",
          (v) => this.password == v || "تکرار با گذرواژه برابر نیست",
        ],
        oldPassword: [(v) => !!v || " گذر واژه قبلی الزامی است"],
      },
    };
  },
  methods: {
    onSubmit() {
      const formData = {
        password: this.password,
        oldPassword: this.oldPassword,
      };
      this.changePassword(formData);
    },
    changePassword(authData) {
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .post("/changepassword", authData, config)
        .then((res) => {
          console.log(res);
          this.snackBar = true;
          this.$refs.form.reset();
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


<style>
</style>