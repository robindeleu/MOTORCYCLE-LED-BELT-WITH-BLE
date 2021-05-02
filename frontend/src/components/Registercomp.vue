<template>
  <v-card class="rounded-t-xl">
    <v-parallax
      src="https://images.unsplash.com/photo-1588095362214-a9af5ce6a165?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
      height="450"
    >
      <v-overlay value="true" opacity="0.4" absolute>
        <v-toolbar-title class="text-center ma-3">
          <h2>Please register</h2>
        </v-toolbar-title>
        <div class="text-center ma-3">
          <v-text-field
            prepend-icon="mdi-account"
            v-model="userobject.firstname"
            label="First name"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-account"
            v-model="userobject.lastname"
            label="Last name"
            :rules="nameRules"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-email"
            v-model="userobject.email"
            label="Email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-wrench"
            v-model="userobject.password"
            label="Password"
            :rules="passwordRules"
            required
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
          ></v-text-field>
        </div>
        <div class="text-center ma-3">
          <v-col>
            <v-btn
              elevation="2"
              raised
              rounded
              color="primary"
              @click="register"
            >
              Register</v-btn
            >
          </v-col>
        </div>
      </v-overlay>
    </v-parallax>
  </v-card>
</template>

<script>
export default {
  name: "Registercomp",
  components: {},
  data: function () {
    return {
      valid: false,
      show: false,
      userobject: { firstname: "", lastname: "", email: "", password: "" },
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 12 || "Password must be more than 12 characters",
      ],
    };
  },
  methods: {
    async register() {
      console.log("Trying to register user ...");
      console.log(this.userobject);
      this.$store.dispatch("storeregisteredusers", this.userobject);
      this.$store.dispatch("login", this.userobject);
      try {
        this.$router.push("/");
      } catch (error) {
        console.log("Register failed");
        console.log(error);
      }
    },
  },
};
</script>