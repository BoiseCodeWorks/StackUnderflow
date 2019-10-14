import { auth, toastError, toast } from '../utils'
import { EventEmitter } from "./EventEmitter"

class AuthService extends EventEmitter {
  setUser(user = {}) {
    this.user = user
    this.notify(SETUSER)
  }
  async register(payload) {
    let res = await auth.post('register', payload)
    this.setUser(res.data)
  }
  async login(user) {
    let res = await auth.post('login', user)
    this.setUser(res.data)
  }
  async logout() {
    let res = await auth.delete('logout')
    location.reload()
  }
  async authenticate() {
    let res = await auth.get('authenticate')
    this.setUser(res.data)
  }
}

export const authService = new AuthService()

export const SETUSER = "SETUSER"