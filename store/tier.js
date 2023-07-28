// export const state = () =>({
//     tier: "gender",
//     i: 0,
//     array: []
// })

// export const getters = {
//     getTier(state){
//         return state.tier
//     },
//     getCounter(state) {
//           return state.i
//         },
//     getTotalArray(state){
//         return state.array
//     }
// }

// export const mutations = {
//     nextTierMutation(state, getters){
//         state.i++;
//         state.tier = getters.getTotalArray[state.i]
//     },
//     setTotalArray(state, getters, rootState, rootGetters){
//         state.array = rootGetters['user/getUserTemplate']
//     }
// }

// export const actions = {
//     nextTier({commit, rootGetters}){
//         commit('nextTierMutation', rootGetters[''])
//     }
// }


// Перенести всю эту чушь в локальные данные компонента и проверить работоспособность если не сработает воспользоваться форм генератором