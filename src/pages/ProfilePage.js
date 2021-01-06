import React, { useState, useEffect, useRef } from "react"
import { useHistory } from "react-router-dom"
import {
  Input,
  Button,
  Checkbox,
  Radio,
  Select,
  Dropdown,
} from "semantic-ui-react"
import { useDispatch, useSelector } from "react-redux"
import { apiGet, apiPost, apiPut } from "../utils/apiConnector"
import {
  elementUsersApi,
  citiesApi,
  countriesApi,
  shwepsMyProfileApi,
  myParentsApi,
  changePasswordApi,
} from "../config/apiUrls"
import {
  getElementProfileInformation,
  saveProfileToStorage,
  getProfileInformation,
} from "../ducks/profile"
import ProfileComponent from "../components/ProfileComponent"
import ParentsComponent from "../components/ParentsComponent"
import PurchaseStoryComponent from "../components/PurchaseStoryComponent"

const ProfilePage = (props) => {
  const dispatch = useDispatch()
  const [hf, setHf] = useState(null)
  const callback = () => {}
  const hiddenFileInput = useRef(null)
  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0]
    setHf(fileUploaded)
    // props.handleFile(fileUploaded)
  }
  const onGetElementProfileInformation = () => {
    dispatch(getElementProfileInformation(onSaveProfileToStorage))
  }
  const onGetProfileInformation = () => {
    dispatch(getProfileInformation(onSaveProfileToStorage))
  }
  const onSaveProfileToStorage = () => {
    dispatch(saveProfileToStorage())
  }
  const getParents = () => {
    const type = profile.elementProfile ? profile.elementProfile.type : -1
    if (type === -1) return
    apiGet(myParentsApi, {})
      .onStatus((res) => {
        console.log(res.data)
        setParents(res.data)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getCountries = () => {
    apiGet(countriesApi, {})
      .onStatus((res) => {
        setCountries(res.data.results)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const getCities = () => {
    apiGet(citiesApi, {})
      .onStatus((res) => {
        setCities(res.data.results)
      }, 200)
      .onFail(() => {})
      .afterAll(() => {})
      .startSingle()
  }
  const [parents, setParents] = useState([])
  const [pageState, setPageState] = useState(0)
  const [cities, setCities] = useState([])
  const [countries, setCountries] = useState([])
  const [adding, setAdding] = useState(false)
  const { profile } = useSelector((state) => ({
    profile: state.profile,
  }))
  const [lastName, setLastName] = useState(
    profile.elementProfile
      ? profile.elementProfile.last_name !== "not_giiven"
        ? profile.elementProfile.last_name
        : ""
      : "",
  )
  const [name, setName] = useState(
    profile.elementProfile
      ? profile.elementProfile.first_name !== "not_giiven"
        ? profile.elementProfile.first_name
        : ""
      : "",
  )
  const [birthDate, setBirthDate] = useState(
    profile.elementProfile
      ? profile.elementProfile.birth_date
        ? profile.elementProfile.birth_date
        : ""
      : "",
  )
  const [email, setEmail] = useState(
    profile.elementProfile
      ? profile.elementProfile.email
        ? profile.elementProfile.email
        : ""
      : "",
  )
  const [phone, setPhone] = useState(
    profile.elementProfile
      ? profile.elementProfile.phone
        ? profile.elementProfile.phone
        : ""
      : "",
  )
  const [country, setCountry] = useState(
    profile.elementProfile
      ? countries.filter((q) => q.name === profile.elementProfile.country_name)
          .length > 0
        ? countries.filter(
            (q) => q.name === profile.elementProfile.country_name,
          )[0].id
        : 0
      : 0,
  )
  const [city, setCity] = useState(
    profile.elementProfile
      ? cities.filter((q) => q.name === profile.elementProfile.city_name)
          .length > 0
        ? cities.filter((q) => q.name === profile.elementProfile.city_name)[0]
            .id
        : 0
      : 0,
  )
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [parentLastNameInput, setParentLastNameInput] = useState("")
  const [parentFirstNameInput, setParentFirstNameInput] = useState("")
  const [parentEmailInput, setParentEmailInput] = useState("")
  const [parentNumberInput, setParentNumberInput] = useState("")
  const setPassword = () => {
    if (newPassword) {
      apiPost(changePasswordApi, {
        old_password: oldPassword,
        new_password: newPassword,
      })
        .onStatus(
          (res) => {
            console.log(res)
          },
          200,
          406,
        )
        .onFail(() => {})
        .afterAll(() => {})
        .startSingle()
    }
  }
  const setProfile = () => {
    const uuid = profile
      ? profile.elementProfile
        ? profile.elementProfile.id
        : ""
      : ""
    if (uuid) {
      const formData = new FormData()
      formData.append("user_id", uuid)
      formData.append("email", email)
      if (lastName !== profile.elementProfile.last_name && lastName !== "") {
        formData.append("last_name", lastName)
      }
      if (name !== profile.elementProfile.first_name && name !== "") {
        formData.append("first_name", name)
      }
      if (birthDate !== profile.elementProfile.birth_date && birthDate !== "") {
        formData.append("birth_date", birthDate)
      }
      if (phone !== profile.elementProfile.phone && phone !== "") {
        formData.append("phone", phone)
      }
      if (country !== profile.elementProfile.country && country !== 0) {
        formData.append("country", parseInt(country))
      }
      if (city !== profile.elementProfile.city && city !== 0) {
        formData.append("city", parseInt(city))
      }
      if (country !== profile.elementProfile.country && country !== 0) {
        if (countries.filter((q) => q.id === parseInt(country)).length) {
          formData.append(
            "country_name",
            countries.filter((q) => q.id === parseInt(country))[0].name,
          )
        }
      }
      if (city !== profile.elementProfile.city && city !== 0) {
        if (cities.filter((q) => q.id === parseInt(country)).length) {
          formData.append(
            "city_name",
            cities.filter((q) => q.id === parseInt(country)[0].name),
          )
        }
      }
      if (hf) {
        formData.append("avatar", hf)
      }
      console.log(formData)
      setPassword()
      apiPut(shwepsMyProfileApi, formData)
        .onStatus((res) => {
          console.log(res)
          onGetElementProfileInformation()
          onGetProfileInformation()
        }, 200)
        .onFail(() => {})
        .afterAll(() => {})
        .startSingle()
    }
  }
  const submitParents = () => {
    parents.map((q) => {
      apiPut(myParentsApi + q.id, q)
        .onStatus(() => {}, 200)
        .onFail(() => {})
        .afterAll(() => {})
        .startSingle()
    })
    if (adding) {
      apiPost(myParentsApi, {
        first_name: parentFirstNameInput,
        last_name: parentLastNameInput,
        phone: parentNumberInput,
        email: parentEmailInput,
      })
    }
  }
  useEffect(() => {
    getCities()
    getCountries()
    getParents()
    return () => {}
  }, [])
  return (
    <>
      <div>
        <div style={{ marginLeft: 170, marginTop: 90, width: 840 }}>
          <p style={{ color: "#005cff", fontSize: 24, fontWeight: 600 }}>
            Редактировать профиль
          </p>
          <div style={{ marginTop: 20, display: "flex" }}>
            <div
              style={{ cursor: "pointer" }}
              onMouseEnter={(e) => {
                e.target.style.opacity = 0.7
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = 1
              }}
            >
              <p
                style={{
                  color: pageState === 0 ? "#005cff" : "#c2cfe0",
                  fontSize: 16,
                  marginBottom: 4,
                }}
                onClick={(e) => {
                  setPageState(0)
                }}
              >
                Личный профиль
              </p>
              <div
                style={{
                  border:
                    "1px solid" + (pageState === 0 ? "#005cff" : "#c2cfe0"),
                  marginBottom: -2,
                }}
              ></div>
            </div>
            <div
              style={{
                cursor: "pointer",
                display: profile.elementProfile
                  ? profile.elementProfile.type === 0
                    ? ""
                    : "none"
                  : "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = 0.7
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = 1
              }}
            >
              <p
                style={{
                  marginLeft: 40,
                  marginRight: 40,
                  color: pageState === 1 ? "#005cff" : "#c2cfe0",
                  fontSize: 16,
                  marginBottom: 4,
                }}
                onClick={(e) => {
                  setPageState(1)
                }}
              >
                Информация о родителях
              </p>
              <div
                style={{
                  border:
                    "1px solid" + (pageState === 1 ? "#005cff" : "#c2cfe0"),
                  marginBottom: -2,
                }}
              ></div>
            </div>
            <div
              style={{
                cursor: "pointer",
                display: profile.elementProfile
                  ? profile.elementProfile.type === 0
                    ? ""
                    : "none"
                  : "none",
              }}
              onMouseEnter={(e) => {
                e.target.style.opacity = 0.7
              }}
              onMouseLeave={(e) => {
                e.target.style.opacity = 1
              }}
            >
              <p
                style={{
                  color: pageState === 2 ? "#005cff" : "#c2cfe0",
                  fontSize: 16,
                  marginBottom: 4,
                }}
                onClick={(e) => {
                  setPageState(2)
                }}
              >
                История покупок
              </p>
              <div
                style={{
                  border:
                    "1px solid" + (pageState === 2 ? "#005cff" : "#c2cfe0"),
                  marginBottom: -2,
                }}
              ></div>
            </div>
          </div>
          <div
            style={{
              width: 840,
              border: "1px solid #c2cfe0",
            }}
          ></div>
          <div style={{ display: "flex" }}>
            <div style={{ width: 150 }}>
              <div style={{ marginTop: 40 }}></div>
              <div
                style={{
                  width: 140,
                  height: 140,
                  backgroundColor: "#dddddd",
                  borderRadius: 70,
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                {profile.shwepsProfile ? (
                  profile.shwepsProfile.avatar ? (
                    <>
                      <img
                        src={profile.shwepsProfile.avatar}
                        style={{
                          width: 140,
                          height: 140,
                          backgroundColor: "#dddddd",
                          borderRadius: 70,
                          position: "absolute",
                          zIndex: 80,
                        }}
                      />
                    </>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#00aaf4",
                    cursor: "pointer",
                    position: "relative",
                    zIndex: 90,
                    bottom: 0,
                    right: 0,
                  }}
                  onMouseEnter={(e) => {
                    console.log(e)
                    e.target.style.opacity = 0.7
                  }}
                  onMouseLeave={(e) => {
                    console.log(e)
                    e.target.style.opacity = 1
                  }}
                  onClick={handleClick}
                >
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={handleChange}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
            <div style={{ width: 690 }}>
              <div style={{ marginTop: 40 }}></div>
              <ProfileComponent
                pageState={pageState}
                setPageState={setPageState}
                lastName={lastName}
                setLastName={setLastName}
                name={name}
                setName={setName}
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                countries={countries}
                setCountries={setCountries}
                country={country}
                setCountry={setCountry}
                cities={cities}
                setCities={setCities}
                city={city}
                setCity={setCity}
                newPassword={newPassword}
                setNewPassword={setNewPassword}
                oldPassword={oldPassword}
                setOldPassword={setOldPassword}
                setProfile={setProfile}
              />
              <ParentsComponent
                pageState={pageState}
                setPageState={setPageState}
                parentFirstNameInput={parentFirstNameInput}
                setParentFirstNameInput={setParentFirstNameInput}
                parentLastNameInput={parentLastNameInput}
                setParentLastNameInput={setParentLastNameInput}
                parentEmailInput={parentEmailInput}
                setParentEmailInput={setParentEmailInput}
                parentNumberInput={parentNumberInput}
                setParentNumberInput={setParentNumberInput}
                parents={parents}
                setParents={setParents}
                adding={adding}
                setAdding={setAdding}
                submitParents={submitParents}
              />
              <PurchaseStoryComponent />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfilePage
