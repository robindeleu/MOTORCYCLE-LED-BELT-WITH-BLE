<template>
  <v-container>
    <v-card class="mx-auto">
      <!-- <v-parallax
        src="https://media.istockphoto.com/photos/watercolor-textured-background-picture-id887755698?k=6&m=887755698&s=612x612&w=0&h=_yEUF8gLpWjZv5IgwuWkecNVt4X4P7vpuFBKCWIuR44="
        height="200"
      > -->
      <v-parallax
        src="https://images.unsplash.com/photo-1588095362214-a9af5ce6a165?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
        height="350"
      >
      <v-overlay value="true" opacity="0.1" absolute>
            <h3 class="text-center">No device connected, please pair to a new device</h3>
      </v-overlay>
      </v-parallax>

      <!-- <v-card-title>No device connected</v-card-title>
      <v-card-subtitle> Please pair to a new device </v-card-subtitle> -->

      <!-- <v-card-actions>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="ma-2"
              outlined
              rounded
              color="orange lighten-2"
              v-bind="attrs"
              v-on="on"
              @click="showAllDevices()"
            >
              Connect
            </v-btn>
          </template>
          <span>Connect to new belt</span>
        </v-tooltip>
      </v-card-actions> -->
    </v-card>
  </v-container>
</template>

<script>
import bluetoothAPI from "../services/bluetoothAPI.js";

export default {
  name: "DefaultCard",
  components: {},

  data: () => ({
  }),
  computed: {
  },
  methods: {
    showAllDevices() {
      // bluetoothAPI.showAllDevices();
      bluetoothAPI.showFilteredPrefixDevices("LEDBELT", this.$store)
      // bluetoothAPI.showFilteredNameDevices("LE-Bose Robin")
    },
  },
};
</script>

<style scoped>
</style>