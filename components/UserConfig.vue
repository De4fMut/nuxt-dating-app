<template>
  <v-card style="overflow-y: scroll;" color="transparent" flat width="520" class="d-flex justify-center">
    <!-- <v-card-title>{{ title }}</v-card-title> -->
    <v-card-actions>
      <v-col>
      <v-list>
        <v-list-item-group v-for="(list, index) in lists" :key="index">
          <v-row>
          <v-list-item-title v-text="list.title"></v-list-item-title>
          <v-list-item v-for="(item, i) in list.params" :key="i">
            <v-row>
            <v-list-item-content>
              <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
            </v-list-item-content>
            <v-divider></v-divider>
          </v-row>
          
          </v-list-item>
        </v-row>
        </v-list-item-group>
        <v-spacer></v-spacer>
      </v-list>
      <v-row>
      <v-btn @click="logout">Выйти</v-btn>
    </v-row>
  </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      title: "some title",
      options: {},
      lists: [
        {
          title: "Настройка аккаунта",
          params: [
            {
              text: 'Управление платежами',
              type: 'btn',
            },
            {
              text: 'Восстановить покупки',
              type: 'btn',
            },
            {
              text: 'Адрес E-mail',
              type: 'btn',
            },
            {
              text: 'Номер телефона',
              type: 'btn',
            },
            {
              text: 'Промокод',
              type: 'btn',
            },
          ],
        },
        {
          title: "Настройка поиска",
          params: [
            {
              text: "Место",
              type: "btn",
            },
            {
              text: 'Расстояние',
              type: 'range',
            },
            {
              text: 'Интересуют',
              type: 'menu',
            },
            {
              text: 'Возраст',
              type: 'range',
            },
            {
              text: 'Заблокированные контакты',
              type: 'btn',
            },
          ],
        },
        {
          title: "Профиль в интернете",
          params: [
            {
              text: "Имя пользователя",
              type: "btn",
            },
            {
              text: "поделиться моим URL-адресом",
              type: "btn",
            },
          ],
        },
        {
          title: "Статус активности",
          params: [
            {
              text: "Статус недавней активности",
              type: "btn",
            },
          ],
        },
        {
          title: "Уведомления",
          params: [
            {
              text: "Адрес эл. почты",
              type: "btn",
            },
            {
              text: "Push-уведомления",
              type: "btn",
            },
          ],
        },
        {
          title: "Настройки темы",
          params: [
            {
              text: "Использовать настройки системы",
              type: "toggle",
            },
            {
              text: "Тёмная тема",
              type: "toggle",
            },
          ],
        },
        {
          title: "Помощь и поддержка",
          params: [
            {
              text: "Помощь и поддержка",
              type: "btn",
            },
          ],
        },
        {
          title: "Советы по безопасности",
          params: [
            {
              text: "Правила сообщества и советы по безопасности",
              type: "btn",
            },
          ],
        },
        {
          title: "Юридическая информация",
          params: [
            {
              text: "Настройка конфиденциальности",
              type: "btn",
            },
            {
              text: "Политика конфиденциальности",
              type: "btn",
            },
          ],
        },
      ],
    };
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>
