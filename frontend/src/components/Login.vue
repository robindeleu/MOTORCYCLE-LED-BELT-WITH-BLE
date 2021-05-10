<template>
  <v-card class="rounded-xl">
    <v-parallax
      src="https://images.unsplash.com/photo-1588095362214-a9af5ce6a165?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
      height="300"
    >
      <v-overlay value="true" opacity="0.40" absolute>
        <div class="text-center ma-3" @keyup.enter="login">
          <v-text-field
            prepend-icon="mdi-email"
            single-line
            v-model="textfieldemail"
            label="Email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-wrench"
            single-line
            v-model="textfieldpassword"
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
            <v-btn elevation="2" raised rounded color="primary" @click="login">
              Login</v-btn
            >
          </v-col>
        </div>
      </v-overlay>
    </v-parallax>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      rounded="pill"
      bottom
      color="red"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import Crypto from "crypto";
export default {
  name: "Login",
  components: {},
  data: function () {
    return {
      snackbar: false,
      text: "",
      timeout: 10000,
      valid: false,
      show: false,
      registerdata: [],
      registerlength: 0,
      i: 0,
      j: 0,
      textfieldemail: "",
      textfieldpassword:"",
      userobject: { email: "", password: "" },
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
    async login() {
      this.userobject.password = this.textfieldemail
      this.userobject.email = this.textfieldpassword
      for(this.j = 0; this.j < 5; this.j++){
        this.userobject.password = Crypto.createHash("sha256").update(this.userobject.password).digest("hex")
      }
      this.j = 0
      for(this.j = 0; this.j < 3; this.j++){
        this.userobject.email = Crypto.createHash("sha256").update(this.userobject.email).digest("hex")

      }
      // this.userobject.password = Crypto.createHash("sha256").update(this.userobject.password).digest("hex")
      // this.userobject.email = Crypto.createHash("sha256").update(this.userobject.email).digest("hex")
      console.log(this.userobject);
      this.registerdata = this.$store.getters.getRegisteredusers;
      this.registerlength = this.registerdata.length;

      for (this.i = 0; this.i < this.registerlength; this.i++) {
        if (
          this.registerdata[this.i].email === this.userobject.email &&
          this.registerdata[this.i].password === this.userobject.password
        ) {
          console.log("email gelijk aan elkaar, PASSWOORD gelijk aan elkaar");
          this.$store.dispatch("login", this.userobject);
        } else if (this.registerdata[this.i].email === this.userobject.email) {
          this.text = "Please check password";
          this.snackbar = true;
        } else if (
          this.registerdata[this.i].password === this.userobject.password
        ) {
          this.text = "Please check email";
          this.snackbar = true;
        }
      }
      try {
        this.$router.push("/");
      } catch (error) {
        console.log("Login failed");
        console.log(error);
      }
    },
  },
  computed: {
    registerArray() {
      return this.$store.getters.getRegisteredusers;
    },
  },
};
</script>