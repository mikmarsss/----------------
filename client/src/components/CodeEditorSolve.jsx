import React, { useContext, useEffect, useRef, useState } from "react";
import styles from '../styles/editTrainer.module.css'
import { observer } from "mobx-react-lite";
import CodeMirror from "@uiw/react-codemirror";
import { aura } from "@uiw/codemirror-themes-all";
import { langs } from "@uiw/codemirror-extensions-langs";
import { Context } from "..";
import { useParams } from "react-router-dom";

function CodeEditorSolve({ infoCallback }) {
    const { trainerStore, store } = useContext(Context)
    const [code, setCode] = useState('');
    const [result, setResult] = useState('');
    const [test, setTest] = useState('');
    const [check, setCheck] = useState([])
    const params = useParams()
    const current = params.id

    useEffect(() => {
        infoCallback(code, check)
    }, [code, check])

    useEffect(() => {
        getTrainer()
        if (store.user.id) {
            getDoneTrainer()

        }
    }, [])

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };



    const handleExecuteCode = () => {
        try {
            const result = eval(code)
            setResult(result)

        } catch (e) {
            setResult(e)

        }
    };

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
            const normalArray = Array.from(trainerStore.doneTrainer.check);
            setCheck(normalArray)
            // if (isJsonString(trainerStore.doneTrainer.check)) {
            //     setCheck(JSON.parse(trainerStore.doneTrainer.check))

            // } else {
            //     setCheck([])
            // }
        } catch (e) {
            console.log(e)
        }
    }
    let updatedCode = ''
    let a = ''
    let b = ''

    const checkResult = () => {
        const tempCheck = [];
        test.map((item, index) => {
            a = item.vars.split(',')[0]
            b = item.vars.split(',')[1]
            updatedCode = code.replace(/Sum\((\d+)?,(\d+)?\)/g, `Sum(${a}, ${b})`);
            try {
                let result = eval(updatedCode);
                console.log(result, item.answer)
                if (result == item.answer) {
                    tempCheck.push('Ok');
                }
                else {
                    tempCheck.push('Miss');
                }
            } catch (e) {
                console.error("Ошибка при выполнении кода:", e);
            }
        });
        setCheck(tempCheck);
        console.log(check)
        saveData(tempCheck)
    };

    async function saveData(tempCheck) {
        await trainerStore.saveDoneTrainers(current, tempCheck, code, store.user.id, trainerStore.trainer.points)

    }

    return (
        <>
            <div className={styles.codeMirrorEditor}>
                <CodeMirror
                    className={styles.Codeeditor}
                    value={code}
                    theme={aura}
                    height='550px'
                    extensions={[langs.javascript()]}
                    placeholder={'// Решайте тут'}
                    basicSetup={{
                        highlightActiveLineGutter: true,
                        highlightSpecialChars: true,
                        history: true,
                        drawSelection: true,
                        dropCursor: true,
                        allowMultipleSelections: true,
                        indentOnInput: true,
                        syntaxHighlighting: true,
                        bracketMatching: true,
                        closeBrackets: true,
                        autocompletion: false,
                        rectangularSelection: true,
                        crosshairCursor: true,
                        highlightActiveLine: true,
                        highlightSelectionMatches: true,
                        closeBracketsKeymap: true,
                        defaultKeymap: true,
                        searchKeymap: true,
                        tabSize: 4,
                    }}
                    onChange={handleCodeChange}
                />
                <button onClick={handleExecuteCode} className={styles.compileButton}>Скомпилировать</button>
                <div className={styles.resBlock}>
                    <p>Результат</p>
                    <div className={styles.result}>
                        {result}
                    </div>
                </div>

                <button className={styles.checkBlock}>
                    {
                        check.map((item, index) => (
                            <div key={index}>
                                Тест {index + 1} : {item}
                            </div>
                        ))
                    }
                </button>

                {
                    !trainerStore.doneTrainer.isDone &&
                    <button className={styles.checkResult} onClick={checkResult}>
                        Отправить на проверку
                    </button>
                }
            </div>

        </>
    )
}




export default observer(CodeEditorSolve)