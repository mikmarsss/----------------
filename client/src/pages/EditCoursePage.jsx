import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/editCoursePage.module.css'
import { useParams } from "react-router-dom";
import { Context } from "..";
import { useEffect } from "react";

function EditCoursePage() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    useEffect(() => {
        getCourse()
    }, [])

    async function getCourse() {
        try {
            await courseStore.fetchUserCourse(current)

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <Header />
            {
                current == courseStore.course.id &&
                <div className={styles.container}>
                    {courseStore.course.id}
                </div>
            }
            <Footer />
            <h1>
                <p>айди курса = </p>
                {courseStore.course.id}

                <p>current = </p>{current}
            </h1>

        </>
    )
}

export default observer(EditCoursePage)