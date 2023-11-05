import React, { useContext, useEffect } from "react";
import Landing from "./components/Landing";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import "./styles/global.css"
import Header from "./components/Header";
function App() {
    const { store } = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    return (
        <>
            <Header />
        </>
    )
}

export default observer(App)