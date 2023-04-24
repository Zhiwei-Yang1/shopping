import { makeAutoObservable, runInAction } from "mobx"
import { getUserInfo } from "../../api"
import user from '../user/user'

export class Home {
  loading = true
  user = user
  constructor() {
    makeAutoObservable(this)
  }
  async main() {
    const info = await this.user.init()

    runInAction(() => {
      this.loading = false
    })
  }

}

export default new Home()