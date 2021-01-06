import { createAction, handleActions } from "redux-actions"
import Store from "store"
import {
  apiPost,
  authorizeRequests,
  unauthorizeRequests,
  apiGet,
} from "../utils/apiConnector"
import {
  loginApi,
  registerApi,
  usersApi,
  elementUsersApi,
  myAchievementsApi,
  shwepsMyProfileApi,
} from "../config/apiUrls"
import { alertTypes, showMessage } from "./alerts"
import { NotificationManager } from "react-notifications"
import { call } from "ramda"

const storeKey = "profile"

const saveProfile = (profile) => {
  Store.set(storeKey, profile)
}

const loadProfile = () => {
  return Store.get(storeKey)
}

const deleteProfile = () => {
  Store.remove(storeKey)
}

// Default state
const defaultState = {
  signedIn: false,
  permissions: [],
  login: null,
  token: null,
  errMsg: "",
  scssMsg: "",
  profile: {},
  elementProfile: {},
  achievements: [],
  points: 0,
  shwepsProfile: {},
}

// Action Creators
/// unauthorize()
const unauthorize = createAction("UNAUTHORIZE")
/// authorize(id, login, permissions, stores, token)
const authorize = createAction("AUTHORIZE", (email, token) => ({
  email,
  token,
}))
/// restoreProfile(profile)
const restoreProfile = createAction("RESTORE_PROFILE")
/// setCurrentStore(id)
const isOwner = createAction("IS_OWNER")
const saveErrMsg = createAction("SAVE_ERROR_MESSAGE")
const saveScssMsg = createAction("SAVE_SCSS_MESSAGE")
const setProfileInformation = createAction("SET_PROFILE_INFORMATION")
const setElementProfileInformation = createAction(
  "SET_ELEMENT_PROFILE_INFORMATION",
)
const setShwepsProfileInformation = createAction(
  "SET_SHWEPS_PROFILE_INFORMATION",
)
const setAchievements = createAction("SET_ACHIEVEMENTS")
const setPoints = createAction("SET_POINTS")

// Reducer
const reducer = handleActions(
  {
    [unauthorize]: (state, action) => ({ ...defaultState }),
    [authorize]: (state, { payload }) => ({
      ...payload,
      signedIn: true,
    }),
    [restoreProfile]: (state, { payload }) => ({ ...state, ...payload }),
    [isOwner]: (state, { payload }) => ({
      ...state,
      owner: { ...payload },
    }),
    [saveErrMsg]: (state, { payload }) => ({
      ...state,
      errMsg: payload,
    }),
    [saveScssMsg]: (state, { payload }) => ({
      ...state,
      scssMsg: payload,
    }),
    [setProfileInformation]: (state, { payload }) => ({
      ...state,
      profile: payload,
    }),
    [setElementProfileInformation]: (state, { payload }) => ({
      ...state,
      elementProfile: payload,
    }),
    [setShwepsProfileInformation]: (state, { payload }) => ({
      ...state,
      shwepsProfile: payload,
    }),
    [setAchievements]: (state, { payload }) => ({
      ...state,
      achievements: payload,
    }),
    [setPoints]: (state, { payload }) => ({ ...state, points: payload }),
  },
  defaultState,
)
export default reducer

// Thunk

export const exportSaveErrMsg = (text) => {
  return (dispatch) => dispatch(saveErrMsg(text))
}

export const exportSaveScssMsg = (text) => {
  return (dispatch) => {
    if (!text) {
      dispatch(isOwner(false))
    }
    dispatch(saveScssMsg(text))
  }
}

export const restoreSession = () => {
  // eslint-disable-next-line no-empty-pattern
  return (dispatch, {}) => {
    const profile = loadProfile()
    if (profile) {
      authorizeRequests(profile.token)
      dispatch(restoreProfile(profile))
    }
  }
}

export const signIn = (email, password, callback) => {
  const mac_address = "00-00-00-00-00-00"
  return (dispatch, getState) => {
    return apiPost(loginApi, { email, password, mac_address })
      .onStatus(
        (res) => {
          console.log(res)
          if (res.status === 400) {
            console.log(res)
            let error = ""
            if (res.data.email) {
              error = res.data.email[0]
            }
            if (res.data.non_field_errors) {
              error = res.data.non_field_errors[0]
            }
            if (error) {
              NotificationManager.error("Error message", error, 3000)
            }
            return
          }
          let loading = false
          const save = () => {
            saveProfile(getState().profile)
          }
          const { token } = res.data
          authorizeRequests(token)
          dispatch(authorize(email, token))
          dispatch(getShwepsProfileInformation(save))
          dispatch(getProfileInformation(save))
          dispatch(getElementProfileInformation(save))
          dispatch(getMyAchievements(save))
          saveProfile(getState().profile)
        },
        200,
        400,
        401,
        403,
      )
      .onFail((res) => {
        dispatch(showMessage(JSON.stringify(res.data), alertTypes.error))
      })
      .afterAll((res) => {
        callback()
      })
      .startSingle()
  }
}

export const signOut = () => {
  // eslint-disable-next-line no-empty-pattern
  return (dispatch, {}) => {
    unauthorizeRequests()
    deleteProfile()
    dispatch(unauthorize())
  }
}

export const register = (data, history) => {
  // eslint-disable-next-line no-empty-pattern
  return (dispatch, {}) => {
    apiPost(registerApi, data)
      .onStatus(
        () => {
          dispatch(
            showMessage("Регистрация прошла успешно!", alertTypes.success),
          )
          history.push("/")
        },
        200,
        201,
      )
      .onFail((res) => {
        dispatch(showMessage(res.data.response, alertTypes.error))
      })
      .startSingle()
  }
}

export const getProfileInformation = (callback) => {
  return (dispatch, {}) => {
    apiGet(usersApi + "myprofile/", {})
      .onStatus((res) => {
        dispatch(setProfileInformation(res.data))
        callback()
      }, 200)
      .onFail((res) => {})
      .afterAll(() => {})
      .startSingle()
  }
}

export const getShwepsProfileInformation = (callback) => {
  return (dispatch, {}) => {
    apiGet(shwepsMyProfileApi, {})
      .onStatus((res) => {
        dispatch(setShwepsProfileInformation(res.data))
        callback()
      }, 200)
      .onFail((res) => {})
      .afterAll(() => {})
      .startSingle()
  }
}

export const getElementProfileInformation = (callback) => {
  return (dispatch, {}) => {
    apiGet(elementUsersApi + "myprofile/", {})
      .onStatus((res) => {
        console.log(res.data)
        dispatch(setElementProfileInformation(res.data))
        callback()
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
}

export const getMyAchievements = (callback) => {
  return (dispatch, {}) => {
    apiGet(myAchievementsApi, {})
      .onStatus((res) => {
        console.log(res.data)
        dispatch(setAchievements(res.data.achievements))
        dispatch(setPoints(res.data.points))
        callback()
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
}

export const saveProfileToStorage = () => {
  console.log(3)
  return (dispatch, getState) => {
    console.log(4)
    saveProfile(getState().profile)
  }
}
