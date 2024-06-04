import Catalog from "./pages/Catalog"
import CoursesContent from "./pages/CoursesContent"
import CreateCoursesBlock from "./pages/CreateCoursesBlock"
import FreeCourses from "./pages/FreeCourses"
import Landing from "./pages/Landing"
import PersonalAccount from "./pages/PersonalAccount"
import ProfileSettings from "./pages/ProfileSettings"
import { AUTHORIZATION_PAGE, CATALOG_ROUTE, COURSES_CONTENT, COURSE_LESSONS, COURSE_MANAGMENT, COURSE_PAGE, CREATE_ROUTE, EDITCOURSE_PAGE, EDIT_LESSON, FREE_COURSE, LANDING_ROUTE, MODULE_PAGE, PERSONAL_PAGE, PROFILE_ROUTE, SETTINGS_ROUTE, TEST_PAGE, TRAINER_PAGE } from "./utils"
import CourseLessons from "./pages/CourseLessons"
import CoursePage from "./pages/CoursePage"
import ModulePage from "./pages/ModulePage"
import EditCoursePage from "./pages/EditCoursePage"
import TestPage from "./pages/TestPage"
import EditLesson from "./pages/EditLesson"
import PersonalPage from "./pages/PersonalPage"
import Authorization from "./pages/Authorization"
import CourseManagment from "./pages/CourseManagment"
import TrainerPage from "./pages/TrainerPage"

export const authRoutes = [
    {
        path: PROFILE_ROUTE + '/:id',
        Component: PersonalAccount
    },
    {
        path: COURSE_MANAGMENT + '/:id',
        Component: CourseManagment
    },
    {
        path: SETTINGS_ROUTE + '/:id',
        Component: ProfileSettings
    },
    {
        path: FREE_COURSE,
        Component: FreeCourses
    },
    {
        path: COURSES_CONTENT + '/:id',
        Component: CoursesContent
    },
    {
        path: COURSE_LESSONS,
        Component: CourseLessons
    },
    {
        path: COURSES_CONTENT + '/:id' + MODULE_PAGE + '/:id',
        Component: ModulePage
    },
    {
        path: COURSE_PAGE + '/:id',
        Component: CoursePage
    },
    {
        path: EDITCOURSE_PAGE + '/:id',
        Component: EditCoursePage
    },
    {
        path: TEST_PAGE + '/:id',
        Component: TestPage
    },
    {
        path: COURSES_CONTENT + '/:id' + MODULE_PAGE + '/:id' + EDIT_LESSON + '/:id',
        Component: EditLesson
    },
    {
        path: PERSONAL_PAGE + '/:id',
        Component: PersonalPage
    },
]

export const publicRoutes = [
    {
        path: LANDING_ROUTE,
        Component: Landing
    },
    {
        path: CATALOG_ROUTE,
        Component: Catalog
    },
    {
        path: CREATE_ROUTE,
        Component: CreateCoursesBlock
    },
    {
        path: AUTHORIZATION_PAGE,
        Component: Authorization
    },
    {
        path: TRAINER_PAGE,
        Component: TrainerPage
    },
]