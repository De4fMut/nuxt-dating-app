<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <Logo />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <ProfileCard :user="user"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from "@/components/Logo.vue";
import ProfileCard from "@/components/ProfileCard.vue";
import {mapGetters} from 'vuex'

export default {
  layout: "default",
  components: {
    Logo,
    ProfileCard,
  },
  computed: {
    ...mapGetters[{user: 'getUser'}]
  },
};
</script>
