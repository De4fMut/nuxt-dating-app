<template>

<!-- Доработать, переписать на v-window -->


  <v-container fill-height fluid align-center justify-center>
    <!-- <div class="auth__wrapper"> -->
    <v-row justify="center">
      <v-col cols="auto">
        <Logo />
      </v-col>
    </v-row>
    <!-- <div style="flex: 0 0 60%"> -->
    <!-- <v-row v-if="tier == 'main'" justify="center">
      <v-col cols="9">
        <Registration :tier="tier" :i="i" />
      </v-col>
    </v-row> -->
    <v-row v-if="tier != 'main'" justify="center">
      <v-col cols="auto">
        <v-card width="75vw" height="600px">
          <!-- <div class="auth__menu"> -->
          <v-row>
            <v-col>
              <v-card-title>Welcome</v-card-title>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-subtitle>{{ subHeader[i] }}</v-card-subtitle>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="9">
              <AuthCard :tier="tier" :i="i" />
            </v-col>
          </v-row>
          <v-card-actions class="btns">
            <v-btn
              @click="
                () => {
                  this.i++;
                }
              "
              class="btn"
              style="background-color: cadetblue"
            >
              Login
            </v-btn>
            <v-btn
              @click="log"
              class="btn"
              style="background-color: rgb(160, 95, 120)"
            >
              Chek
            </v-btn>
            <v-btn
              @click="postProfileData"
              class="btn"
              style="background-color: rgb(91, 75, 163)"
            >
              POST
            </v-btn>
          </v-card-actions>
          <!-- <v-row>
            <v-col>
              <div v-for="(item, index) in profileData" :key="index">
                {{ item }}
              </div>
            </v-col>
          </v-row> -->
          <v-card-actions>
            <!-- btn next -->
          </v-card-actions>
          <!-- </div> -->
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center"
      ><v-col cols="auto">
        <v-btn @click="nextTier">далее</v-btn>
        <v-btn @click="log">log</v-btn>
      </v-col></v-row
    >
    <v-row justify="center">
      <v-col cols="auto">
       <v-btn nuxt to="/auth/Login" plain>войти</v-btn> 
      </v-col>
      <v-col cols="auto">
       <v-btn nuxt to="/auth/registration" plain>Регистрация</v-btn> 
      </v-col>
    </v-row>
    <!-- </div> -->
    <Window :i="i" :dialog="dialog" @check-dialog="dialogChange" />
    <!-- </div> -->
    
    <v-footer> © 2023 Знакомства через добрые дела </v-footer>
  </v-container>
</template>

<style>
.auth__wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 100vh;
  color: aquamarine;
}
</style>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import AuthCard from '@/components/AuthCard.vue'
import Logo from '@/components/Logo.vue'
// import Registration from '@/components/Registration.vue'
import Window from '@/components/Window.vue'

export default {
  components:{
    AuthCard,
    Logo,
    // Registration,
    Window
  },
  layout: "empty",
  data() {
    return {
      // profileData: {
      //   gender: null,
      //   targetGender: null,
      //   purpose: null,
      //   targetHeight: null,
      //   targetWeight: null,
      //   name: null,
      //   birthDay: null,
      //   // email: null,
      // },
      subHeader: [
        "Your gender",
        "Who are you looking for",
        "Your reason",
        "Person height",
        "Person weight",
        "Your name",
        "Your age",
        "We've found many men",
      ],
      tier: "gender",
      i: 0,
      array: [],
      dialog: false,
    };
  },
  computed: {
    changeSub() {
      this.i++;
    },
    setGenderMale() {
      this.profileData.gender = "male";
    },
    setGenderFemale() {
      this.profileData.gender = "female";
    },

    // VUEX

    ...mapGetters({
      // tier: "tier/getTier",
      // getTotalArray: 'tier/getTotalArray'
      profileDataTemplate: "profileData/getProfileDataTemplate",
      profileData: "profileData/getProfileData",
      user: "userTemplate/getUser",
      userTemplate: "userTemplate/getUserTemplate",
    }),
  },
  methods: {
    nextTier() {
      // const keys = Object.keys(this.profileDataTemplate).concat(Object.keys(this.userTemplate));

      if (this.tier != "reg") {
        this.i++;
        console.log(this.i);
        this.tier = this.array[this.i];
        if (this.tier == "dialog") {
          this.dialog = true;
        }
      } else this.$router.push("/auth/registration");
    },
    dialogChange(value) {
      this.dialog = value;
      this.nextTier();
    },
    setTotalArray() {
      this.array = Object.keys(this.profileDataTemplate).concat(
        Object.keys(this.userTemplate)[1],
        ["dialog"],
        ["reg"]
      );
      console.log(this.array);
    },
    ...mapActions({
      // nextTier: 'tier/nextTier'
    }),

    log() {
      console.log(this.i);
      console.log(this.tier);
      console.log(this.profileData);
    },
    // log() {
    //   console.log(this.profileData);
    // },
    async postProfileData() {
      const res = await this.$axios.$post("/api/auth", this.profileData);
      this.res = res;
      console.log(res);
    },
  },
  mounted() {
    this.setTotalArray();
  },
};
</script>
