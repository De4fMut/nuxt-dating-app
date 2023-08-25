<template>
  <v-container fill-height fluid align-center justify-center>
    <v-row justify="center">
      <v-col cols="auto">
        <Logo />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col md="7" xs="12">
        <v-row justify="end">
          <v-col cols="8">
            <v-form ref="form" v-model="isValid" lazy-validation>
              <Registration :user="user" :profileData="profileData" />
            </v-form>
          </v-col>
        </v-row>
      </v-col>
      <v-col md="5" v-if="!$vuetify.breakpoint.xs">
        <Photos />
      </v-col>
    </v-row>
    <v-row justify="center"
      ><v-col cols="auto">
        <v-btn :disabled="!isValid" @click="postUser">войти</v-btn>
      </v-col></v-row
    >
    {{ user }}
    {{ profileData }}
    <v-btn absolute style="bottom: 0; right: 0" nuxt to="/login" plain
      >Авторизоваться</v-btn
    >
  </v-container>
</template>

<script>
import Registration from "@/components/Registration";
import Logo from "@/components/Logo";
import Photos from "@/components/Photos.vue";
import { mapActions, mapMutations } from "vuex";

export default {
  auth: "guest",
  components: {
    Registration,
    Logo,
    Photos,
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

        // typingStatus: false,

        birthDay: new Date(2000, 0, 2).toISOString().substr(0, 10),
        // Date.now() - new Date().getTimezoneOffset() * 60000
      },
      user: {
        login: null,
        email: null,
        password: null,
        name: null,
        date: Date(),
      },
    };
  },
  methods: {
    async postUser() {
      if (this.$refs.form.validate()) {
        const res = await this.$axios.$post("/api/registration", {
          user: this.user,
          profileData: this.profileData,
        });

        try {
          let response = await this.$auth.loginWith("local", {
            data: { email: this.user.email, password: this.user.password },
          });
          this.createUser(response.data.user);
          this.setProfileData(response.data.profileData);
          console.log(response);
        } catch (err) {
          console.log(err);
        }
      }
    },

    // ...mapMutations([{setProfileData: "profileData/setProfileData"}]),
    ...mapActions({
      createUser: "createUser",
      setProfileData: "profileData/setProfileData",
    }),
    // ...mapActions(["createUser", {setProfileData: "profileData/setProfileData"}]),
    submit() {
      if (this.$refs.form.validate()) {
        this.createUser(this.profileData);
        this.$router.push("/main");
        // console.log(this.user[Object.keys(this.user)[1]]);
      }
    },
  },
  mounted() {
    console.log(this.postBody);
  },
};
</script>

<style scoped>
html {
  overflow-y: scroll;
}
</style>
