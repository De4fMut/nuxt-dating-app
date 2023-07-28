<template>
  <v-app>
    <v-btn rounded absolute style="z-index: 2; left: 2vw; top: 2vw;"  @click="themeToggle"> <v-icon>mdi-invert-colors</v-icon> </v-btn>
    <v-main>
        <Nuxt />
    </v-main>
    <!-- <v-footer>
      fooooooooter
    </v-footer> -->
  </v-app>
</template>

<style>
/* ::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-track {
    opacity: 1;
    border-radius: 5px;
}

::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 5px;
} */


html {
  /* font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px; */
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  /* overflow: hidden; */
  /* background-color: black; */
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

/* .button--green {
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
export default {
  data() {
    return {
        
    };
  },
  methods: {
    themeToggle() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
  mounted() {
    
  },
};
</script>
