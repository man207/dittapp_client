<template>
  <v-container fill-height="fill-height">
    <v-layout align-center justify-center>
      <v-flex>
        <v-card flat height="500px">
          <v-card-title class="align-center justify-center">
            فعالیت‌های من
          </v-card-title>
          <v-card-subtitle class="text-center">
            فعالیت‌های که شما تعریف کرده‌اید
          </v-card-subtitle>

          <v-card-text>
            <div v-if="!activities">شما فعالیت‌های اضافه نکرده اید</div>

            <v-list class="overflow-y-auto" height="300px">
              <v-list-item v-for="activity in activities" :key="activity._id">
                <v-list-item-content>
                  <v-list-item-title>{{ activity.name }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ activity.desc }}
                  </v-list-item-subtitle>
                  <v-list-item-subtitle>
                    {{activity.caloirePerMinute}}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <delete-activity :item="activity"></delete-activity>
                </v-list-item-action>
              </v-list-item>
            </v-list>
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
  </v-container>
</template>

<script>
import axios from "axios";
import DeleteActivity from "./DeleteActivity.vue";

export default {
  components: {
    DeleteActivity,
  },
  data() {
    return {
      dialog: {
        active: false,
        msg: "",
        errors: [],
      },
      activities: [],
    };
  },
  methods: {
    getActivities() {
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .get("/activity/myactivities", config)
        .then((res) => {
          console.log(res.data.result);
          this.activities = res.data.result;
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.activities = [];
            return;
          }
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
  mounted() {
    this.getActivities();
    console.log("my foooods");
  },
};
</script>

<style>
</style>