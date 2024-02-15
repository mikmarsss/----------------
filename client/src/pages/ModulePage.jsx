import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { useEffect } from "react";

function ModulePage() {
    const { store, courseStore } = useContext(Context)


    useEffect(() => {
        let moduleId = localStorage.getItem('moduleId')
        console.log(moduleId)
        courseStore.fetchCourseModule(moduleId)
    }, [])

    return (
        <>

        </>
    )
}

export default observer(ModulePage)