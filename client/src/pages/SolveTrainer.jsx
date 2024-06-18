import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from '../styles/solveTrainer.module.css'
import { useParams } from "react-router-dom";
import { Context } from "..";
import CodeEditorSolve from "../components/CodeEditorSolve";

function SolveTrainer() {
    const params = useParams()
    const current = params.id
    const { trainerStore, store } = useContext(Context)

    const [code, setCode] = useState('')
    const [language, setLanguage] = useState('')
    const [level, setLevel] = useState('')
    const [points, setPoints] = useState('')
    const [test, setTest] = useState([])
    const [check, setCheck] = useState([])

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        getTrainer()
        getDoneTrainer()
    }, [])

    const codeTestInfoHandler = (code, check) => {
        setCode(code)
        setCheck(check)
    }
    console.log(check)

    async function getTrainer() {
        try {
            await trainerStore.fetchTrainer(current)
            setLanguage(trainerStore.trainer.programming_languages)
            setLevel(trainerStore.trainer.dificult)
            setPoints(trainerStore.trainer.points)
            if (isJsonString(trainerStore.trainer.tests)) {
                setTest(JSON.parse(trainerStore.trainer.tests))

            } else {
                setTest([])
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function getDoneTrainer() {
        try {
            await trainerStore.fetchDoneTrainer(current, store.user.id)
            setCode(trainerStore.doneTrainer.code)

            if (isJsonString(trainerStore.doneTrainer.check)) {
                setCheck(JSON.parse(trainerStore.doneTrainer.check))

            } else {
                setCheck([])
            }
        } catch (e) {
            console.log(e)
        }
    }

    console.log(trainerStore.doneTrainer.isDone)
    return (
        <>
            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                <div className={styles.content}>
                    <div className={`${styles.mainInfo} ${styles.glass} ${trainerStore.doneTrainer.isDone ? styles.done : false}`}>
                        <div className={`${styles.name} `}>
                            {trainerStore.trainer.name}
                            {
                                (level === '1 Xi' || level === '2 Xi' || level === '3 Xi' || level === '4 Xi') &&
                                <div className={(level === '1 Xi' || level === '2 Xi') ? `${styles.ezLevel}` : `${styles.medLevel}`}>
                                    <h2 >{level}</h2>
                                </div>
                            }
                            {
                                (level === '5 Xi' || level === '6 Xi') &&
                                <div className={(level === '5 Xi' || level === '6 Xi') ? `${styles.hardLevel}` : false}>
                                    <h2>{level}</h2>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={`${styles.description} ${styles.glass}`}>
                        <div>
                            {
                                trainerStore.trainer.content
                            }
                        </div>
                    </div>
                    <div className={`${styles.solveBlock} ${styles.glass}`}>
                        <div className={styles.codeEditor}>
                            <CodeEditorSolve infoCallback={codeTestInfoHandler} />
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export default observer(SolveTrainer)