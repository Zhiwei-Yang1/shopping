import { makeAutoObservable, runInAction } from "mobx"
import { getUserInfo, reqLogin } from "../../api"

export class User {
  info = {}
  isAdmin = false

  constructor() {
    makeAutoObservable(this)
  }

  async init() {
    const info = await getUserInfo()

    runInAction(() => {
      this.info = info
      this.isAdmin = info.isAdmin
    })

    return info
  }


  async login(username, password) {
    const response = await reqLogin({ username, password })

    return response
  }
}
export default new User()