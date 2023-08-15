export default function({ $auth, redirect }) {
  if(!this.$auth.loggedIn) {
    redirect('/login');
  }
}