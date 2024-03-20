import React, { useContext, useEffect } from "react";
import styles from '../styles/editLesson.module.css'
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from "..";
import { useParams } from "react-router-dom";


function EditLesson() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    console.log(current)
    // useEffect(() => {
    //     courseStore.fetchLesson(current)
    // })
    return (
        <>
            <Header />
            {
                // current === courseStore.lesson.id &&
                // <>
                //     <div>
                //         <h1>ВСе норм</h1>
                //     </div>
                // </>
            }
            <Footer />
        </>
    )
}

export default observer(EditLesson)