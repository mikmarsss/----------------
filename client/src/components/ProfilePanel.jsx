import React, { useContext, useEffect } from "react";
import { observer } from 'mobx-react-lite'
import styles from "../styles/profilepanel.module.css"
import { Context } from "..";
import { useNavigate } from 'react-router-dom'
import { CATALOG_ROUTE } from "../utils";
import { useState } from "react";
import HomePageProfile from "./HomePageProfile";
import PortfolioPage from "./PortfolioPage";
import ProfileSettings from "../pages/ProfileSettings";
import CoursesBlockProfile from "./CoursesBlockProfile";
import CoursesService from "../service/CoursesService";

function Profilepanel() {
    const { store, courseStore } = useContext(Context)
    const [menu, setMenu] = useState('home')
    const [courses, setCourses] = useState([])

    const navigate = useNavigate()
    const logoutHandler = () => {
        store.logout()
        navigate(CATALOG_ROUTE)
    }

    useEffect(() => {
        setMenu(localStorage.getItem('menuPanel'))
        if (localStorage.getItem('menuPanel') === 'created') {
            getCourses()
        }
    }, [])

    const menuHandler = (v) => {
        setMenu(v)
        localStorage.setItem('menuPanel', v)
    }

    async function getCourses() {
        try {
            const response = await CoursesService.fetchUserCourses(store.user.id)
            const dataArray = response.data.courses; // Предполагается, что courses - это массив в модели
            if (Array.isArray(dataArray)) {
                setCourses(dataArray);

            } else {
                console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                setCourses([]); // Установка пустого массива в случае ошибки
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <>
            <div className={styles.container}>
                <div className={styles.navmenu}>
                    <div className={styles.ava}>
                        <div>
                            <img className={styles.photo} src={"http://localhost:5000/" + store.user.img} alt="ava" />
                        </div>
                        <div className={styles.username}>
                            {store.user.username}
                        </div>
                    </div>
                    <div className={styles.navpanel}>
                        <label htmlFor="main">Основное</label>
                        <div className={styles.main} id="main">
                            <button onClick={() => menuHandler('home')}>Домашняя страница</button>
                            <button onClick={() => menuHandler('portfolio')}>Портфолио</button>
                            <button onClick={() => menuHandler('settings')}>Настройки</button>
                        </div>
                        <label htmlFor="courses">Обучение</label>
                        <div id="courses" className={styles.courses}>
                            <button onClick={() => menuHandler('active')}>Активные курсы</button>
                            <button onClick={() => menuHandler('done')}>Пройденные курсы</button>
                            <button onClick={() => menuHandler('favorite')}>Избранное</button>
                            <button onClick={() => menuHandler('learnStat')}>Статистика обучения</button>
                        </div>
                        <label htmlFor="teach">Преподавание</label>
                        <div id="teach" className={styles.courses}>
                            <button onClick={() => menuHandler('created')}>Мои курсы</button>
                            <button onClick={() => menuHandler('sellStat')}>Статистика продаж</button>
                        </div>
                        <button onClick={() => logoutHandler()} className={styles.exitButton}>выйти</button>
                    </div>
                </div>
                <div className={styles.info}>
                    <ShowInfo menu={menu} courses={courses} />
                </div>
            </div>
        </>
    )
}

const ShowInfo = observer(({ menu, courses }) => {

    return (
        <>
            {
                menu === 'home' &&
                <HomePageProfile />
            }
            {
                menu === 'portfolio' &&
                <PortfolioPage />
            }
            {
                menu === 'settings' &&
                <ProfileSettings />
            }
            {
                menu === 'created' &&
                <CoursesBlockProfile courses={courses} />
            }
        </>
    )
})
export default observer(Profilepanel)