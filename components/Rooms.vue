<template>
  <v-card
    color="transparent"
    flat
    width="520"
    class="d-flex justify-center"
    v-if="
      (mini == false && $route.path == '/chat') ||
      $route.path == `/chat/${room}`
    "
  >
    <v-list subheader>
      <v-subheader>Мессенджер</v-subheader>

      <v-list-item
        v-for="({ name, id, ava }, index) in rooms"
        :key="index"
        @click.prevent="createRoom(id)"
      >
        {{ id }}
        <v-list-item-content>
            <v-list-item-avatar class="ma-0">
              <v-img
                src="https://randomuser.me/api/portraits/women/75.jpg"
              ></v-img>
            </v-list-item-avatar>
          <v-list-item-title v-text="name" />
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon>mdi-message-text</v-icon>
          </v-btn>
        </v-list-item-action>
        <v-list-item-icon>
          <v-icon> mdi-account-circle-outline </v-icon>
        </v-list-item-icon>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";

export default {
  data: () => ({}),
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
    // this.getPath();
  },
};
</script>
