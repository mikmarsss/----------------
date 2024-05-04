import React, { useContext, useEffect } from "react";
import Landing from "./pages/Landing";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import "./styles/global.css"
import { Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "./routes";

function App() {
    const { store, courseStore } = useContext(Context)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth()
        }
        if (localStorage.getItem('courseId')) {
            courseStore.checkCourse(localStorage.getItem('courseId'))
        }
        if (localStorage.getItem('moduleId')) {
            courseStore.refresshModule(localStorage.getItem('moduleId'))
        }
        if (localStorage.getItem('chapterId')) {
            courseStore.fetchChapter(localStorage.getItem('chapterId'))
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