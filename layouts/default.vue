<template>
  <v-app>
    <!-- <v-app-bar 
    app 
    elevation="4"
    clipped-left
    ></v-app-bar> -->
    <!-- <v-btn
      rounded
      right
      absolute
      style="z-index: 2; right: 2vw; top: 2vw"
      @click="themeToggle"
    >
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn> -->
    <NavigationDrawer />
    <v-main :class="{'mr-14': $route.name == 'main' || $route.name == 'users'}">
      <!-- class="mr-14" -->
      <v-container fluid style="height: 100%">
        <nuxt />
      </v-container>
    </v-main>
    <!-- <v-footer> </v-footer> -->
  </v-app>
</template>

<style scoped>
/* html { */
  /* font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box; */
  /* overflow: hidden; */
/* } */

/* *,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
} */
</style>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import NavigationDrawer from "@/components/NavigationDrawer.vue";

export default {
  components: {
    NavigationDrawer,
  },
  data: () => ({
    drawer: true,
  }),
  computed: {
    ...mapState(["user", "users"]),
  },
  // middleware: "auth",

  methods: {
    ...mapActions(["joinRoom", "leftRoom", "createUser"]),
    exit() {
      // this.leftRoom();
      this.$router.push("/main");
    },
    themeToggle() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },

    async fetch() {
      if (!this.user.length) {
      await this.createUser(this.$auth.user);
      this.joinRoom(this.user);
      }
    },
    refresh(){
      this.$auth.refreshTokens()
      setTimeout(() => this.refresh(), 14*60*1000);
      console.log('ok')
    }
  },
  mounted() {
    this.refresh()
    this.fetch()
    
  },
};
</script>
