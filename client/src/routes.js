import Catalog from "./pages/Catalog"
import ChooseCourse from "./pages/ChooseCourse"
import CoursesContent from "./pages/CoursesContent"
import CreateCoursesBlock from "./pages/CreateCoursesBlock"
import FreeCourses from "./pages/FreeCourses"
import Landing from "./pages/Landing"
import PayCourses from "./pages/PayCourses"
import PersonalAccount from "./pages/PersonalAccount"
import ProfileSettings from "./pages/ProfileSettings"
import { CATALOG_ROUTE, CHOOSE_COURSE, COURSES_CONTENT, COURSE_LESSONS, COURSE_PAGE, CREATE_ROUTE, FREE_COURSE, LANDING_ROUTE, MODULE_PAGE, PAY_COURSE, PROFILE_ROUTE, SETTINGS_ROUTE } from "./utils"
import CourseLessons from "./pages/CourseLessons"
import CoursePage from "./pages/CoursePage"
import ModulePage from "./pages/ModulePage"

export const authRoutes = [
    {
        path: PROFILE_ROUTE + '/:id',
        Component: PersonalAccount
    },
    {
        path: SETTINGS_ROUTE + '/:id',
        Component: ProfileSettings
    },
    {
        path: CHOOSE_COURSE,
        Component: ChooseCourse
    },
    {
        path: FREE_COURSE,
        Component: FreeCourses
    },
    {
        path: PAY_COURSE,
        Component: PayCourses
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

]