import React, { useContext, useEffect } from "react";
import Landing from "./components/Landing";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import "./styles/global.css"
import Header from "./components/Header";
import PersonalAccount from "./components/PersonalAccount";
function App() {
    const { store } = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    return (
        <>
            <PersonalAccount />
        </>
    )
}

export default observer(App)