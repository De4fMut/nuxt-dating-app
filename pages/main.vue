<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <Logo />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="auto">
        <ProfileCard :admin="admin"/>
        <!-- <v-btn @click="push"></v-btn> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Logo from '@/components/Logo.vue'
import ProfileCard from '@/components/ProfileCard.vue'

export default {
  layout: "default",
  components:{
    Logo,
    ProfileCard
  },
  async asyncData({}) {
    // const test = await $axios.$get('/api/test')
    return {
      test: "main",
    };
  },
  data() {
    return {
      admin: false
    }
  },
  methods: {
    push(){
      this.$router.push('/login')
    }
  },
  mounted() {
    
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
