<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <Logo />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <v-window v-model="onboarding">
          <v-window-item 
          v-for="(user, index) in users" 
          :key="index"
          >
            <ProfileCard :admin="admin" :user="currentUser"/>
          </v-window-item>
          <v-btn @click="n">x</v-btn>
        </v-window>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "@/components/Logo.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  layout: "default",
  name: 'Main',
  components: {
    Logo,
    ProfileCard,
  },
  async asyncData({ $axios }) {
    const users = await $axios.$get("/api/users");
    return {
      users,
    };
  },
  data() {
    return {
      admin: false,
      onboarding: 1,
    };
  },
  methods: {
    ...mapMutations(["setCurrentUser"]),
    push() {
      this.$router.push("/login");
    },
    n(){
      ++this.onboarding
      this.setCurrentUser(this.users[this.onboarding-1])
      console.log(this.onboarding)
    }
  },
  computed: {
    ...mapGetters(["currentUser"]),
  },
  mounted() {
    this.setCurrentUser(this.users[this.onboarding-1])
    console.log(this.users);
  },
};
</script>

<style scoped>
.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
