import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Header from "../components/Header";
import styles from '../styles/personalPage.module.css'
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "..";
import { CATALOG_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from "../utils";
import ProfilePanel from "../components/ProfilePanel";

function PersonalPage() {
    const { store } = useContext(Context)
    const navigate = useNavigate()
    const logoutHandleClick = () => {
        navigate(CATALOG_ROUTE)
        store.logout()
    }
    const accauntPageHandler = () => {
        navigate(PROFILE_ROUTE + `/${store.user.id}`)
    }

    const settingsPageHandler = () => {
        navigate(SETTINGS_ROUTE + `/${store.user.id}`)
    }
    return (
        <>
            <Header />
            <div className={styles.container}>
                <ProfilePanel />
            </div>
            <Footer />
        </>
    )
}

export default observer(PersonalPage)