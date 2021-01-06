import { baseUrl1 } from "../config/apiUrls"
export const coalesce = (...data) => {
  for (let i = 0; i < data.length; i++) {
    const cur = data[i]
    if (cur !== undefined && cur !== null && cur) {
      return cur
    }
  }
  return null
}
export const deleteMinuses = (str) => {
  let temp = ""
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== "-") {
      temp += str[i]
    }
  }
  return temp
}
// https://shweps/media/users/avatars/Koala.jpg
export const transAvatarUrl = (url) => {
  console.log(url)
  const y = url.split("//")
  const z = y[1].split("/")
  let res = baseUrl1
  z.map((q, i) => {
    if (i === 0) return
    res += q + "/"
  })
  console.log(res)
  return res
}
