<template>
  <div class="home">
    <v-container>
      <v-row justify="center">
        <v-col cols="9" md="4" v-for="test in storeDevice" :key="test.id">
          <belt-card :id="test.id" :name="test.name" />
        </v-col>
      </v-row>
      <div v-if="storeDevice.length === 0">
        <v-row justify="center">
          <v-col cols="9" md="4">
            <DefaultCard />
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>

import BeltCard from "../components/BeltCard.vue";
import DefaultCard from "../components/DefaultCard.vue";

export default {
  name: "Home",

  components: {
    BeltCard,
    DefaultCard,
  },

  computed: {
    storeDevice() {
      return this.$store.getters.getBluetoothBelt;
    },
  },
};
</script>
