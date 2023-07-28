export default function ({ $axios, $auth }) {
  $axios.onRequest((config) => {
    if ($auth.loggedIn) {
      config.headers.common.Authorization = `Bearer ${$auth.getToken('local')}`
    }
  })
  }