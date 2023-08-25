<template>
  <v-navigation-drawer width="450" app permanent>
    <v-row>
      <v-col>
    <v-list-item>
      <v-btn
        icon
        nuxt
        :to="`/users/${user.login}`"
        class="d-flex justify-center align-center mr-2"
      >
        <v-list-item-avatar class="ma-0">
          <v-img src="https://randomuser.me/api/portraits/women/75.jpg"></v-img>
        </v-list-item-avatar>
      </v-btn>
      <v-list-item-content>
        <v-list-item-title class="text-h8"> {{ user.name }} </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-col>
<v-spacer></v-spacer>
    <!-- <v-spacer></v-spacer> -->
    <v-col class=" d-flex justify-center align-center">
    <!-- <v-list-item-group> -->
      <v-row>
      <!-- <v-list-item v-for="(item, index) in navs" :key="index"> -->
        <v-col class="pa-2 d-flex justify-center align-center" v-for="(item, index) in navs" :key="index" cols="auto">
      <v-btn icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-col>
      <!-- </v-list-item> -->
    </v-row>
    <!-- </v-list-item-group> -->
    </v-col>
  </v-row>

    <v-divider></v-divider>
    <v-container>
      <v-row justify="center">
        <v-item-group width="100%">
          <v-row class="py-6 px-2">
            <v-item
              v-if="$route.name == 'main' || $route.path == `/main/`"
              v-for="item in items[0]"
              :key="item.title"
              v-slot="{ active, toggle }"
            >
              <v-col cols="auto">
                <v-btn
                  class="pa-2"
                  :active-class="
                    !$vuetify.theme.dark
                      ? 'white--text black'
                      : 'black--text white'
                  "
                  nuxt
                  :to="item.to"
                  :input-value="active"
                  rounded
                  small
                  @click.prevent="toggle"
                >
                  {{ item.title }}
                </v-btn>
              </v-col>
            </v-item>
            <v-item
              v-if="$route.name == '/sec/:'"
              v-for="item in items[1]"
              :key="item.title"
              v-slot="{ active, toggle }"
            >
              <v-col cols="auto">
                <v-btn
                  class="pa-2"
                  :active-class="
                    !$vuetify.theme.dark
                      ? 'white--text black'
                      : 'black--text white'
                  "
                  nuxt
                  :to="item.to"
                  :input-value="active"
                  rounded
                  small
                  @click.prevent="toggle"
                >
                  {{ item.title }}
                </v-btn>
              </v-col>
            </v-item>
          </v-row>
        </v-item-group>
      </v-row>

      <Favorites v-if="$route.name == '/main/favorites'" />
      <Messages v-if="$route.name == '/main/chat'" />
      <!-- <Pairs v-if="$route.name == '/main/pairs'" /> -->
      <Pairs v-if="$route.name == 'main'" />
      <Search v-if="$route.name == '/main/search'" />
      <Active v-if="$route.name == '/sec/active'" />
      <Communities v-if="$route.name == '/sec/communities'" />
      <Compilation v-if="$route.name == '/sec/compilation'" />
      <Newsline v-if="$route.name == '/sec/newsline'" />
      <Rookies v-if="$route.name == '/sec/rookies'" />
      <Wishes v-if="$route.name == '/sec/wishes'" />
    </v-container>
    <v-btn icon absolute style="z-index: 2; bottom: 2vw" @click="themeToggle">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>
<!-- -------------------------------++++++++++++++++++++++++++++++++++++++++++------------------------------>


<script>
import UserConfig from "@/components/UserConfig";
import Favorites from "@/components/NavDrComps/Prime/Favorites";
import Messages from "@/components/NavDrComps/Prime/Messages";
import Pairs from "@/components/NavDrComps/Prime/Pairs";
import Search from "@/components/NavDrComps/Prime/Search";

import Active from "@/components/NavDrComps/Sec/Active";
import Communities from "@/components/NavDrComps/Sec/Communities";
import Compilation from "@/components/NavDrComps/Sec/Compilation";
import Newsline from "@/components/NavDrComps/Sec/Newsline";
import Rookies from "@/components/NavDrComps/Sec/Rookies";
import Wishes from "@/components/NavDrComps/Sec/Wishes";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

export default {
  components: {
    UserConfig,
    Favorites,
    Messages,
    Pairs,
    Search,
    Active,
    Communities,
    Compilation,
    Newsline,
    Rookies,
    Wishes,
  },
  data: () => ({
    page: null,
    navs: [
      {
        icon: "mdi-view-week-outline",
      },
      {
        icon: "mdi-briefcase-outline",
      },
      {
        icon: "mdi-shield-outline",
      },
    ],
    items: [
      [
        {
          title: "Пары",
          icon: "mdi-home",
          to: "/main",
        },
        {
          title: "Сообщения",
          icon: "mdi-account",
          to: "/chat",
        },
        {
          title: "Поиск",
          icon: "mdi-account-group-outline",
          to: "/search",
        },
        {
          title: "Избранное",
          icon: "mdi-newspaper-variant-multiple",
          to: "/favorites",
        },
      ],
    ],
    pairs: [
      {
        src: "deamut/0.jpg",
        to: "users/deamut",
      },
      {
        src: "egor/0.jpg",
        to: "users/egor",
      },
      {
        src: "unknown/userPhoto.png",
      },
      // {
      //   src: "backgrounds/md2.jpg",
      // },
    ],
    communities: [
      {
        src: "backgrounds/bg.jpg",
      },
      {
        src: "backgrounds/md.jpg",
      },
      {
        src: "backgrounds/bg-2.jpg",
      },
      {
        src: "backgrounds/md2.jpg",
      },
    ],
    selected: [],
    recent: [
      {
        active: true,
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Jason Oner",
      },
      {
        active: true,
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: "Mike Carlson",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Cindy Baker",
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Ali Connors",
      },
    ],
    previous: [
      {
        title: "Travis Howard",
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
      },
    ],
    links: ["Home", "Contacts", "Settings"],
    drawer: true,
    mini: true,
  }),
  methods: {
    ...mapMutations(["setRooms", "setRoom"]),
    getPath() {
      this.page = this.$route.path;
      console.log(this.page);
    },
    themeToggle() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    async joinRoom(id) {
      const response = await this.$axios
        .post("/api/room", { user1Id: this.user.id, user2Id: id })
        .then((response) => {
          // Обработка успешного ответа
          console.log(response);
        })
        .catch((error) => {
          // Обработка ошибки
          console.error(error);
        });
    },
    async createRoom(id) {
      const response = await this.$axios
        .post("/api/createroom", { user1Id: this.user.id, user2Id: id })
        .then((response) => {
          // Обработка успешного ответа
          console.log(response);
          this.setRoom(response.data);
          this.$router.push(`/chat/${response.data}`);
        })
        .catch((error) => {
          // Обработка ошибки
          console.error(error);
        });
    },
  },
  computed: {
    ...mapGetters(["user", "users", "rooms", "room"]),
  },
  mounted() {
    console.log(this.$route.path);
  },
};
</script>
