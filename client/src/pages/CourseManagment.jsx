import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/courseManagment.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { Context } from "..";
import HomePageManagment from "../components/HomePageManagment";
import StatsManagment from "../components/StatsManagment";

function CourseManagment() {
    const { store, courseStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    const [menu, setMenu] = useState('home')
    const menuHandler = (v) => {
        setMenu(v)
    }

    return (
        <>
            <Header />
            {
                current == courseStore.course.id &&
                <div className={styles.conatainer1}>
                    <div className={styles.container}>
                        <div className={styles.navmenu}>
                            <div className={styles.ava}>
                                <div>
                                    <img className={styles.photo} src={"http://localhost:5000/" + courseStore.course.img} alt="ava" />
                                </div>
                                <div className={styles.username}>
                                    {courseStore.course.name}
                                </div>
                            </div>
                            <div className={styles.navpanel}>
                                <label htmlFor="main">Основное</label>
                                <div className={styles.main} id="main">
                                    <button onClick={() => menuHandler('home')}>Домашняя страница</button>
                                    <button onClick={() => menuHandler('stats')}>Статистика</button>
                                    <button onClick={() => menuHandler('settings')}>Настройки</button>
                                </div>
                                <label htmlFor="courses">Монетизация</label>
                                <div id="courses" className={styles.courses}>
                                    <button onClick={() => menuHandler('moneytStats')}>Статистика</button>
                                    <button onClick={() => menuHandler('moneySettings')}>Настройки курсы</button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <ShowInfo menu={menu} />
                        </div>
                    </div>
                </div>
            }
            <Footer />
        </>
    )
}

const ShowInfo = observer(({ menu, page }) => {

    return (
        <>
            {
                menu === 'home' &&
                <HomePageManagment />
            }
            {
                menu === 'stats' &&
                <StatsManagment />
            }
            {

            }
            {

            }
        </>
    )
})
export default observer(CourseManagment)