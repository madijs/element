export const baseUrl1 = "https://api.shweps.elementschool.kz/"
export const baseUrl2 = "https://api.nuntius.elementschool.kz/"
export const baseUrl3 = "https://api.tabula.elementschool.kz/"
export const baseUrl4 = "https://api.element.elementschool.kz/"

export const elementStudyApi = (api, type) => {
  return baseUrl4 + "api/element-study/" + type + "/" + api + "/"
}

export const getRole = (type) => {
  return ["student", "teacher", "moderator", "curator"][type]
}

export const loginApi = baseUrl1 + "api/users/authentication/login/"
export const registerApi = baseUrl1 + "api/users/authentication/registration/"
export const triggerApi = baseUrl1 + "api/users/authentication/trigger/"
export const shwepsMyProfileApi = baseUrl1 + "api/users/myprofile/"
export const citiesApi = baseUrl1 + "api/geo/cities/"
export const countriesApi = baseUrl1 + "api/geo/countries/"
export const chatApi = baseUrl2 + "api/chat/"
export const dialoguesApi = baseUrl2 + "api/chat/dialogues/"
export const messagesApi = baseUrl2 + "api/messages/"
export const participantsApi = baseUrl2 + "api/participants/"
export const chatPhotoesApi = baseUrl2 + "api/photos/"
export const usersApi = baseUrl2 + "api/users/"
export const linesApi = baseUrl3 + "api/lines/"
export const coursesApi = baseUrl4 + "api/courses/courses/"
export const topicsApi = baseUrl4 + "api/topics/"
export const achievementsApi = baseUrl4 + "api/promo/achievements/"
export const advertisementApi = baseUrl4 + "api/promo/promo/"
export const myAchievementsApi = baseUrl4 + "api/users/profile/achievements/"
export const timetableApi = baseUrl4 + "api/groups/timetable/"
export const groupsApi = (type) => {
  return baseUrl4 + "api/groups/for-" + getRole(type) + "s/"
}
export const homeworksApi = (type) =>
  baseUrl4 + "api/homeworks/for-" + getRole(type) + "/"

export const elementUsersApi = baseUrl4 + "api/users/"
export const lessonsApi = (type) =>
  baseUrl4 + "api/lessons/for-" + getRole(type) + "/"
export const nearestLessonsApi = baseUrl4 + "api/lessons/nearest-lessons"
export const studentWorksApi = (type, api, id) =>
  baseUrl4 +
  "api/homeworks/studentworks/for-" +
  getRole(type) +
  "s/" +
  api +
  "/" +
  id +
  "/"
export const groupsAvailableApi = baseUrl4 + "api/groups/available/"
export const categoryApi = baseUrl4 + "api/courses/category/"
export const myParentsApi = baseUrl4 + "api/parents/my-parents/"
export const noTypedLessonsApi = baseUrl4 + "api/lessons/"
export const productsApi = baseUrl4 + "api/shop/products/"
export const purchasesApi = baseUrl4 + "api/shop/purchases/"
export const ordersApi = baseUrl4 + "api/orders/"
export const searchStudentWorksApi =
  baseUrl4 + "api/homeworks/studentworks/for-teahcers/"
export const changePasswordApi =
  baseUrl1 + "api/users/authentication/change-password/"
