<template>
  <div
    class="splash__wrapper"
    :style="slide__wrapper"
    @click="changeClassAndNextPage"
  >
    <div class="splash" :style="slide">
      <!-- <v-container> -->
        
       <v-row justify="center" align="center"> 
        <v-col >
      <Logo width="300"/>
    </v-col>
    </v-row>
    <!-- </v-container> -->
    </div>
    <p>sometext + {{ test }} </p>
  </div>
</template>

<style>
.splash__wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  background-image: linear-gradient(0deg, rgba(166, 192, 254, .8) 0%, rgba(246, 128, 132, .8) 100%);
  overflow: hidden;
  /* background-image: url("@/static/bgi.png");
  background-size: cover;
  background-repeat: no-repeat; */
}
.splash {
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
}

/* .slideIn {
    animation-duration: 4s;
    animation-name: slidein;
} */

/* .slideOut {
    animation-duration: 4s;
    animation-name: slideout;
    top: -100%;
} */

@keyframes bgin {
  /* from {
    top: 0%;
  }

  to {
    top: -4%;
  } */

  0% {
    opacity: 0;
  }
}

@keyframes bgout {
  /* from {
    top: -4%;
  }

  to {
    top: -0%;
  } */

  100% {
    opacity: 0;
  }
}

@keyframes kfSlideout {
  /* from {
    margin-top: 0%;
    top: 4%;
  }

  to {
    margin-top: -100%;
    top: -100%;
  } */

  100% {
    opacity: 0;
  }
}
</style>

<script>
import Logo from '@/components/Logo.vue'

export default {
  components:{Logo},
  layout: "empty",
  // sockets: {
  //     connect() {
  //         console.log("connected io");
  //     },
  // },
  data() {
    return {
      isActive: false,
      animationDuration: 1000,
      test: null
    }
  },
  // async asyncData ({ $axios }) {
  //   const data = await $axios.$get('/api/users')
  //   return { test: data }
  // },
  computed: {
    slide() {
      if (this.isActive) {
        return {
          animationDuration: this.animationDuration + "ms",
          animationName: "kfSlideout",
        };
      }
    },
    slide__wrapper() {
      if (!this.isActive) {
        return {
          animationDuration: this.animationDuration + "ms",
          animationName: "bgin",
        };
      }
      return {
        animationDuration: this.animationDuration + "ms",
        animationName: "bgout",
      };
    },
  },
  methods: {
    changeClassOnClick() {
      this.isActive = true;
    },
    nextPage() {
      setTimeout(() => {
        this.$router.push("/welcome");
      }, this.animationDuration - 1000);
    },
    changeClassAndNextPage() {
      this.changeClassOnClick(), this.nextPage();
    },
    // async getMessage() {
    //     this.messageRxd = await this.socket.emitP("getMessage", {
    //         id: "abc123",
    //     });
    // },

    // socket() {
    //     this.socket.emit("connected", () => {
    //         console.log("connect success");
    //     });
    // },
    async get(){
      this.$axios.get('/api/users')
        .then(response => {
          // Обработка успешного ответа
          console.log(response);
        })
        .catch(error => {
          // Обработка ошибки
          console.error(error);
        });
    }
  },
  mounted() {
    // this.socket = this.$nuxtSocket({
    //     // nuxt-socket-io opts:
    //     name: "main", // Use socket "home"
    //     channel: "/index", // connect to '/index'
    //     // socket.io-client opts:
    //     reconnection: false,
    // });

    // this.get()
  },
};
</script>
