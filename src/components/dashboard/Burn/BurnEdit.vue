<template>
  <v-dialog v-model="dialog" max-width="900px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" icon>
        <v-icon color="blue ">mdi-pencil</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>{{ item.activity.name }}</v-card-title>

      <v-card-text>
        <v-container>
          <v-row align="center">
            <v-col class="d-flex" cols="2" sm="2">
              <v-text-field
                label="دقیقه"
                v-model="minutes"
                type="number"
                min="0"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex" cols="2" sm="2">
              <v-text-field
                :value="allCalories"
                label="کالری"
                outlined
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red lighten-1" text @click="dialog = false"> لغو </v-btn>
        <v-btn color="blue" text @click="updateItem">
          ثبت
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  props: {
    item: Object,
  },
  data() {
    return {
      dialog: false,
      minutes: 0,
    };
  },
  computed: {
    allCalories() {
      //this is too long?
      let w = this.item.activity;
      let x = w.caloriePerMinute * this.minutes;
      return x;
    },
  },
  mounted() {
    this.minutes = this.item.minutes;
  },
  methods: {
    updateItem() {
      console.log(this.item);
      let activity = {
        minutes: this.minutes,
      };

      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .put(`/profile/burn/${this.item._id}`, activity, config)
        .then((res) => {
          console.log(res);
          this.$store.dispatch("setBurn");
          this.dialog = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>