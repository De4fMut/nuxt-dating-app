export default function({ store, redirect }) {
  if(Object.keys(store.state.user).length < 1) {
    redirect('/?message=noUser');
  }
}