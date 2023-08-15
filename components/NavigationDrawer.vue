<template>
  <!-- <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Andrey</v-list-item-title>

        <v-btn
          icon
          @click.stop="mini = !mini"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

  <!-- <v-navigation-drawer app permanent>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->

  <!-- -------------------------------++++++++++++++++++++++++++++++++++++++++++------------------------------>

  <v-navigation-drawer
    permanent
    width="615px"
    app
    v-model="drawer"
    :mini-variant.sync="mini"
  >
    <!-- :mini-variant.sync="mini" -->
    <v-row class="fill-height" no-gutters style="overflow: hidden">
      <v-navigation-drawer light mini-variant mini-variant-width="56" permanent>
        <v-list-item class="px-2 d-flex justify-center align-center">
          <v-btn
            icon
            nuxt
            :to="`/users/${user.login}`"
            class="d-flex justify-center align-center"
          >
            <v-list-item-avatar class="ma-0">
              <v-img
                src="https://randomuser.me/api/portraits/women/75.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-btn>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item v-for="item in items" :key="item.title">
            <v-list-item-action class="d-flex justify-center align-center">
              <v-btn nuxt :to="`${item.src}`" icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-btn>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-row justify="center">
          <v-btn
            icon
            absolute
            style="z-index: 2; bottom: 2vw"
            @click="themeToggle"
          >
            <v-icon>mdi-invert-colors</v-icon>
          </v-btn>
        </v-row>
      </v-navigation-drawer>

      <v-list class="grow" v-if="mini == false && $route.path == ''">
        <!-- {{ this.page }} -->
        <v-list-item v-for="link in links" :key="link" link>
          <v-list-item-title v-text="link"></v-list-item-title>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <v-card
        color="transparent"
        flat
        width="520"
        class="d-flex justify-center"
        v-if="mini == false && $route.path == '/main'"
      >
        <v-container max-width="500" class="pa-1">
          <!-- <v-col cols="9"> -->
          <v-item-group v-model="selected" multiple>
            <v-row justify="start">
              <v-col
                v-for="(user, i) in users"
                class="d-flex justify-center"
                cols="4"
                :key="i"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-img
                  :src="require(`@/static/users/${user.login}/0.jpg`)"

                    width="150"
                    height="150"
                    class="text-right pa-2"
                    @click="toggle"
                  >
                    <v-btn icon dark>
                      <v-icon>
                        {{ active ? "mdi-heart" : "mdi-heart-outline" }}
                      </v-icon>
                    </v-btn>
                    <v-btn nuxt :to="'/users/'+ user.login" icon absolute style="bottom: 0; left: 0;">
                      <v-icon >
                        mdi-account
                      </v-icon>
                    </v-btn>
                  </v-img>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
          <!-- </v-col> -->
        </v-container>
      </v-card>

      <!-- <v-card
        color="transparent"
        flat
        width="520"
        class="d-flex justify-center"
        v-if="mini == false && $route.path == '/chat' || $route.path == `/chat/${room}`"
      >
        <v-list subheader>
          <v-subheader>Users in room</v-subheader>

          <v-list-item
            v-for="({ user1, user2, _id }, index) in rooms"
            :key="_id"
            @click.prevent="createRoom(_id)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="users[index].name" />
            </v-list-item-content>

            <v-list-item-action>
              <v-btn  icon>
                <v-icon>mdi-message-text</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-icon>
              <v-icon :color="user1 === user.id ? 'primary' : 'grey'">
                mdi-account-circle-outline
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card> -->

      <v-card
        color="transparent"
        flat
        width="520"
        class="d-flex justify-center"
        v-if="mini == false && $route.path == '/chat' || $route.path == `/chat/${room}`"
      >
        <v-list subheader>
          <v-subheader>Users in room</v-subheader>

          <v-list-item
            v-for="({ name, id }, index) in users"
            :key="id"
            @click.prevent="createRoom(id)"
          >
          {{ id }}
            <v-list-item-content>
              <v-list-item-title v-text="name" />
            </v-list-item-content>

            <v-list-item-action>
              <v-btn  icon>
                <v-icon>mdi-message-text</v-icon>
              </v-btn>
            </v-list-item-action>
            <v-list-item-icon>
              <v-icon :color="id === user.id ? 'primary' : 'grey'">
                mdi-account-circle-outline
              </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-card>

      <UserConfig v-if="mini == false && $route.path == `/users/${user.login}`" />

      <v-card
        color="transparent"
        flat
        width="520"
        class="d-flex justify-center"
        v-if="mini == false && $route.path == '/newsline'"
      >
        <v-container max-width="500" class="pa-1">
          <!-- <v-col cols="9"> -->
          <v-item-group v-model="selected" multiple>
            <v-row justify="start">
              <v-col
                v-for="(community, i) in communities"
                class="d-flex justify-center"
                cols="4"
                :key="i"
              >
                <v-item v-slot="{ active, toggle }">
                  <v-img
                    :src="`https://cdn.vuetifyjs.com/images/${community.src}`"
                    width="150"
                    height="150"
                    class="text-right pa-2"
                    @click="toggle"
                  >
                    <v-btn icon dark>
                      <v-icon>
                        {{ active ? "mdi-heart" : "mdi-heart-outline" }}
                      </v-icon>
                    </v-btn>
                  </v-img>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>
          <!-- </v-col> -->
        </v-container>
      </v-card>

      <v-spacer></v-spacer>
      <v-btn v-if="mini == false" icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import UserConfig from "@/components/UserConfig";
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

export default {
  components: {
    UserConfig,
  },
  data: () => ({
    page: null,
    items: [
      { title: "Home", icon: "mdi-home", src: "/main" },
      { title: "My Account", icon: "mdi-account", src: "/chat" },
      {
        title: "Communities",
        icon: "mdi-account-group-outline",
        src: "/communities",
      },
      {
        title: 'Newsline',
        icon: 'mdi-newspaper-variant-multiple',
        src: '/newsline'
      }
    ],
    pairs: [
      {
        src: "deamut/0.jpg",
        to: 'users/deamut'
      },
      {
        src: "egor/0.jpg",
        to: 'users/egor'
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
    ...mapMutations(['setRooms', 'setRoom']),
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
          console.log(response)
          this.setRoom(response.data)
          this.$router.push(`/chat/${response.data}`)
        })
        .catch((error) => {
          // Обработка ошибки
          console.error(error);
        });
    },
  },
  computed: {
    ...mapGetters(["user", "users", 'rooms', 'room']),
  },
  mounted() {
    // this.getPath();
  },
};
</script>
