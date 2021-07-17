<template>
<v-dialog v-model="dialog" persistent max-width="900px" scrollable>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Open Dialog
              </v-btn>
            </template>

  <v-card>
    
    <v-toolbar flat dark color="primary">
      <v-btn icon dark @click="dialog = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-title>
      <v-text-field
        ref="seatchBar"
        v-model="searchPhrase"
        :append-icon="showTab ? '' : 'mdi-chevron-left'"
        @focus="showTab = false"
        @click:append="clearText"
        label="جستجوی غذا..."
        solo
        filled
        prepend-inner-icon="mdi-magnify"
      >
      </v-text-field>
      
    </v-card-title>
    <v-card-text>
      <v-expand-transition>
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
      </v-expand-transition>
      <v-row>
        <v-col cols="12" sm="6" v-for="i in 33" :key="i">
          <v-card>
            <v-card-title>
              نام غذا
              <v-spacer></v-spacer>
              <v-btn depressed icon color="primary">
                <v-icon> mdi-plus </v-icon>
              </v-btn>
              <v-btn depressed icon color="red">
                <v-icon outlined> mdi-heart-outline </v-icon>
              </v-btn>
            </v-card-title>
            <v-card-subtitle> شرکت غذا </v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</v-dialog>
</template>

<script>
export default {
  data() {
    return {
      searchPhrase: "",
      searchResaults: {},
      showTab: true,
      dialog:false
    };
  },
  methods: {
    searchFood() {},
    clearText() {
      this.$refs.seatchBar.blur();
      this.showTab = true;
      this.searchPhrase = "";
    },
  },
  computed: {},
};
</script>

<style scoped>
</style>