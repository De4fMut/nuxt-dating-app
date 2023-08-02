export const state = () => ({
    profileDataTemplate: {
        gender: {
          title: ["Мужчина", "Женщина"],
          value: ["male", "female"],
        },
        targetGender: {
          title: ["Мужчина", "Женщина", "Со всеми"],
          value: ["male", "female", "both"],
        },
        purpose: {
          title: ["Флирт", "Свидание", "Отношения", "Помощь"],
          value: ["flirt", "date", "rel", "help"],
        },
        targetHeight: {
          title: ["до 170 см", "170-190 см", "от 190", "Любого"],
          value: ["<170", "170-190", "190>", "any"],
        },
        targetWeight: {
          title: ["до 60 кг", "60-80 кг", "80-100 кг", "от 100 кг", "Любого"],
          value: ["60", "60-80", "80-100", "100", "any"],
        },
        name: "",
        birthDay: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
          .toISOString()
          .substr(0, 10),
      },
  
      // Можно доработать и передавать свойства сразу со значением и заголовком
      profileData: {
        // gender: "",
        // targetGender: "",
        // purpose: "",
        // targetHeight: "",
        // targetWeight: "",
        // name: "",
        // birthDay: null,
      },
      // tier: "gender",
      // i: 0
  })
  
  export const getters = {
    getProfileDataTemplate(state){
      return state.profileDataTemplate
    },
    getProfileData(state){
      return state.profileData
    }
  }
  
  export const mutations = {
    // increment(state) {
    //   state.i++
    // },
    // nextTier(state){
    //     state.i++;
    //     state.tier = Object.keys(state.profileDataTemplate)[state.i]
    // },
    chooseGender(state, index){
        state.profileData.gender = state.profileDataTemplate.gender.value[index]
        console.log(index)
      },
      setProfile(state, data){
        state.profileData = data
      },
      updateProfileData(state, data){
        state.profileData[data.tier] = data.upd
        console.log(state.profileData[data.tier])
        console.log(data.upd + ' here')
      }
  }
  
  export const actions = {
    async fetchCounter({ state }) {
      // make request
      const res = { data: 10 };
      state.counter = res.data;
      return res.data;
    },
    async setProfileData({commit}, data){
      await commit('setProfile', data)
    }
  }