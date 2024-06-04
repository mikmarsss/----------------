import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import Header from "../components/Header";
import styles from '../styles/personalPage.module.css'
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "..";
import { LANDING_ROUTE, PROFILE_ROUTE, SETTINGS_ROUTE } from "../utils";
import ProfilePanel from "../components/ProfilePanel";

function PersonalPage() {
    const { store } = useContext(Context)
    const navigate = useNavigate()
    const logoutHandleClick = () => {
        navigate(LANDING_ROUTE)
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
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                <div className={styles.content}>
                    <ProfilePanel />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default observer(PersonalPage)