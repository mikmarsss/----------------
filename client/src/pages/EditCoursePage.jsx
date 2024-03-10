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
                    <div className={styles.courseBlock}>
                        <div className={styles.title}>
                            <div>
                                <img className={styles.ava} src={"http://localhost:5000/" + courseStore.course.img} alt="" />
                            </div>
                            <div className={styles.titleName}>
                                <div>
                                    <label htmlFor="name">Название</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder={courseStore.course.name}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price">Цена</label>
                                    <input
                                        type="text"
                                        id="price"
                                        placeholder={courseStore.course.price}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description">Описание</label>
                                    <textarea
                                        type="text"
                                        id="description"
                                        placeholder={courseStore.course.description}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

export default observer(EditCoursePage)