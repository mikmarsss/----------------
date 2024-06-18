import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/editTrainer.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from "..";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";

function EditTrainer() {
    const { trainerStore, store } = useContext(Context)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [level, setLevel] = useState('1 Xi')
    const [language, setLanguage] = useState('')
    const [test, setTest] = useState([])
    const [code, setCode] = useState(trainerStore.trainer.code)
    const [points, setPoints] = useState()
    const params = useParams()
    const current = params.id

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const levelHandler = (lev) => {
        setLevel(lev)
        if (lev === '1 Xi') {
            setPoints(20)
        }
        if (lev === '2 Xi') {
            setPoints(30)
        }
        if (lev === '3 Xi') {
            setPoints(60)
        }
        if (lev === '4 Xi') {
            setPoints(100)
        }
        if (lev === '5 Xi') {
            setPoints(200)
        }
        if (lev === '6 Xi') {
            setPoints(400)
        }
    }


    const languageHandler = (lang) => {
        setLanguage(lang)
    }

    const codeTestInfoHandler = (code, test) => {
        setCode(code)
        setTest(test)
    }

    useEffect(() => {
        getTrainer()
    }, [])

    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    async function getTrainer() {
        try {
            await trainerStore.fetchTrainer(current)
            setCode(trainerStore.trainer.code)
            setLanguage(trainerStore.trainer.programming_languages)
            setLevel(trainerStore.trainer.dificult)
            if (isJsonString(trainerStore.trainer.tests)) {
                setTest(JSON.parse(trainerStore.trainer.tests))

            } else {
                setTest([])
            }
        } catch (e) {
            console.log(e)
        }
    }


    const saveTrainerDataHandler = () => {
        const stringTest = JSON.stringify(test)
        trainerStore.saveTrainerData(current, code, language, name, description, level, stringTest, points)
    }

    return (
        <>
            {
                store.user.role === 'ADMIN' &&
                <div className={styles.container}>
                    <div>
                        <Header />
                    </div>
                    <div className={`${styles.content} ${styles.glass}`}>
                        <div className={styles.opisanie}>
                            <div>
                                <p>Название тренажёа</p>
                                <input
                                    onChange={(e) => nameHandler(e)}
                                    type="text"
                                    className={styles.logininput}
                                    placeholder={trainerStore.trainer.name}
                                />
                            </div>
                            <div>
                                <p>Описание тренажёра</p>
                                <textarea
                                    className={styles.contentInput}
                                    type="text"
                                    id="content"
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder={trainerStore.trainer.content}
                                    maxLength={500}
                                />
                            </div>
                            <div className={styles.dificult}>
                                <p className={styles.dificultlevels}>Уровень сложности</p>
                                <div>
                                    <div>
                                        <input
                                            type="radio"
                                            value='1 Xi'
                                            onChange={() => levelHandler('1 Xi')}
                                            checked={level === '1 Xi' ? true : false}
                                        />
                                        <p className={styles.ezLevel}>1 Xi</p>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            value='2 Xi'
                                            onChange={() => levelHandler('2 Xi')}
                                            checked={level === '2 Xi' ? true : false}
                                        />
                                        <p className={styles.ezLevel}>2 Xi</p>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            value='3 Xi'
                                            onChange={() => levelHandler('3 Xi')}
                                            checked={level === '3 Xi' ? true : false}
                                        />
                                        <p className={styles.medLevel}>3 Xi</p>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            value='4 Xi'
                                            onChange={() => levelHandler('4 Xi')}
                                            checked={level === '4 Xi' ? true : false}
                                        />
                                        <p className={styles.medLevel}>4 Xi</p>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            value='5 Xi'
                                            onChange={() => levelHandler('5 Xi')}
                                            checked={level === '5 Xi' ? true : false}
                                        />
                                        <p className={styles.hardLevel}>5 Xi</p>
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            value='6 Xi'
                                            onChange={() => levelHandler('6 Xi')}
                                            checked={level === '6 Xi' ? true : false}
                                        />
                                        <p className={styles.hardLevel}>6 Xi</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.dificult}>
                                <p className={styles.dificultlevels}>Язык программирования</p>
                                <div>
                                    <div>
                                        <input
                                            type="radio"
                                            value='JavaScript'
                                            checked={language === 'JavaScript' ? true : false}
                                            onChange={() => languageHandler('JavaScript')}
                                        />
                                        <p className={styles.progLang}>JavaScript</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.compiler}>
                            <p>Редактор кода</p>
                            <CodeEditor testCB={test} codeCB={code} infoCallback={codeTestInfoHandler} />
                        </div>
                        <div className={styles.saveButton}>
                            <button onClick={saveTrainerDataHandler}>Сохранить</button>
                        </div>
                    </div>
                    <div>
                        <Footer />
                    </div>
                </div>
            }
        </>
    )
}

export default observer(EditTrainer)