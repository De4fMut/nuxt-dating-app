<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <Logo />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <ProfileCard :admin="admin" :user="user"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "@/components/Logo.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import {mapGetters, mapState} from 'vuex'

export default {
  layout: "default",
  components: {
    Logo,
    ProfileCard,
  },
  async asyncData({ params }) {
      const user = params.user // When calling /abc the slug will be "abc"
      return { user }
    },
    data() {
      return {
        admin: true
      }
    },
  computed: {
    ...mapState['user']
  },
};
</script>
