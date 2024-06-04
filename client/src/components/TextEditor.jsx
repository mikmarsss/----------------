import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import styles from '../styles/editLesson.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({ chapter, onTextHandler, img }) {
    const [textContent, setTextContent] = useState(chapter)
    const [ava, setAva] = useState(img === 'Картинки' ? [] : img)
    console.log(img)
    useEffect(() => {
        onTextHandler(textContent, ava)
    }, [textContent, ava])

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const handleChangeText = (value) => {
        console.log(value)
        changeInfo('description', value, chapter.number);
    };

    const changeInfo = (key, value, number) => {
        setTextContent({ ...chapter, [key]: value })

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
    console.log(ava)
    return (
        <>
            <div className={styles.textEditor}>
                <ReactQuill
                    theme="snow"
                    value={textContent.description}
                    onChange={handleChangeText}
                    formats={formats}
                    modules={modules}
                />
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
        </>
    )
}

export default observer(TextEditor)