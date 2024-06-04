import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/TrainerPage.module.css'
import { Context } from "..";
import progressBar from '../Images/progressBar.svg'
import progressBarFill from '../Images/progressBarFill.svg'

function TrainerPage() {

    const { store, trainerStore } = useContext(Context)
    // const [progress, setProgress] = useState(0);
    let progress = (trainerStore.userTrainer.points / trainerStore.userTrainer.status_value) * 100
    useEffect(() => {
        getTrainerUserInfo()
        // setProgress(trainerStore.userTrainer.points)
    }, [])
    async function getTrainerUserInfo() {
        try {
            await trainerStore.fetchUserTrainerInfo(localStorage.getItem('userId'))
        } catch (e) {
            console.log(e)
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
                                <div className={styles.doneTrainers}>
                                    <p>Недавние</p>

                                </div>
                            </div>
                        }
                        {
                            !store.isAuth &&
                            <div>
                                Авторизуйтесь
                            </div>
                        }
                    </div>
                    <div className={`${styles.trainersCatalog} ${styles.glass}`}>

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