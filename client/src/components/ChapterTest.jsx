import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styles from '../styles/editLesson.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function ChapterTest({ chapter, onTestHandler, img }) {
    const [testDescription, setTestDescription] = useState([])
    const [testContent, setTestContent] = useState(chapter)
    const [ava, setAva] = useState(img === 'Картинки' ? [] : img)
    console.log(img)
    useEffect(() => {
        onTestHandler(testContent, ava)
    }, [testContent, ava])

    useEffect(() => {
        if (chapter.description) {
            setTestDescription(chapter.description)
        }
    }, [])

    const handleChangeTestText = (value) => {

        changeInfo('name', value, chapter.number);
    };

    const changeInfo = (key, value, number) => {
        setTestContent({ ...chapter, [key]: value })

    }

    console.log(ava)

    const addTestButton = (tag) => {
        setTestDescription([...testDescription, { description: '', number: Date.now(), tag: tag }])
    }

    const changeTestInfo = (key, value, number) => {
        setTestContent({ ...testContent, [key]: value })
    }

    const changeInfoTestButton = (key, value, number) => {
        setTestDescription(testDescription.map(i => (i.number === number ? { ...i, [key]: value } : i)))
    }

    const concatData = (key, value, number) => {
        setTestContent({ ...testContent, [key]: value })

    }

    const selectAva = (e) => {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function () {
                var preview = document.querySelector('#img-preview');
                preview.src = reader.result;
            };
            reader.readAsDataURL(e.target.files[0]);
            setAva(e.target.files[0]);
        }
    }

    const deleteAva = (e) => {
        e.stopPropagation();
        const preview = document.querySelector('#img-preview');
        preview.src = '';
        setAva([])
    }

    const removeInfoTestButton = (number) => {
        setTestDescription(testDescription.filter(i => (i.number !== number)))
    }


    return (
        <>
            <div className={styles.testContainer}>
                <div>
                    <ReactQuill
                        theme="snow"
                        value={testContent.name}
                        placeholder="Введите содержание теста"
                        onChange={handleChangeTestText}
                    />
                </div>
                <div className={styles.testAnswers}>

                    <div >
                        {
                            testDescription.map((i) => (
                                <>
                                    <div className={styles.testContent}>
                                        <div key={i.number}>
                                            <input
                                                onChange={(e) => changeTestInfo('answer', e.target.value, chapter.number)}
                                                type='radio'
                                                id="option2"
                                                name="option"
                                                value={i.number}
                                                checked={i.number == testContent.answer}
                                            />

                                            <label for="option2">
                                                <input
                                                    type="text"
                                                    className={styles.testInput}
                                                    onChange={(e) => changeInfoTestButton('description', e.target.value, i.number)}
                                                    value={i.description}
                                                />
                                            </label>
                                        </div>
                                        <button className={styles.removeButton} onClick={() => removeInfoTestButton(i.number)}>Удалить вариант ответа</button>

                                    </div>
                                </>
                            ))
                        }

                    </div>
                    <button className={styles.removeButton} onClick={() => addTestButton('test')}>Добавить вариант ответа</button>
                    <button className={styles.removeButton} onClick={() => concatData('description', testDescription, chapter.number)}>Сохранить тест</button>

                    <div className={styles.imgfield}>
                        {
                            ava.length !== 0 &&
                            <img className={styles.ava} id="img-preview" src={`${"http://localhost:5000/" + img}`} alt="" />
                        }
                        <label className={styles.inputFiles}>
                            <input
                                type="file"
                                id="img"
                                onChange={(e) => selectAva(e)}
                            />
                            {
                                ava.length === 0 &&
                                <span className={styles.inputButton}>Добавить фото</span>
                            }
                        </label>
                        {
                            ava.length !== 0 &&
                            <button onClick={(e) => deleteAva(e)} className={styles.inputButton}>Удалить фото</button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default observer(ChapterTest)