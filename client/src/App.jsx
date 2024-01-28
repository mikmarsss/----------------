import React, { useContext, useEffect } from "react";
import Landing from "./pages/Landing";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import "./styles/global.css"
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";

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
                {store.isAuth && authRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} Component={Component} />
                )}
                {publicRoutes.map(({ path, Component }) =>
                    <Route key={path} path={path} Component={Component} />
                )}
            </Routes>
        </>
    )
}

export default observer(App)