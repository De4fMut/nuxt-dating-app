<template>
  <v-card-actions>
    <v-row justify="center">
      <v-col cols="auto">
        <v-form v-if="tier == 'gender'">
          <v-row justify="center">
            <v-col cols="auto" v-for="(v, index) in profileDataTemplate[tier].title"
                :key="index">
              <v-btn
                @click="chooseGender(index)"
                
                :value="profileDataTemplate[tier].value[index]"
              >
                {{ v }}
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
        <v-form v-if="tier == 'name' || tier == 'email' || tier == 'password'">
          <v-col cols="auto">
          <v-text-field
            label="Name"
            v-model="profileData[tier]"
            :rules="nameRules"
            :counter="10"
            required
          ></v-text-field>
        </v-col>
        </v-form>
        <v-form
          v-if="
            tier == 'targetGender' ||
            tier == 'purpose' ||
            tier == 'targetHeight' ||
            tier == 'targetWeight'
          "
        >
        <v-col cols="auto">
          <v-radio-group v-model="profileData[tier]">
            <v-radio
              v-for="(v, index) in profileDataTemplate[tier].title"
              :key="index"
              :label="v"
              :value="profileDataTemplate[tier].value[index]"
            >
            </v-radio>
          </v-radio-group>
        </v-col>
        </v-form>
        <v-form v-if="tier == 'birthDay'">
          <!-- Разобраться с датой, соеденить поля ввода с меню-календарем, возвращать по итогу один объект -->

          <v-row justify="center">
            <v-col>
              <v-text-field
                :rules="rules"
                label="Day"
                v-model="profileData[tier]"
              ></v-text-field>
            </v-col>
          
          <!-- поменял в синк и модели profileDataTemplate.birthDay на updateProfileData -->
          <v-col>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="profileData[tier]"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-model="profileData[tier]"
                icon
                readonly
                v-bind="attrs"
                v-on="on"
              >
                <v-icon> mdi-calendar </v-icon>
              </v-btn>
            </template>
            <v-date-picker v-model="profileData[tier]" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(profileData[tier])"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>
          </v-row>
        </v-form>
        <template v-if="tier == undefined">
          <v-form v-model="valid" ref="form" lazy-validation>
            <v-text-field
              label="Name"
              v-model="name"
              :rules="nameRules"
              :counter="10"
              required
            ></v-text-field>
            <v-text-field
              label="E-mail"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-select
              label="Item"
              v-model="select"
              :items="items"
              :rules="[(v) => !!v || 'Item is required']"
              required
            ></v-select>
            <v-checkbox
              label="Do you agree?"
              v-model="checkbox"
              :rules="[(v) => !!v || 'You must agree to continue!']"
              required
            ></v-checkbox>

            <v-btn @click="submit" :disabled="!valid"> submit </v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-form>
        </template>

        <v-row justify="center">
          <v-col cols="6">
            <v-card-text>{{ profileData }}</v-card-text>
          </v-col>
        </v-row>

        <!--
        <script>
        import axios from "axios";
        
        export default {
          data: () => ({
            valid: true,
            name: "",
            nameRules: [v => !!v || "Name is required", v => (v && v.length <= 10) || "Name must be less than 10 characters"],
            email: "",
            emailRules: [v => !!v || "E-mail is required", v => /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) || "E-mail must be valid"],
            select: null,
            items: ["Item 1", "Item 2", "Item 3", "Item 4"],
            checkbox: false
          }),
        
          methods: {
            submit() {
              if (this.$refs.form.validate()) {
                // Native form submission is not yet supported
                axios.post("/api/submit", {
                  name: this.name,
                  email: this.email,
                  select: this.select,
                  checkbox: this.checkbox
                });
              }
            },
            clear() {
              this.$refs.form.reset();
            }
          }
        };
        </script>
        -->
      </v-col>
    </v-row>
  </v-card-actions>
</template>


<script>
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    // profileDataTemplate: {
    //   gender: {
    //     title: ["Мужчина", "Женщина"],
    //     value: ["male", "female"],
    //   },
    //   targetGender: {
    //     title: ["Мужчина", "Женщина", "Со всеми"],
    //     value: ["male", "female", "both"],
    //   },
    //   purpose: {
    //     title: ["Флирт", "Свидание", "Отношения", "Помощь"],
    //     value: ["flirt", "date", "rel", "help"],
    //   },
    //   targetHeight: {
    //     title: ["до 170 см", "170-190 см", "от 190", "Любого"],
    //     value: ["<170", "170-190", "190>", "any"],
    //   },
    //   targetWeight: {
    //     title: ["до 60 кг", "60-80 кг", "80-100 кг", "от 100 кг", "Любого"],
    //     value: ["60", "60-80", "80-100", "100", "any"],
    //   },
    //   name: "",
    //   birthDay: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //     .toISOString()
    //     .substr(0, 10),
    // },

    // Можно доработать и передавать свойства сразу со значением и заголовком
    profileData: {
      gender: "",
      targetGender: "",
      purpose: "",
      targetHeight: "",
      targetWeight: "",
      name: "",
      birthDay: new Date(2000, 0, 2).toISOString().substr(0, 10),
      // Date.now() - new Date().getTimezoneOffset() * 60000
    },

    user: {
      login: null,
      email: null,
      password: null,
      date: null,
    },

    // tier: "gender",
    // i: 0,

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
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(v) ||
        "E-mail must be valid",
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
  props: {
    tier: { type: String, required: true },
    i: { type: Number, required: true },
  },
  methods: {
    // log() {
    //   console.log(this.i);
    //   console.log(this.tier);
    //   console.log(this.profileData);
    // },

    chooseGender(index) {
      this.profileData.gender =
        this.profileDataTemplate[this.tier].value[index];
      console.log(this.profileData.gender);
    },

    ...mapMutations({
      // setTotalArray: 'tier/setTotalArray',
      // chooseGender: "profileData/chooseGender",
    }),
    ...mapActions({
      // nextTier: "tier/nextTier",
    }),

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
    // a(){
    //   this.setTotalArray()
    // console.log(this.getTotalArray);
    // }
  },

  computed: {
    // profileDataTemplate() {
    //   return this.$store.state.profileData.profileDataTemplate;
    // },
    // profileData() {
    //   return this.$store.state.profileData.profileData;
    // },
    ...mapGetters({
      // tier: "tier/getTier",
      // getTotalArray: 'tier/getTotalArray'
      profileDataTemplate: "profileData/getProfileDataTemplate",
      // profileData: 'profileData/getProfileData',
      // user: 'user/getUser',
      userTemplate: "user/getUserTemplate",
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
        this.$store.commit("user/updateUserData", this.tier, update);
      },
    },
  },

  mounted() {},
};
</script>
