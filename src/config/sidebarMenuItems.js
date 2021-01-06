import {
  indexPage,
  profilePage,
  homeWorksPage,
  coursesPage,
  myCoursesPage,
  marksPage,
  giftShopPage,
} from "./routesInfo"

export const SidebarMenuItem = (route, title, icon, onSelect) => {
  return {
    route: route,
    title: title,
    icon: icon,
    onSelect: onSelect,
  }
}

export const sidebarMenuItems = [
  SidebarMenuItem(indexPage, "Главная", "home"),
  SidebarMenuItem(profilePage, "Личная страница", "student"),
  SidebarMenuItem(homeWorksPage, "Домашние задания", "reading"),
  SidebarMenuItem(myCoursesPage, "Мои курсы", "book"),
  SidebarMenuItem(marksPage, "Достижения", "marks"),
  SidebarMenuItem(coursesPage, "Курсы", "courses"),
  SidebarMenuItem(giftShopPage, "Магазин подарков", "gift"),
]
