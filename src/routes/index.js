import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import {
  indexPage,
  profilePage,
  registrationPage,
  homeWorksPage,
  lessonsPage,
  marksPage,
  subjectsPage,
  coursesPage,
  coursePage,
  dialogPage,
  dialoguesPage,
  participantsPage,
  myCoursesPage,
  giftShopPage,
  testPage,
  openQuestionsPage,
  uploadFilePage,
  testingPage,
} from "../config/routesInfo"
import IndexPage from "../pages/IndexPage"
import ProfilePage from "../pages/ProfilePage"
import RegistrationPage from "../pages/RegistrationPage"
import NotFoundPage from "../pages/NotFoundPage"
import HomeWorksPage from "../pages/HomeWorksPage"
import LessonsPage from "../pages/LessonsPage"
import MarksPage from "../pages/MarksPage"
import CoursesPage from "../pages/CoursesPage"
import CoursePage from "../pages/CoursePage"
import DialogPage from "../pages/DialogPage"
import DialoguesPage from "../pages/DialoguesPage"
import ParticipantsPage from "../pages/ParticipantsPage"
import MyCoursesPage from "../pages/MyCoursesPage"
import GiftShopPage from "../pages/GiftShopPage"
import TestPage from "../pages/TestPage"
import OpenQuestionsPage from "../pages/OpenQuestionsPage"
import UploadFilePage from "../pages/UploadFilePage"
import TestingPage from "../pages/TestingPage"
import ForgotPassword from "../pages/ForgotPasswordPage"

const Router = () => {
  return (
    <>
      <Switch>
        <Route exact path={`/${indexPage.path}`} component={IndexPage} />
        <Route path={`/${profilePage.path}`} component={ProfilePage} />
        <Route
          path={`/${registrationPage.path}`}
          component={RegistrationPage}
        />
        <Route path={`/${homeWorksPage.path}`} component={HomeWorksPage} />
        <Route path={`/${lessonsPage.path}`} component={LessonsPage} />
        {
          // ignore lessonspage, dialogpage, dialoguespage, participants, testing
        }
        <Route path={`/${marksPage.path}`} component={MarksPage} />
        <Route path={`/${coursePage.path}`} component={CoursePage} />
        <Route path={`/${coursesPage.path}`} component={CoursesPage} />
        <Route path={`/${dialogPage.path}`} component={DialogPage} />
        <Route path={`/${dialoguesPage.path}`} component={DialoguesPage} />
        <Route
          path={`/${participantsPage.path}`}
          component={ParticipantsPage}
        />
        <Route path={`/${myCoursesPage.path}`} component={MyCoursesPage} />
        <Route path={`/${giftShopPage.path}`} component={GiftShopPage} />
        <Route path={`/${testPage.path}`} component={TestPage} />
        <Route
          path={`/${openQuestionsPage.path}`}
          component={OpenQuestionsPage}
        />
        <Route path={`/${uploadFilePage.path}`} component={UploadFilePage} />
        <Route path={`/${testingPage.path}`} component={TestingPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  )
}

export default Router
