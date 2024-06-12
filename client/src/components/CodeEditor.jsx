import React, { useContext, useEffect, useRef, useState } from "react";
import styles from '../styles/editTrainer.module.css'
import { observer } from "mobx-react-lite";
import CodeMirror, { lineNumberMarkers, lineNumbers } from "@uiw/react-codemirror";
import { aura } from "@uiw/codemirror-themes-all";
import { StreamLanguage, language } from "@codemirror/language";
import { langs } from "@uiw/codemirror-extensions-langs";
import { Context } from "..";

function CodeEditor({ testCB, codeCB, infoCallback }) {
    const { trainerStore } = useContext(Context)
    const [code, setCode] = useState('');
    const [test, setTest] = useState([])
    function isJsonString(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    useEffect(() => {
        if (trainerStore.trainer.id) {
            getTrainer()
        }
    }, [trainerStore.trainer.id])

    async function getTrainer() {
        try {
            await trainerStore.fetchTrainer(trainerStore.trainer.id)
            setCode(trainerStore.trainer.code)
            if (trainerStore.trainer.tests === null) {
                setTest([])
            }
            else if (isJsonString(trainerStore.trainer.tests)) {
                setTest(JSON.parse(trainerStore.trainer.tests))
            } else {
                setTest([])
            }
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        infoCallback(code, test)
    }, [code, test])

    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };


    let updatedCode = ''
    let a = ''
    let b = ''
    const handleExecuteCode = () => {
        const updatedTest = test.map((item, index) => {
            a = item.vars.split(',')[0]
            b = item.vars.split(',')[1]
            updatedCode = code.replace(/Sum\(\)/, `Sum(${a}, ${b})`);
            let result;

            try {
                result = eval(updatedCode);
            } catch (e) {
                console.error("Ошибка при выполнении кода:", e);
            }

            return { ...item, 'answer': result };
        });
        setTest(updatedTest);
    };

    const addTestHandler = () => {
        setTest([...test, { vars: '', answer: '', number: Date.now() }])
    }
    const changeInfo = (key, value, number) => {
        setTest(test.map(i => (i.number === number ? { ...i, [key]: value } : i)))
    }

    const removeInfo = (number) => {
        setTest(test.filter(i => (i.number !== number)))
    }


    return (
        <>
            <div className={styles.codeMirrorEditor}>
                <CodeMirror
                    value={code}
                    theme={aura}
                    height='400px'
                    extensions={[langs.javascript()]}
                    placeholder={'// Напишите шаблон программы'}
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
                <div className={styles.tests}>
                    <div className={styles.testBlock}>
                        <button className={styles.addTest} onClick={addTestHandler}>
                            Добавить тест
                        </button>
                        <div >
                            {
                                test.length !== 0 &&
                                test.map(i => (
                                    <div key={i.number} className={styles.testsInput}>
                                        <input
                                            className={styles.inputVars}
                                            type="text"
                                            onChange={(e) => changeInfo('vars', e.target.value, i.number)}
                                            value={i.vars}
                                        />
                                        <button onClick={() => removeInfo(i.number)} className={styles.removeButton}>Удалить тест</button>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <button onClick={handleExecuteCode} className={styles.compileButton}>Скомпилировать</button>
                <div className={styles.resultBlock}>
                    <p>Результаты тестов</p>
                    <div className={styles.result}>
                        {

                            test.map((item, index) => (
                                <div key={item.number}>
                                    Тест №{index + 1}.   Ответ:<p>  {item.answer}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}




export default observer(CodeEditor)