import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/coursePage.module.css'
import { useParams } from "react-router-dom";
import { Context } from "..";
import { useContext, useEffect } from "react";
import CoursesService from "../service/CoursesService";

function CoursePage() {
    const [contentList, setContentList] = useState([])
    const params = useParams()
    const { store, courseStore } = useContext(Context)
    const current = params.id
    useEffect(() => {
        getCourse()
    }, [])

    async function getCourse() {
        try {
            const response = await CoursesService.fetchUserCourse(current)
            const data = response.data.course.course_content
            setContentList(data)
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>

            <Header />
            <div className={styles.container}>
                <div className={styles.courseInfo}>
                    <div className={styles.title}>
                        <button className={styles.button}>
                            {
                                courseStore.course.creator_id == store.user.id &&
                                <p>
                                    редактировать
                                </p>
                            }
                            {
                                courseStore.course.creator_id !== store.user.id &&
                                <p>
                                    Купить
                                </p>
                            }
                        </button>
                        <div className={styles.imgfield}>
                            <img className={styles.ava} src={"http://localhost:5000/" + courseStore.course.img} alt="" />
                        </div>
                        <div>
                            <h1>{courseStore.course.name}</h1>
                            <p>{courseStore.course.description}</p>
                        </div>
                    </div>
                    <div className={styles.body}>
                        <h1>На этом курсе вы изучите</h1>
                        {
                            contentList.length !== 0 &&
                            <CreateDescriptionList content={contentList} />
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

function CreateDescriptionList({ content }) {
    const parsedContent = JSON.parse(content)
    return (
        <>
            {

                parsedContent.map((item, index) => (
                    <div key={index}>
                        <li>{item.description}</li>
                    </div>
                ))

            }
        </>
    )
}

export default observer(CoursePage)