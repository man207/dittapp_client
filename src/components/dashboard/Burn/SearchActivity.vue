<template>
  <v-dialog v-model="dialog" persistent max-width="900px" scrollable>
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="primary"  v-bind="attrs" v-on="on"> اضافه کردن فعالیت جدید </v-btn>
    </template>

    <v-card>
      <v-toolbar flat dark color="primary">
        <v-btn icon dark @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title>
        <v-text-field
          ref="searchBar"
          v-model="searchPhrase"
          :append-icon="showTab ? '' : 'mdi-chevron-left'"
          @focus="showTab = false"
          @click:append="clearText"
          @input="search"
          label="جستجوی فعالیت..."
          solo
          filled
          prepend-inner-icon="mdi-magnify"
        >
        </v-text-field>
      </v-card-title>
      <v-card-text class="searchPart">
        <!-- <v-expand-transition>
          <v-card v-if="showTab">
            <v-tabs fixed-tabs>
              <v-tab>
                اخیر
                <v-icon small> mdi-history </v-icon>
              </v-tab>
              <v-tab>
                تکراری
                <v-icon small> mdi-sync </v-icon>
              </v-tab>
              <v-tab>
                علاقه
                <v-icon small> mdi-heart </v-icon>
              </v-tab>
            </v-tabs>
          </v-card>
        </v-expand-transition> -->
        <div v-if="searchResults.length == 0" class="flex justify-center align-center">
          {{this.message}}
        </div>
        <v-list two-line>
          <v-list-item-group v-model="selected" active-class="pink--text">
            <template v-for="(activity, index) in searchResults">
              <v-list-item :key="activity._id">
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-text="activity.name"></v-list-item-title>

                    <v-list-item-subtitle
                      class="text--primary"
                      v-text="activity.desc"
                    ></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>

                    <v-icon color="yellow darken-3"> mdi-plus </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index < searchResults.length - 1"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
      <template v-if="this.searchResults[this.selected]">
        <v-card-title>{{selectedResult.name}}</v-card-title>

      <v-card-text>
        <v-container>
          <v-row align="center">
            <v-col class="d-flex" cols="2" sm="2">
              <v-text-field label="دقیقه" v-model="minutes" type="number" min="0"></v-text-field>
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
        <v-btn color="deep-purple lighten-2" text @click="addToburn">
          ثبت
        </v-btn>
      </v-card-actions>
      </template>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selected: -1,
      searchPhrase: "",
      searchResults: [],
      message: "برای جستجو واژه ای وارد کنید",
      showTab: true,
      dialog: false,
      minutes: 0
    };
  },
  computed: {
    allCalories() {
      //this is too long?
      let w = this.selectedResult;
      let x = w.caloriePerMinute * this.minutes
      return x;
    },
      selectedResult() {
        let x = {...this.searchResults[this.selected]}
        return x
      }
  },
  methods: {
    addToburn() {
      let activity = {
      "activity": this.selectedResult._id,
      "minutes" : this.minutes,
      "date" : this.$store.getters.day,
      }
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .post(`/profile/burn/add`, activity,  config)
        .then((res) => {
          Object.assign(this.$data, this.$options.data.call(this));
          console.log(res);
        })
        .catch((err) => {
          this.message = err.message;
        });
      this.$store.dispatch("setBurn");
    
    },
    clearText() {
      this.$refs.searchBar.blur();
      this.showTab = true;
      this.searchPhrase = "";
    },
    search() {
      if (this.searchPhrase.length < 1) {
        return;
      }
      const config = {
        headers: { Authorization: `Bearer ${this.$store.state.token}` },
      };
      axios
        .get(`/activity/search/${this.searchPhrase}`, config)
        .then((res) => {
          this.searchResults = res.data.result;
          if (res.data.result.length === 0 ) {
            this.message = "موردی یافت نشد"
          }
          console.log(this.searchResults);
        })
        .catch((err) => {
          this.message = err.data.message;
        });
    },
  }

};
</script>

<style scoped>
.searchPart {
  min-height: 200px;
   max-height: 200px;
}

</style>