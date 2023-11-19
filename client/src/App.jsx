import React, { useContext, useEffect } from "react";
import Landing from "./components/Landing";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import "./styles/global.css"
import Header from "./components/Header";
import PersonalAccount from "./components/PersonalAccount";
import Catalog from "./components/Catalog";
import { Route, Routes } from "react-router-dom";
import CourseBlock from "./components/CourseBlock";
function App() {
    const { store } = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
    }, [])

    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/persacc" element={<PersonalAccount />} />
                <Route path="/catalog" element={<Catalog />} />
            </Routes>
        </>
    )
}

export default observer(App)