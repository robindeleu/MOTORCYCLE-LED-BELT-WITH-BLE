<template>
  <v-card class="rounded-t-xl">
    <v-parallax
      src="https://images.unsplash.com/photo-1588095362214-a9af5ce6a165?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80"
      height="300"
    >
      <v-overlay value="true" opacity="0.40" absolute>
        <div class="text-center ma-3">
          <v-text-field
            prepend-icon="mdi-email"
            single-line
            v-model="userobject.email"
            label="Email"
            :rules="emailRules"
            required
          ></v-text-field>
          <v-text-field
            prepend-icon="mdi-wrench"
            single-line
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
            <v-btn elevation="2" raised rounded color="primary" @click="login">
              Login</v-btn
            >
          </v-col>
        </div>
      </v-overlay>
    </v-parallax>
  </v-card>
</template>

<script>
export default {
  name: "Login",
  components: {},
  data: function () {
    return {
      valid: false,
      show: false,
      registerdata: [],
      registerlength: 0,
      i: 0,
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
      console.log("...Trying to login ....");
      console.log(this.userobject);
      this.registerdata = this.$store.getters.getRegisteredusers;
      this.registerlength = this.registerdata.length;
      // console.log("registerdata: ", this.registerdata);
      console.log("length: ", this.registerlength);
      // console.log(this.$store.getters.getRegisteredusers);
      for (this.i = 0; this.i < this.registerlength; this.i++){
        console.log("registerdata email: ",this.registerdata[this.i].email)
        console.log("userobject email: ",this.userobject.email)
        if(this.registerdata[this.i].email === this.userobject.email && this.registerdata[this.i].password === this.userobject.password){
          console.log("email gelijk aan elkaar, PASSWOORD gelijk aan elkaar")
          this.$store.dispatch("login", this.userobject);
        }else{
          console.log("email or password is wrong")
        }
      }

      // this.$store.dispatch("login", this.userobject);
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