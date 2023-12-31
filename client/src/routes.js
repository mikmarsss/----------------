import Catalog from "./components/Catalog"
import CreateCoursesBlock from "./components/CreateCoursesBlock"
import Landing from "./components/Landing"
import PersonalAccount from "./components/PersonalAccount"
import ProfileSettings from "./pages/ProfileSettings"
import { CATALOG_ROUTE, CREATE_ROUTE, LANDING_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from "./utils"

export const authRoutes = [
    {
        path: PROFILE_ROUTE + '/:username',
        Component: PersonalAccount
    },
    {
        path: SETTINGS_ROUTE + '/:username',
        Component: ProfileSettings
    }
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