<template>
  <v-container fill-height fluid align-center justify-center>
    <v-row justify="center">
      <v-col cols="auto">
        <Logo />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="7" xs="12">
        <v-row justify="center">
          <v-col cols="8">
            <v-form ref="form" v-model="isValid" lazy-validation>
              <Login :user="user" :profileData="profileData" />
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center"
      ><v-col cols="auto">
        <v-btn :disabled="!isValid" @click="submit">войти</v-btn>
      </v-col></v-row
    >
    {{ user }}
    {{ profileData }}
  </v-container>
</template>

<script>
import Login from "@/components/Login";
import Logo from "@/components/Logo";

import { mapActions } from "vuex";

export default {
  components: {
    Login,
    Logo,
  },

  layout: "empty",

  data() {
    return {
      isValid: true,
      postBody: {
        id: null,
        login: null,
        email: null,
      },
      profileData: {
        gender: "",
        targetGender: "",
        purpose: "",
        targetHeight: "",
        targetWeight: "",
        name: "",
        typingStatus: false,

        birthDay: new Date(2000, 0, 2).toISOString().substr(0, 10),
        // Date.now() - new Date().getTimezoneOffset() * 60000
      },
      user: {
        login: null,
        email: null,
        password: null,
        date: Date(),
      },
    };
  },
  methods: {
    async postUser() {
      const res = await this.$axios.$post("/login", this.postBody);
      this.res = res;
      console.log(res);
    },
    ...mapActions(["createUser"]),
    submit() {
      if (this.$refs.form.validate()) {
        this.createUser(this.profileData);
        this.$router.push("/main");
        // console.log(this.user[Object.keys(this.user)[1]]);
      }
    },

    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
  mounted() {
    console.log(this.postBody);
  },
};
</script>
