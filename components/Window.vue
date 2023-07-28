<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <!-- <v-btn color="primary" v-bind="attrs" v-on="on"> Open Dialog </v-btn> -->
      </template>
      <!-- <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Подтверждение анкеты</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list
          three-line
          subheader
        >
          <v-subheader>Подтвердите ваш аккаунт несколькими способами, другие пользователи будут больше доверять вашему аккаунту и вы получите больше внимания.</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Content filtering</v-list-item-title>
              <v-list-item-subtitle>Set the content filtering level to restrict apps that can be downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Password</v-list-item-title>
              <v-list-item-subtitle>Require password for purchase or use password to restrict purchase</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card> -->
      <v-card max-width="450" class="mx-auto">
        <v-toolbar>
          <v-btn @click="dialogFalse" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>

          <v-toolbar-title>Подтверждение анкеты</v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list three-line>
          <template v-for="(item, index) in items">
            <v-subheader
              v-if="item.header"
              :key="item.header"
              v-text="item.header"
            ></v-subheader>

            <v-divider
              v-else-if="item.divider"
              :key="index"
              :inset="item.inset"
            ></v-divider>

            <v-list-item v-else :key="item.title">
              <v-list-item-avatar>
                <v-img :src="item.avatar"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          header:
            "Подтвердите ваш аккаунт несколькими способами, другие пользователи будут больше доверять вашему аккаунту и вы получите больше внимания.",
        },
        {
          avatar: require("@/static/socmedicons/phone.png"),
          title: "Номер телефона",
        },
        { divider: true, inset: true },
        {
          avatar: require("@/static/socmedicons/vk.png"),
          title: "VK ID",
        },
        { divider: true, inset: true },
        {
          avatar: require("@/static/socmedicons/ok.png"),
          title: "OK",
        },
        { divider: true, inset: true },
        {
          avatar: require("@/static/socmedicons/tel.png"),
          title: "Telegram",
        },
        { divider: true, inset: true },
        {
          avatar: require("@/static/socmedicons/vib.png"),
          title: "Viber",
        },
        {
          avatar: require("@/static/socmedicons/yandex.png"),
          title: "Yandex ID",
        },
      ],
      value: this.dialog
    };
  },
  props: {
    i: { type: Number, required: true },
    dialog: { type: Boolean, required: true },
  },
  methods: {
    dialogFalse(){
      this.$emit('check-dialog', this.value)
      this.value = !this.dialog
    }
  },
  mounted() {},
};
</script>
