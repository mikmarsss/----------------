import React, { useContext, useState } from "react";
import { profile } from "../data/coursesData";
import styles from "../styles/profileBlock.module.css"
import { Context } from "..";
import { observer } from "mobx-react-lite";

function ProfileBlock() {
    const [showProfile, setShowProfile] = useState('none')
    const handleClick = (showProfile) => {
        const shown = showProfile === 'show' ? 'none' : 'show'
        setShowProfile(shown)
    }
    const profilePoints = profile.map((item) => (
        <Grid
            name={item.name}
        />
    ))
    const { store } = useContext(Context)
    const profileName = store.user.email;
    return (
        <>
            <div className={styles.container}>
                <button className={styles.profileName} onClick={() => handleClick(showProfile)}>
                    {profileName}
                </button>
                <div className={showProfile === "show" ? styles.showsettings : styles.noneshowsettings}>
                    {profilePoints}
                </div>
            </div>
        </>
    )
}

function Grid({ name }) {
    const { store } = useContext(Context)
    return (
        <>
            <div>
                <button onClick={name === "Выход" ? () => store.logout() : null}>
                    {name}
                </button>
            </div>
        </>
    )
}


export default observer(ProfileBlock)