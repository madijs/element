import { canAdministrate } from "./permissions"

export const RouteInfo = (path, ...permissions) => {
  return { path: path, permissions: permissions }
}

export const indexPage = RouteInfo("", canAdministrate)
export const profilePage = RouteInfo("profile", canAdministrate)
export const registrationPage = RouteInfo("registration", canAdministrate)
export const homeWorksPage = RouteInfo("home-works", canAdministrate)
export const lessonsPage = RouteInfo("lessons", canAdministrate)
export const marksPage = RouteInfo("marks", canAdministrate)
export const coursePage = RouteInfo("course", canAdministrate)
export const coursesPage = RouteInfo("courses", canAdministrate)
export const dialogPage = RouteInfo("dialog", canAdministrate)
export const dialoguesPage = RouteInfo("dialogues", canAdministrate)
export const participantsPage = RouteInfo("participants", canAdministrate)
export const myCoursesPage = RouteInfo("my-courses", canAdministrate)
export const giftShopPage = RouteInfo("gift-shop", canAdministrate)
export const testPage = RouteInfo("test", canAdministrate)
export const openQuestionsPage = RouteInfo("open-questions", canAdministrate)
export const uploadFilePage = RouteInfo("upload-file", canAdministrate)
export const testingPage = RouteInfo("testing", canAdministrate)
