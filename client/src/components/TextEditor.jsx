import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import styles from '../styles/editLesson.module.css'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor() {

    const [ava, setAva] = useState([])


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

    const handleImageUpload = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const img = document.createElement('img');
                img.src = reader.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob(blob => {
                        const url = URL.createObjectURL(blob);
                        setAva(url); // Обновляем стейт изображения
                        resolve(url); // Возвращаем URL изображения
                    }, 'image/jpeg');
                };
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };
    return (
        <>
            <div className={styles.textEditor}>
                <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={handleChangeText}
                    modules={modules}
                    formats={formats}
                    onImageUpload={handleImageUpload}
                />
            </div>
        </>
    )
}

export default observer(TextEditor)