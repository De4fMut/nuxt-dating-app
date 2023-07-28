<template>
  <v-container>
    <v-text-field
      v-model="user.login"
      :counter="16"
      :rules="nameRules"
      label="Логин"
      required
    />
    <v-text-field
      v-model="user.password"
      :counter="16"
      :type="show ? 'text' : 'password'"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show = !show"
      :rules="passwordRules"
      label="Пароль"
      required
    />
    <v-text-field
      v-model="user.email"
      :counter="25"
      :rules="emailRules"
      label="E-mail"
      required
    />
    <!-- <v-btn
              :disabled="!isValid"
              color="primary"
              class="mt-3"
              type="submit"
            >
              Submit
            </v-btn> -->
    <v-row justify="start">
      <v-col>
        <v-text-field
          label="Имя"
          v-model="profileData.name"
          :rules="nameRules"
          :counter="16"
          required
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row style="position: relative" justify="start">
      <!-- <v-col>
          <v-text-field
            :rules="rules"
            label="Дата рождения"
            v-model="profileData.birthDay"
            
          ></v-text-field>
        </v-col>
        <v-col cols="1">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="profileData.birthDay"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-model="profileData.birthDay"
                style="position: absolute; right: 0"
                icon
                readonly
                v-bind="attrs"
                v-on="on"
              >
                <v-icon> mdi-calendar </v-icon>
              </v-btn>
            </template>
            <v-date-picker v-model="profileData.birthDay" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(profileData.birthDay)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col> -->
      <v-col cols="12">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="profileData.birthDay"
              label="Дата рождения"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="profileData.birthDay"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row justify-sm="center" justify-md="start">
      <v-col>
        <v-btn-toggle>
          <v-btn
            @click="chooseGender(index)"
            v-for="(v, index) in profileDataTemplate.gender.title"
            :key="index"
            :value="profileDataTemplate.gender.value[index]"
          >
            {{ v }}
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-radio-group
          v-model="profileData.targetGender"
          label="С кем желаете познакомиться"
        >
          <v-radio
            v-for="(v, index) in profileDataTemplate.targetGender.title"
            :key="index"
            :label="v"
            :value="profileDataTemplate.targetGender.value[index]"
          >
          </v-radio>
        </v-radio-group>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-subheader>Интересы</v-subheader>
        <v-row>
          <v-col><v-chip close>text</v-chip> </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-subheader>Интересы</v-subheader>
        <v-row>
          <v-col><v-chip close>text</v-chip> </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-subheader>Интересы</v-subheader>
        <v-row>
          <v-col><v-chip close>text</v-chip> </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    profileData: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    formData: {},
    tier: "gender",
    i: 0,

    show: false,

    value: "",
    values: [],
    types: ["day", "mounth", "year"],
    mode: "stack",
    modes: ["stack", "column"],

    day: null,
    mounth: null,
    year: null,

    menu: false,
    modal: false,
    menu2: false,

    // ВАЛИДАЦИя
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Поле имя не может быть пустым",
      (v) =>
        /^.*[a-zA-ZА-ЯЁа-яё]+.*$/.test(v) ||
        "Имя не должно содержать знаки и цифры",
      // (v) => /^[^-() /]*$/.test(v) || 'Имя не должно содержать знаки и цифры',
      // (v) => !/^[0-9 /]*$/.test(v) || 'Имя не должно содержать знаки и цифры',
      (v) => (v && v.length <= 16) || "Имя должно быть меньше 16 символов",
    ],
    loginRules: [
      (v) => !!v || "Поле логин не может быть пустым",
      (v) => (v && v.length <= 16) || "Логин должен быть меньше 16 символов",
    ],
    passwordRules: [
      (v) => !!v || "Поле пароль не может быть пустым",
      (v) =>
        /^.*[a-zA-Z]+.*$/.test(v) ||
        "Пароль не соответствует параметрам безопасности",
      (v) =>
        /^[^-() /]*$/.test(v) ||
        "Пароль не соответствует параметрам безопасности",
      (v) =>
        /^\D.*$/.test(v) || "Пароль не соответствует параметрам безопасности",
      (v) =>
        (v && v.length >= 8) || "Пароль должен содержать минимум 8 символов",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        // /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,

    rules: [
      (value) => !!value || "Required.",
      (value) => (value && value.length >= 1) || "Min 1 characters",
      (value) => Number(value) !== NaN || "Only numbers",
    ],
  }),
  // props: {
  //   tier: { type: String, required: true },
  //   i: { type: Number, required: true },
  // },
  methods: {
    chooseGender(index) {
      this.profileData.gender =
        this.profileDataTemplate[this.tier].value[index];
      console.log(this.profileData.gender);
    },

    ...mapMutations({}),
    ...mapActions({}),

    // VALIDATION

    submit() {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post("/api/submit", {
          name: this.name,
          email: this.email,
          select: this.select,
          checkbox: this.checkbox,
        });
      }
    },
    clear() {
      this.$refs.form.reset();
    },
  },

  computed: {
    ...mapGetters({
      profileDataTemplate: "profileData/getProfileDataTemplate",

      userTemplate: "userTemplate/getUserTemplate",
    }),
    updateProfileData: {
      get() {
        return this.$store.state.profileData.profileData[this.tier];
      },
      set(upd) {
        let data = { upd, tier: this.tier };
        this.$store.commit("profileData/updateProfileData", data);
        console.log(this.tier);
        console.log(upd);
      },
    },
    updateUserData: {
      get() {
        return this.$store.state.user.user[this.tier];
      },
      set(update) {
        this.$store.commit("userTemplate/updateUserData", this.tier, update);
      },
    },
  },

  mounted() {},
};
</script>
