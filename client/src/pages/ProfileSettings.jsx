import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import styles from "../styles/profileSettings.module.css"
import { Context } from "..";

function ProfileSettings() {
    const { store } = useContext(Context)
    return (
        <>
            <div>

            </div>
        </>
    )
}

export default observer(ProfileSettings)