import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styles from '../styles/homePageManagment.module.css'
import { Context } from "..";

function HomePageManagment() {
    const { store, courseStore } = useContext(Context)


    return (
        <>
            <div className={styles.content}>
                <p className={styles.zagolovok}>Домашняя страница</p>
                <div className={styles.mainInfo}>
                    <div className={styles.ava}>
                        <div>
                            <img className={styles.photo} src={"http://localhost:5000/" + courseStore.course.img} alt="ava" />
                        </div>
                    </div>
                    <div className={styles.info}>
                        <p className={styles.name}>{courseStore.course.name}</p>
                        <p className={styles.description}>{courseStore.course.description}</p>
                    </div>
                </div>
                <div className={styles.statsContainer}>
                    <div className={styles.shortStats}>
                        <div className={styles.done_courses}>
                            <h1>{`${courseStore.course.amount_done_courses < 1000 ? courseStore.course.amount_done_courses : Math.round(courseStore.course.amount_done_courses / 1000)}`}</h1>
                            <p>Людей прошедших курс</p>
                        </div>
                        <div className={styles.done_courses}>
                            <h1>{`${courseStore.course.amount_done_modules < 1000 ? courseStore.course.amount_done_modules : Math.round(courseStore.course.amount_done_modules / 1000)}k`}</h1>
                            <p>Пройдено модулей</p>
                        </div>
                        <div className={styles.done_courses}>
                            <h1>{`${courseStore.course.amount_done_lessons < 1000 ? courseStore.course.amount_done_lessons : Math.round(courseStore.course.amount_done_lessons / 1000)}k`}</h1>
                            <p>Пройдено уроков</p>
                        </div>
                    </div>
                    <div className={styles.podrobnee}>
                        <p className={styles.fullStat}>Чтобы получить подробную информацию перейдите в раздел <button>Статистика</button></p>
                    </div>
                </div>
                <div className={styles.ratingContainer}>
                    <div className={styles.moneyAndRating}>
                        <div className={styles.done_courses}>
                            <h1>{`${Math.round((courseStore.course.price * courseStore.course.people) / 1000)}k`}</h1>
                            <p>Выручка</p>
                        </div>
                        <div className={styles.done_courses}>
                            <h1>{courseStore.course.rating}</h1>
                            <p>Средний рейтинг</p>
                        </div>
                    </div>
                </div>
                <div className={styles.status}>
                    <div className={styles.done_courses}>
                        <h1 className={`${courseStore.course.status === 'notpublished' ? styles.notpublished : styles.published}`}>{`${courseStore.course.status === 'notpublished' ? 'неопубликован' : 'опубликован'}`}</h1>
                        <p>Статус</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(HomePageManagment)