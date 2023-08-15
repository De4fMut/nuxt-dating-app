<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <Logo />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <ProfileCard :admin="admin" :user="this.user" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "@/components/Logo.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import { mapGetters, mapState } from "vuex";

export default {
  layout: "default",
  name: 'UserPage',
  components: {
    Logo,
    ProfileCard,
  },
  async asyncData({ params }) {
    const login = params.login; // When calling /abc the slug will be "abc"
    return { login };
  },
  data() {
    return {
      admin: true,
    };
  },
  
  computed: {
    ...mapGetters(["user", "currentUser"]),
  },
  methods: {
    changeAdmin(){
      if (this.user.login !== this.currentUser.login){
        this.admin = false
      }
    }
  },

  mounted() {
    this.changeAdmin()
    // console.log(this.params.login)
  },
  
};
</script>
