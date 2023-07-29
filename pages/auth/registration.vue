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
              <Registration
                
                :user="user"
                :profileData="profileData"
              />
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
  </v-container>
</template>

<script>
import Registration from "@/components/Registration";
import Logo from "@/components/Logo";
import Photos from "@/components/Photos.vue";
import { mapActions } from "vuex";

export default {
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
      const res = await this.$axios.$post("/api/registration", {user: this.user, profileData: this.profileData});
      this.createUser(res.user);
      this.$router.push("/main");
      console.log(res.user);
      }
    },
    ...mapActions(["createUser"]),
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
