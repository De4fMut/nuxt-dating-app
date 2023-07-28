<template>
  <!-- <div>
    <h1>{{ login }}</h1>
    <h1>{{ res }}</h1>
    <form action="" method="post">
      <input type="text" placeholder="id" v-model="postBody.id" />
      <input type="text" placeholder="login" v-model="postBody.login" />
      <input type="text" placeholder="email" v-model="postBody.email" />
      <button @click.prevent="postUser">||||||||||||</button>
    </form>
  </div> -->
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
            <v-form v-model="isValid" lazy-validation>
              <Registration
                :isValid="isValid"
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
        <v-btn :disabled="!isValid" @click.prevent="submit">войти</v-btn>
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
      // if (this.$refs.form.validate()) {
      this.createUser(this.profileData);
      this.$router.push("/main");
      // console.log(this.user[Object.keys(this.user)[1]]);
      // }
    },
  },
  mounted() {
    console.log(this.postBody);
  },
};
</script>
