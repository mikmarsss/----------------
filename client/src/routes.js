import Catalog from "./components/Catalog"
import CreateCoursesBlock from "./components/CreateCoursesBlock"
import Landing from "./components/Landing"
import PersonalAccount from "./components/PersonalAccount"
import { CATALOG_ROUTE, CREATE_ROUTE, LANDING_ROUTE, PROFILE_ROUTE } from "./utils"

export const authRoutes = [
    {
        path: PROFILE_ROUTE + '/:id',
        Component: PersonalAccount
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