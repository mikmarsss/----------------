import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/editTrainer.module.css'
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Context } from "..";
import { useParams } from "react-router-dom";
import CodeEditor from "../components/CodeEditor";

function EditTrainer() {
    const { trainerStore } = useContext(Context)
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [level, setLevel] = useState('easy')
    const [language, setLanguage] = useState(trainerStore.trainer.programming_languages)
    const [test, setTest] = useState([])
    const [code, setCode] = useState(trainerStore.trainer.code)


    const params = useParams()
    const current = params.id

    const nameHandler = (e) => {
        setName(e.target.value)
    }

    const levelHandler = (lev) => {
        setLevel(lev)
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


    console.log(test)
    const saveTrainerDataHandler = () => {
        const stringTest = JSON.stringify(test)
        trainerStore.saveTrainerData(current, code, language, name, description, level, stringTest)
    }

    return (
        <>
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
                                        value='easy'
                                        onChange={() => levelHandler('easy')}
                                        checked={level === 'easy' ? true : false}
                                    />
                                    <p className={styles.ezLevel}>Легкий</p>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        value='medium'
                                        onChange={() => levelHandler('medium')}
                                        checked={level === 'medium' ? true : false}
                                    />
                                    <p className={styles.medLevel}>Средний</p>
                                </div>
                                <div>
                                    <input
                                        type="radio"
                                        value='hard'
                                        onChange={() => levelHandler('hard')}
                                        checked={level === 'hard' ? true : false}
                                    />
                                    <p className={styles.hardLevel}>Сложный</p>
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
                                        checked={language === 'javascript' ? true : false}
                                        onChange={() => languageHandler('javascript')}
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
        </>
    )
}

export default observer(EditTrainer)