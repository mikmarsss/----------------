import React, { useContext, useState } from "react";
import styles from '../styles/landing.module.css'
import { Context } from "..";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { CATALOG_ROUTE, CREATE_ROUTE } from "../utils";

function Landing({ onSelectedFunc, hide, onSetHide }) {
    const navigate = useNavigate()
    const { store } = useContext(Context)
    const navigateHandler = (path) => {
        if (path === 'catalog') {
            navigate(CATALOG_ROUTE)
        }
        if (path === 'create') {
            navigate(CREATE_ROUTE)
        }
    }

    return (
        <>

            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                <div className={styles.content}>
                    <div className={styles.courseBlock}>
                        <button onClick={() => navigateHandler('catalog')} className={`${styles.courseCatalog} ${styles.glass} `}>
                            <p>Обучение</p>
                        </button>
                        <button onClick={() => navigateHandler('create')} className={`${styles.courseCreate} ${styles.glass} `}>
                            <p>Создать курс</p>
                        </button>
                    </div>
                    <button>

                    </button>
                    <button>

                    </button>
                </div>
                <div>
                    <Footer />
                </div>
            </div>



        </>
    )
}




export default observer(Landing)