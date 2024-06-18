import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/TrainerPage.module.css'
import { Context } from "..";
import { useNavigate } from "react-router-dom";
import { CATALOG_TRAINERS, CREATE_TRAINER, MY_TRAINERS } from "../utils";

function TrainerPage() {

    const { store, trainerStore } = useContext(Context)
    // const [progress, setProgress] = useState(0);
    let progress = (trainerStore.userTrainer.points / trainerStore.userTrainer.status_value) * 100
    useEffect(() => {
        getTrainerUserInfo()
    }, [])

    async function getTrainerUserInfo() {
        try {
            await trainerStore.fetchUserTrainerInfo(localStorage.getItem('userId'))
        } catch (e) {
            console.log(e)
        }

    }

    const navigate = useNavigate()

    const navigateHandler = (path) => {
        if (path === 'catalog') {
            navigate(CATALOG_TRAINERS)
        }
        if (path === 'create') {
            navigate(CREATE_TRAINER + '/' + store.user.id)
        }
        if (path === 'mytrainers') {
            navigate(MY_TRAINERS + '/' + store.user.id)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                <div className={styles.content}>
                    <div className={`${styles.profileBar} ${styles.glass}`}>
                        {
                            store.isAuth &&
                            <div className={styles.userInfo}>
                                <div className={styles.fio}>
                                    <p>{store.user.name} {store.user.surname}</p>
                                </div>
                                <div className={styles.mainUserInfo}>
                                    <div>
                                        <div>
                                            Email
                                        </div>
                                        <div>
                                            Test
                                        </div>
                                        <div>
                                            Points
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            {store.user.email}
                                        </div>
                                        <div>
                                            Название теста
                                        </div>
                                        <div>
                                            {trainerStore.userTrainer.points}
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.progress}>
                                    <p>Прогресс</p>
                                    <div className={styles.progressInfo}>
                                        <div className={styles.values}>
                                            <div>
                                                {
                                                    trainerStore.userTrainer.status_value === 300 &&
                                                    0
                                                }
                                                {
                                                    trainerStore.userTrainer.status_value === 600 &&
                                                    300
                                                }
                                                {
                                                    trainerStore.userTrainer.status_value === 1000 &&
                                                    600
                                                }
                                                {
                                                    trainerStore.userTrainer.status_value === 2000 &&
                                                    1000
                                                }
                                                {
                                                    trainerStore.userTrainer.status_value === 5000 &&
                                                    2000
                                                }
                                                {
                                                    trainerStore.userTrainer.status_value === 10000 &&
                                                    5000
                                                }
                                                {
                                                    trainerStore.userTrainer.status_value === 25000 &&
                                                    10000
                                                }
                                            </div>
                                            <div>
                                                {trainerStore.userTrainer.points}
                                            </div>
                                            <div>
                                                {trainerStore.userTrainer.status_value}
                                            </div>
                                        </div>
                                        <div className={styles.progressBar}>

                                            <div className={styles.progressbarfill} style={{ width: `${progress}%` }}></div>

                                        </div>
                                        <div className={styles.userStatus}>
                                            {trainerStore.userTrainer.status}
                                        </div>
                                        <div>
                                            <button className={styles.seeAllStatuses}>Посмотреть все звания</button>
                                        </div>
                                    </div>
                                </div>


                                <div className={styles.createMy}>
                                    <button className={styles.myTrainers} onClick={() => navigateHandler('mytrainers')}>
                                        Мои тренажеры
                                    </button>
                                    {
                                        store.user.role === 'ADMIN' &&
                                        <button className={styles.myTrainers} onClick={() => navigateHandler('create')}>
                                            Создать
                                        </button>
                                    }
                                </div>

                                {/* <div className={styles.doneTrainers}>
                                    <p>Недавние</p>

                                </div> */}
                            </div>
                        }
                        {
                            !store.isAuth &&
                            <div>
                                Авторизуйтесь
                            </div>
                        }
                    </div>
                    <div className={`${styles.trainersCatalog}`}>
                        <div className={styles.allTrainers}>
                            <button className={`${styles.trainerCatalog} ${styles.glass}`} onClick={() => navigateHandler('catalog')}>
                                <p>Все задачи</p>
                            </button>
                        </div>
                        <div>
                            <button className={`${styles.langTrainers} ${styles.glass}`} onClick={() => navigateHandler('catalog')}>
                                <p>JavaScript</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div >
        </>
    )
}

export default observer(TrainerPage)