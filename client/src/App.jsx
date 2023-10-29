import React, { useContext, useEffect } from "react";
import VhodForm from "./components/VhodForm";
import Landing from "./components/Landing";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import "./styles/global.css"

function App() {
    const { store } = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    return (
        <>
            <Landing />
        </>
    )
}

export default observer(App)