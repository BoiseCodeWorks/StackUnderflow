// @ts-ignore
import Auth from "./Auth.vue"
// @ts-ignore
import Login from "./Login.vue"
// @ts-ignore
import Register from "./Register.vue"

export default {
  path: '/auth',
  component: Auth,
  children: [
    {
      path: '/login',
      name: 'auth.login',
      component: Login
    },
    {
      path: '/register',
      name: 'auth.register',
      component: Register
    }
  ]
}