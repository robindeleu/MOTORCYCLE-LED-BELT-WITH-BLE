<template>
  <v-container>
    <v-card class="mx-auto">
      <v-parallax
        src="https://images.unsplash.com/photo-1588095362214-a9af5ce6a165?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
        height="350"
      >
      <v-overlay value="true" opacity="0.1" absolute>
            <h3 class="text-center">No device connected, please pair to a new device</h3>
      </v-overlay>
      </v-parallax>
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
      bluetoothAPI.showFilteredPrefixDevices("LEDBELT", this.$store)
    },
  },
};
</script>

<style scoped>
</style>