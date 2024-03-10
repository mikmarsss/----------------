import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import styles from '../styles/createCourses.module.css'
import { Link } from "react-router-dom";
import { COURSES_CONTENT } from "../utils";
import { Context } from "..";

function CreateCourse() {
    const { courseStore, store } = useContext(Context)
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [courseContent, setCourseContent] = useState([])
    const [ava, setAva] = useState([])
    const [type, setType] = useState('1')
    const [dopType, setDopType] = useState([])
    const [showDopTypes, setShowDopTypes] = useState(false)


    const icons = [
        {
            id: 1,
            name: 'angular',
        },
        {
            id: 2,
            name: 'bootstrap',
        },
        {
            id: 3,
            name: 'c',
        },
        {
            id: 4,
            name: 'cshj',
        },
        {
            id: 5,
            name: 'c++',
        },
        {
            id: 6,
            name: 'github',
        },
        {
            id: 7,
            name: 'go-lang',
        },
        {
            id: 8,
            name: 'html5',
        },
        {
            id: 9,
            name: 'java',
        },
        {
            id: 10,
            name: 'js',
        },
        {
            id: 11,
            name: 'mysql',
        },
        {
            id: 12,
            name: 'nodejs',
        },
        {
            id: 13,
            name: 'php',
        },
        {
            id: 14,
            name: 'postgresql',
        },
        {
            id: 15,
            name: 'python',
        },
        {
            id: 16,
            name: 'react',
        },
        {
            id: 17,
            name: 'sql-server',
        },
        {
            id: 18,
            name: 'swift',
        },
        {
            id: 19,
            name: 'typescript',
        },
        {
            id: 20,
            name: 'unity',
        },
        {
            id: 21,
            name: 'visual-studio',
        },
        {
            id: 22,
            name: 'vue',
        },
        {
            id: 23,
            name: 'wordpress',
        },
    ]

    const showDopTypesHandler = (show) => {
        if (show === false) {
            setShowDopTypes(true)
        } else {
            setShowDopTypes(false)
        }
    }

    const selectAva = (e) => {
        setAva(e.target.files[0])
    }

    const addContent = () => {
        setCourseContent([...courseContent, { description: '', number: Date.now() }])
    }

    const changeInfo = (key, value, number) => {
        setCourseContent(courseContent.map(i => (i.number === number ? { ...i, [key]: value } : i)))
    }
    const removeInfo = (number) => {
        setCourseContent(courseContent.filter(i => (i.number !== number)))
    }

    const addDopTypesHandler = (id) => {
        setDopType(prev => [...prev, id])

    }
    const saveData = () => {
        const formdata = new FormData()
        formdata.append('courseId', courseStore.course.id)
        formdata.append('name', name)
        formdata.append('price', price)
        formdata.append('description', description)
        formdata.append('courseContent', JSON.stringify(courseContent))
        formdata.append('img', ava)
        formdata.append('type', type)
        dopType.forEach((index, item) => {
            formdata.append('additional_type', index)
        })
        courseStore.saveCourseData(formdata)
    }

    console.log(courseStore.course.id)
    return (

        <>

            <div className={styles.mainInfo}>
                <div className={styles.leftBlock}>
                    <div>
                        <label htmlFor="img">Картинка</label>
                        <input

                            type="file"
                            id="img"
                            onChange={(e) => selectAva(e)}
                        />
                    </div>
                </div>
                <div className={styles.rightBlock}>
                    <div>
                        <label htmlFor="price">Введите цену</label>
                        <input
                            value={price}
                            type="text"
                            id="price"
                            onChange={e => setPrice(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="name">Введите название</label>
                        <input
                            value={name}
                            type="text"
                            id="name"
                            onChange={e => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label htmlFor="description">Введите описание</label>
                        <textarea
                            value={description}
                            type="text"
                            id="description"
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="type">Выберите основной тип</label>
                        <select id="type" onChange={e => setType(e.target.value)}>
                            <option selected value="1">Программирование</option>
                            <option value="2">Дизайн</option>
                            <option value="3">Маркетинг</option>
                            <option value="4">Тестирование</option>
                        </select>
                    </div>
                    <div>
                        {
                            <>
                                <label htmlFor="choosedTypes">выбранные теги</label>
                                <div className={styles.choosedTypes} id="choosedTypes">
                                    {icons.filter(item => dopType.includes(item.id)).map(item => (
                                        <div key={item.id}>
                                            <img className={styles.ava} src={`http://localhost:5000/${item.name}.svg`} alt="" />
                                        </div>
                                    ))}
                                </div>
                            </>
                        }
                        <label htmlFor="doptype">Выберите дополнительные теги</label>
                        <button
                            id="doptype"
                            onClick={() => showDopTypesHandler(showDopTypes)}
                        >Показать теги</button>

                        {
                            showDopTypes === true &&
                            <div className={styles.dopTypes}>
                                {icons.map(item => (
                                    <button key={item.id} onClick={() => addDopTypesHandler(item.id)}>
                                        <img className={styles.ava} src={`http://localhost:5000/${item.name}.svg`} alt="" />
                                        <p>{item.name}</p>
                                    </button>
                                ))}
                            </div>
                        }
                    </div>
                    <div className={styles.courseContent}>
                        {
                            courseContent.map(i => (
                                <div key={i.number}>
                                    <label htmlFor="content">Пункт </label>
                                    <input
                                        type="text"
                                        id="content"
                                        value={i.description}
                                        onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    />
                                    <button onClick={() => removeInfo(i.number)}>Удалить</button>
                                </div>
                            ))
                        }
                        <button onClick={addContent}>Добавить пункт</button>
                    </div>
                </div>
                <div>
                    <button onClick={saveData} className={styles.saveButton}>СОХРАНИТЬ</button>
                </div>
            </div>


        </>
    )
}




export default observer(CreateCourse) 