export const state = () => ({
  user: {  },
  userTemplate: {
    login: {
      title: "Ваш логин",
      value: ["male", "female"],
    },
    email: {
      title: "Ваша почта",
      value: ["male", "female"],
    },
    password: {
      title: "Пароль",
      value: ["male", "female"],
    },
    date: {
      title: "Дата регистрации",
    },
  },
});

export const getters = {
  getUserTemplate(state) {
    return state.userTemplate;
  },
  getUser(state){
    return state.user
  }
};

export const mutations = {
  updateUserData(state, tier, update) {
    state.user[tier] = update;
  },
};

export const actions = {
  async fetchCounter({ state }) {
    // make request
    const res = { data: 10 };
    state.counter = res.data;
    return res.data;
  },
};
