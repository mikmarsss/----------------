import Catalog from "./pages/Catalog"
import CoursesContent from "./pages/CoursesContent"
import CreateCoursesBlock from "./pages/CreateCoursesBlock"
import FreeCourses from "./pages/FreeCourses"
import Landing from "./pages/Landing"
import PersonalAccount from "./pages/PersonalAccount"
import ProfileSettings from "./pages/ProfileSettings"
import { AUTHORIZATION_PAGE, CATALOG_ROUTE, CATALOG_TRAINERS, COURSES_CONTENT, COURSE_LESSONS, COURSE_MANAGMENT, COURSE_PAGE, CREATE_ROUTE, CREATE_TRAINER, EDITCOURSE_PAGE, EDIT_LESSON, EDIT_TRAINER, FREE_COURSE, LANDING_ROUTE, MODULE_PAGE, MY_TRAINERS, PERSONAL_PAGE, PROFILE_ROUTE, SETTINGS_ROUTE, SOLVE_TRAINER, TEST_PAGE, TRAINER_PAGE } from "./utils"
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
import CreateTrainer from "./pages/CreateTrainer"
import EditTrainer from "./pages/EditTrainer"
import MyTrainers from "./pages/MyTrainers"
import CatalogTrainers from "./pages/CatalogTrainers"
import SolveTrainer from "./pages/SolveTrainer"

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
    {
        path: CREATE_TRAINER + '/:id',
        Component: CreateTrainer
    },
    {
        path: EDIT_TRAINER + '/:id',
        Component: EditTrainer
    },
    {
        path: MY_TRAINERS + '/:id',
        Component: MyTrainers
    },
    {
        path: SOLVE_TRAINER + '/:id',
        Component: SolveTrainer
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
    {
        path: CATALOG_TRAINERS,
        Component: CatalogTrainers
    },
]