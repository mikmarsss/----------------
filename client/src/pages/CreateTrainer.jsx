import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styles from '../styles/createTrainer.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { EDIT_TRAINER } from "../utils";
import { Context } from "..";

function CreateTrainer() {
    const { store, trainerStore } = useContext(Context)
    const navigate = useNavigate()

    async function createTrainerHandler(path) {
        await trainerStore.createTrainer(store.user.id)
        if (path === 'edittrainer') {
            navigate(EDIT_TRAINER + '/' + trainerStore.trainer.id)
        }
    }
    return (
        <>
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                <div className={`${styles.content} ${styles.glass}`}>
                    <div>
                        <p className={styles.zagolovok}>Какой-то текст</p>
                    </div>
                    <div>
                        <button className={styles.createTrainer} onClick={() => createTrainerHandler('edittrainer')}>Создать задачу</button>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default observer(CreateTrainer)