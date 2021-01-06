import Axios from "axios"
import { alertTypes, showMessage } from "../ducks/alerts"
import { keys } from "ramda"
import qs from "qs"
import { signOut } from "../ducks/profile"
import { store } from "react-notifications-component"
import { NotificationManager } from "react-notifications"

Axios.defaults.validateStatus = (status) => status >= 200 && status < 500

export const authorizeRequests = (token) => {
  Axios.defaults.headers.Authorization = "Bearer " + token
}

export const unauthorizeRequests = () => {
  delete Axios.defaults.headers.Authorization
}

const pendingRequests = {}

class ApiPromise {
  _processCallbacks(list, firstResult) {
    let result = firstResult
    if (list) {
      list.forEach((cb) => (result = cb(result)))
    }
  }

  constructor(configs) {
    this._configs = configs
    this._onOkCallbacks = []
    this._onFailCallbacks = []
    this._afterAllCallbacks = []
    this._onCancelCallbacks = []
    this._onErrorCallbacks = []
    this._onStatusCallbacks = {}
    this.shouldValidate = true
  }

  onOk(callback) {
    this._onOkCallbacks.push(callback)
    return this
  }

  onFail(callback) {
    this._onFailCallbacks.push(callback)
    return this
  }

  onThrow(callback) {
    this._onErrorCallbacks.push(callback)
    return this
  }

  onCancel(callback) {
    this._onCancelCallbacks.push(callback)
    return this
  }

  onStatus(callback, ...statuses) {
    statuses.forEach((status) => {
      if (!this._onStatusCallbacks[status]) {
        this._onStatusCallbacks[status] = []
      }
      this._onStatusCallbacks[status].push(callback)
    })
    return this
  }

  afterAll(callback) {
    this._afterAllCallbacks.push(callback)
    return this
  }

  useDefaultErrorHandlers(dispatch, status) {
    this.onStatus((res) => {
      dispatch(signOut())
      return res
    }, 401)
      .onFail((res) => {
        // dispatch(showMessage("Error", alertTypes.error))
        return res
      })
      .onThrow((thrown) => {
        dispatch(showMessage("Данные не найдены!", alertTypes.error))
        return thrown
      })
    return this
  }

  skipValidation() {
    this.shouldValidate = false
    return this
  }

  startSingle(identifier) {
    const info = this._configs.method + this._configs.url + identifier
    const time = Date.now()
    if (pendingRequests[info]) {
      keys(pendingRequests[info]).map((k) => {
        pendingRequests[info][k]()
        delete pendingRequests[info][k]
      })
    }
    const res = this.start()
    this.afterAll(() => {
      delete pendingRequests[info][time]
    })
    pendingRequests[info] = { ...pendingRequests[info], [time]: res }
    return res
  }

  start() {
    const CancelToken = Axios.CancelToken
    const source = CancelToken.source()
    const config = { ...this._configs }
    config.cancelToken = source.token
    config.paramsSerializer = (params) => qs.stringify(params)
    Axios.request(config)
      .then((res) => {
        /*
        if (res.status === 400 || res.status === 403 || res.status === 401) {
          //notifier.error(res.data)
          console.log(res.data.detail)
          store.addNotification({
            title: "Ошибка",
            message: res.data.email ? res.data.email : res.data.detail,
            type: "error",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true,
            },
          })
          if (res.data.detail) {
            NotificationManager.error("Error message", res.data.detail, 3000)
          }
          alert(res.data.detail)
        }*/
        this._processCallbacks(this._onStatusCallbacks[res.status], res)
        if ((res.data && res.data.success) || !this.shouldValidate) {
          this._processCallbacks(this._onOkCallbacks, res)
        } else {
          this._processCallbacks(this._onFailCallbacks, res)
        }
        this._processCallbacks(this._afterAllCallbacks)
      })
      .catch((thrown) => {
        try {
          if (Axios.isCancel(thrown)) {
            this._processCallbacks(this._onCancelCallbacks)
          } else {
            this._processCallbacks(this._onErrorCallbacks, thrown)
          }
        } finally {
          this._processCallbacks(this._afterAllCallbacks)
        }
      })

    return source.cancel
  }
}

export const request = (configs) => {
  return new ApiPromise(configs)
}

export const apiGet = (url, params, configs) => {
  return request({ method: "GET", url, params, ...configs })
}

export const apiPost = (url, data, params, configs) => {
  return request({ method: "POST", url, data, params, ...configs })
}

export const apiPatch = (url, data, params, configs) => {
  return request({ method: "PATCH", url, data, params, ...configs })
}

export const apiPut = (url, data, params, configs) => {
  return request({ method: "PUT", url, data, params, ...configs })
}

export const apiDelete = (url, params, configs) => {
  return request({ method: "DELETE", url, params, ...configs })
}

export default Axios;