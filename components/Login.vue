<template>
    <v-container>
  
      <v-text-field
        v-model="postBody.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
  
      <v-text-field
      v-model="postBody.password"
      type="password" name="password" autocomplete="on"
      :type="show ? 'text' : 'password'"
      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="show = !show"
      :rules="passwordRules"
      label="Пароль"
      required
    />
  
      <!-- <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox> -->
  
      
    </v-container>
  </template>

<script>
  export default {
    layout: 'empty',
    props:{
      postBody:{
        type: Object,
        required: true
      }
    },
    data: () => ({
      show: false,
      valid: true,
      password: '',
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
      email: '',
      emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        // /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "E-mail must be valid",
    ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    // methods: {
    //   validate () {
    //     this.$refs.form.validate()
    //   },
    //   reset () {
    //     this.$refs.form.reset()
    //   },
    //   resetValidation () {
    //     this.$refs.form.resetValidation()
    //   },
    // },
  }
</script>
