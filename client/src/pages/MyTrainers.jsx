
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/myTrainers.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from "..";
import TrainerService from "../service/TrainerService";
import { useParams } from "react-router-dom";
import TrainerBlock from "../components/TrainerBlock";
function MyTrainers() {
    const [trainers, setTrainers] = useState([])
    const { trainerStore } = useContext(Context)
    const params = useParams()
    const current = params.id

    useEffect(() => {
        getChapters()
    }, [])

    const updateHandler = () => {
        getChapters()
    }

    async function getChapters() {
        try {
            const response = await TrainerService.fetchAllTrainers(current)
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
                    {
                        trainers.map((item, index) => (

                            <TrainerBlock trainer={item} updateHandlerCB={updateHandler} />
                        ))
                    }
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default observer(MyTrainers)