import React, { useContext } from "react";
import { observer } from 'mobx-react-lite'
import styles from "../styles/profilepanel.module.css"
import { Context } from "..";
import { useNavigate } from 'react-router-dom'
import { COURSE_PAGE, TEST_PAGE } from "../utils";
import arrow from '../Images/Arrow.svg'

function HomePageProfile() {
    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const { store, courseStore } = useContext(Context)
    const navigate = useNavigate()

    const testHandler = () => {
        navigate(TEST_PAGE + `/${store.user.id}`)
    }

    const courseHandler = () => {
        navigate(COURSE_PAGE + `/${localStorage.getItem('courseId')}`)

    }

    return (
        <>
            <div className={`${styles.homePageContainer} ${styles.glass}`}>
                <div className={styles.learnStat}>
                    <p>Статистика</p>
                    <div className={styles.statValues}>
                        <div className={styles.done_courses}>
                            <h1>{digits.includes(store.user.user_done_courses) && 0}{store.user.user_done_courses}</h1>
                            <p>Пройденные курсы</p>
                        </div>
                        <div className={styles.done_courses}>
                            <h1>{digits.includes(store.user.user_done_courses) && 0}{store.user.user_done_lessons}</h1>
                            <p>Пройденные уроки</p>
                        </div>
                        <div className={styles.done_courses}>
                            <h1>{digits.includes(store.user.user_done_courses) && 0}{store.user.user_done_tasks}</h1>
                            <p>Решенные задачи</p>
                        </div>
                    </div>
                </div>
                <button onClick={courseHandler} className={styles.continuecourse}>
                    <div className={styles.activeCourse}>
                        <p>Сейчас прохожу</p>
                        <div className={styles.mainCourse}>
                            <div className={styles.courseInfo}>
                                <div className={styles.courseName}>
                                    {
                                        courseStore.course.name
                                    }
                                </div>
                                <div className={styles.courseDescription}>
                                    {
                                        courseStore.course.description
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </button>
                <div className={styles.recomendCourses}>
                    <p>Рекомендации</p>
                    {
                        <>
                            <div>
                                <p className={styles.recText}>{store.user.test_result}</p>
                            </div>

                        </>
                    }
                    {
                        !store.user.test_result &&
                        <>
                            <div className={styles.recomendation}>
                                <p>Чтобы получить рекомендации по обучении пройдите тест</p>
                                <button onClick={testHandler}>Пройти тест</button>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default observer(HomePageProfile)