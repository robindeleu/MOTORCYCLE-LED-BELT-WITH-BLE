<template>
  <v-app>
    <v-app-bar app color="primary" dark
      ><v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <h3>Motorcycle LED belt</h3>
      </div>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            fab
            small
            rounded
            color="white"
            v-bind="attrs"
            v-on="on"
            class="button"
            @click="showAllDevices()"
          >
            <v-icon
              class="mx-2"
              dark
              outlined
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <span>Add belt</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            fab
            small
            rounded
            color="white"
            v-bind="attrs"
            v-on="on"
            class="button"
          >
            <v-icon
              class="mx-2"
              dark
              outlined
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              mdi-history
            </v-icon>
          </v-btn>
        </template>
        <span>Show all previously connected devices</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            fab
            small
            rounded
            color="white"
            v-bind="attrs"
            v-on="on"
            class="button"
          >
            <v-icon
              class="mx-2"
              dark
              outlined
              color="white"
              v-bind="attrs"
              v-on="on"
            >
              mdi-bluetooth-connect
            </v-icon>
          </v-btn>
        </template>
        <span>Show current connected belt's</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="secondary">
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary">mdi-account-check-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Register</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary"
                  >mdi-account-arrow-right-outline</v-icon
                >
              </v-list-item-icon>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary">mdi-bluetooth-audio</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Add Belt</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary">mdi-devices</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Owned belt's</v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary">mdi-bluetooth-connect</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Connected belt's</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary"
                  >mdi-account-arrow-left-outline</v-icon
                >
              </v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-container>
        <v-row justify="center">
          <v-col cols="9" md="4"
          v-for="test in storeDevice" :key="test.id">
          <!-- <v-col cols="9" md="4"> -->
            <belt-card 
              :id="test.id"
              :name="test.name"
            />
          </v-col>
        </v-row>
        <div v-if="storeDevice.length===0">
        <v-row justify="center" >
          <v-col cols="9" md="4">
            <DefaultCard 
        />
          </v-col>
        </v-row>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import BeltCard from "./components/BeltCard.vue";
import DefaultCard from "./components/DefaultCard.vue";
import bluetoothAPI from "./services/bluetoothAPI.js";

export default {
  name: "App",

  components: {
    BeltCard,
    DefaultCard
  },

  data: () => ({
    drawer: false,
    group: null,
    show: false,
  }),
  computed: {
    storeDevice() {
      return this.$store.getters.getBluetoothBelt;
    },
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    showAllDevices() {
      // bluetoothAPI.showAllDevices(this.$store);
      bluetoothAPI.showFilteredPrefixDevices("LEDBELT", this.$store)
      // bluetoothAPI.showFilteredNameDevices("LE-Bose Robin", this.$store)
    },
  },
};
</script>
<style scoped>
.button {
  margin-right: 5px;
  margin-left: 5px;
}
</style>