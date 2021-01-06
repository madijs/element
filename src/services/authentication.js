import Axios from "../utils/apiConnector"
import { baseUrl1 } from "../config/apiUrls"

export default class AuthService {

  async postResource(url,payload){
      const res = Axios.post(url,payload).then(res=>res)
      return res
  }

  async forgotPasswordService(email){
    const payload = {
      email
    }
    const result = this.postResource(`${baseUrl1}api/users/authentication/trigger/`,payload)
    return result
  }

}