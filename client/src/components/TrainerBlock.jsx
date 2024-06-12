import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import styles from '../styles/trainerBlock.module.css'
import { useNavigate, useOutletContext } from "react-router-dom";
import { EDIT_TRAINER } from "../utils";
import { Context } from "..";

function TrainerBlock({ trainer, updateHandlerCB }) {
    const { trainerStore } = useContext(Context)
    const navigate = useNavigate()

    const editHandler = () => {
        navigate(EDIT_TRAINER + '/' + trainer.id)
    }

    const deleteHandler = () => {
        trainerStore.deleteTrainer(trainer.id)
        updateHandlerCB()
    }



    return (
        <>
            <div className={styles.container}>
                <div className={styles.mainInfo}>
                    <div className={styles.name}>
                        <h2>{trainer.name}</h2>
                    </div>
                </div>

                <div className={styles.controll}>
                    <button className={styles.delete} onClick={deleteHandler}>Удалить</button>
                    <button className={styles.edit} onClick={editHandler}>Редактировать</button>
                    <button className={styles.publish}>Опубликовать</button>
                </div>
            </div>
        </>
    )
}

export default observer(TrainerBlock)