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
              <Login :postBody="postBody" />
            </v-form>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row justify="center"
      ><v-col cols="auto">
        <v-btn :disabled="!isValid" @click="postt">войти</v-btn>
      </v-col></v-row
    >
    {{ postBody }}
  </v-container>
</template>

<script>
import Login from "@/components/Login";
import Logo from "@/components/Logo";

import { mapActions, mapMutations } from "vuex";

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
        email: null,
        password: null,
      },
      profileData: {
        gender: "",
        targetGender: "",
        purpose: "",
        targetHeight: "",
        targetWeight: "",
        name: "",
        // typingStatus: false,

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
      if (this.$refs.form.validate()) {
        const res = await this.$axios.$post("/api/login", this.postBody);
        this.createUser(res.user);
        this.$router.push("/main");
        console.log(res.user);
      }
    },

    async postt() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.postBody,
        })
        this.createUser(this.$auth.user);
        this.setProfileData(response.data.profileData)
        // this.$router.push("/main");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    // ...mapMutations([{setProfileData: "profileData/setProfileData"}]),

    ...mapActions({createUser: "createUser", setProfileData: "profileData/setProfileData"}),
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
    this.$auth.refreshTokens()
  },
};
</script>
