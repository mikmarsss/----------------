import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/catalogTrainers.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from "..";
import TrainerService from "../service/TrainerService";
import { useNavigate } from "react-router-dom";
import { SOLVE_TRAINER } from "../utils";

function CatalogTrainers() {
    const [trainers, setTrainers] = useState([])
    const { trainerStore, store } = useContext(Context)
    const navigate = useNavigate()

    useEffect(() => {
        getChapters()
    }, [])

    async function getChapters() {
        try {
            const response = await TrainerService.fetchAllTrainers()
            const dataArray = response.data.trainers; // Предполагается, что courses - это массив в модели
            if (Array.isArray(dataArray)) {
                setTrainers(dataArray);

            } else {
                console.error('Ожидался массив, но получен другой тип данных:', dataArray);
                setTrainers([]); // Установка пустого массива в случае ошибки
            }
        } catch (e) {
            console.log(e)
        }
    }

    const navigateHandler = (id) => {
        navigate(SOLVE_TRAINER + '/' + id)
        trainerStore.createDoneTrainer(id, store.user.id)
    }

    return (
        <>
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                <div className={styles.content} >
                    {/* <div className={`${styles.filter} ${styles.glass}`}>
                        <p>Фильтр</p>
                        <div className={styles.dificult}>
                            <p>Сложность</p>
                            <div>
                                <input type="checkbox" />
                                <p>Легко</p>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <p>Средне</p>
                            </div>
                            <div>
                                <input type="checkbox" />
                                <p>Сложно</p>
                            </div>
                        </div>
                        <div className={styles.progLangs}>
                            <p>Языки программирования</p>
                            <div>
                                <input type="checkbox" />
                                <p>JavaScript</p>
                            </div>
                        </div>
                    </div> */}
                    {
                        trainers.length !== 0 &&
                        <div className={`${styles.catalog} `}>
                            <p className={styles.zagolovok}>Задачи</p>

                            {

                                trainers.map((item, index) => (
                                    <button key={index} className={`${styles.trainerBlock} ${styles.glass2}`} onClick={() => navigateHandler(item.id)}>
                                        <div className={styles.mainInfo}>
                                            <div className={styles.name}>
                                                {item.name}
                                            </div>
                                            {
                                                (item.dificult === '1 Xi' || item.dificult === '2 Xi' || item.dificult === '3 Xi' || item.dificult === '4 Xi') &&
                                                <div className={(item.dificult === '1 Xi' || item.dificult === '2 Xi') ? `${styles.ezLevel}` : `${styles.medLevel}`}>
                                                    <h2 >{item.dificult}</h2>
                                                </div>
                                            }
                                            {
                                                (item.dificult === '5 Xi' || item.dificult === '6 Xi') &&
                                                <div className={(item.dificult === '5 Xi' || item.dificult === '6 Xi') ? `${styles.hardLevel}` : false}>
                                                    <h2>{item.dificult}</h2>
                                                </div>
                                            }
                                        </div>
                                        <div className={styles.progLang}>
                                            {item.programming_languages}
                                        </div>
                                    </button>
                                ))

                            }
                        </div>
                    }
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default observer(CatalogTrainers)