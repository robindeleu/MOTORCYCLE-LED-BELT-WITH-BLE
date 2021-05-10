<template>
  <v-app>
    <v-app-bar app color="primary" dark
      ><v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <div class="d-flex align-center">
        <router-link class="text-decoration-none white--text" to="/"
          ><h3>Motorcycle LED belt</h3></router-link
        >
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
          <router-link to="/history">
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
          </router-link>
        </template>
        <span>Show all previously connected devices</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <router-link to="/">
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
          </router-link>
        </template>
        <span>Show current connected belt's</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <v-navigation-drawer v-model="drawer" absolute bottom temporary>
        <v-list nav dense>
          <v-list-item-group v-model="group" active-class="secondary">
            <router-link to="/registerpage">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="secondary">mdi-account-check-outline</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Register</v-list-item-title>
              </v-list-item>
            </router-link>
            <router-link to="/loginpage">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="secondary"
                    >mdi-account-arrow-right-outline</v-icon
                  >
                </v-list-item-icon>
                <v-list-item-title>Login</v-list-item-title>
              </v-list-item>
            </router-link>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary">mdi-bluetooth-audio</v-icon>
              </v-list-item-icon>
              <v-list-item-title @click="showAllDevices()"
                >Add Belt</v-list-item-title
              >
            </v-list-item>

            <router-link class="text-decoration-none" to="/history">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="secondary">mdi-devices</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Owned belt's</v-list-item-title>
              </v-list-item>
            </router-link>

            <router-link class="text-decoration-none" to="/">
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="secondary">mdi-bluetooth-connect</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Connected belt's</v-list-item-title>
              </v-list-item>
            </router-link>

            <v-list-item>
              <v-list-item-icon>
                <v-icon color="secondary"
                  >mdi-account-arrow-left-outline</v-icon
                >
              </v-list-item-icon>
              <v-list-item-title @click="logout()">Logout</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import bluetoothAPI from "./services/bluetoothAPI.js";

export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
    show: false,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },

  created(){
    this.$store.dispatch("deleteDevices");
  },

  methods: {
    showAllDevices() {
      bluetoothAPI.showFilteredPrefixDevices("LEDBELT", this.$store);
    },
    logout(){
      this.$store.dispatch("logout");
      this.$router.push('/loginpage')
    }
  },
};
</script>
<style scoped>
.button {
  margin-right: 5px;
  margin-left: 5px;
}
</style>