
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/myTrainers.module.css'
import trainerBlockstyles from '../styles/trainerBlock.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from "..";
import TrainerService from "../service/TrainerService";
import { useNavigate, useParams } from "react-router-dom";
import { EDIT_TRAINER } from "../utils";


function MyTrainers() {
    const [trainers, setTrainers] = useState([])
    const { trainerStore } = useContext(Context)
    const params = useParams()
    const current = params.id
    const navigate = useNavigate()

    const editHandler = (id) => {
        navigate(EDIT_TRAINER + '/' + id)
    }

    const deleteHandler = (id) => {
        trainerStore.deleteTrainer(id)
    }

    const publishHandler = (id) => {
        trainerStore.publishTrainer(id)
    }

    useEffect(() => {
        getChapters()
    }, [])

    async function getChapters() {
        try {
            const response = await TrainerService.fetchAllUserTrainers(current)
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

    return (
        <>
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                <div className={`${styles.content} ${styles.glass}`}>
                    <p className={styles.zagolovok}>Мои тренажеры</p>
                    <div>
                        {
                            trainers.map((item, index) => (

                                <div className={trainerBlockstyles.container}>
                                    <div className={trainerBlockstyles.mainInfo}>
                                        <div className={trainerBlockstyles.name}>
                                            <h2>{item.name}</h2>
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
                                    {console.log(item)}
                                    <div className={trainerBlockstyles.controll}>
                                        <button className={trainerBlockstyles.delete} onClick={() => deleteHandler(item.id)}>Удалить</button>
                                        <button className={trainerBlockstyles.edit} onClick={() => editHandler(item.id)}>Редактировать</button>
                                        <button className={item.status === 'notpublished' ? `${trainerBlockstyles.publish}` : `${trainerBlockstyles.notpublish}`} onClick={() => publishHandler(item.id)}>{item.status === 'notpublished' ? "Опубликовать" : "Снять с публикации"}</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default observer(MyTrainers)