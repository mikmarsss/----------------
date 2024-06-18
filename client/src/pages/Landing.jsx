import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/landing.module.css'
import { Context } from "..";
import { observer } from "mobx-react-lite";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { CATALOG_ROUTE, CREATE_ROUTE, TEST_PAGE, TRAINER_PAGE } from "../utils";
import arrow from '../Images/landArrow.svg'
function Landing() {
    const navigate = useNavigate()
    const { store } = useContext(Context)
    const [opacity, setOpacity] = useState(1)
    const [moreOpacity, setMoreOpacity] = useState(0)
    const [more1Opacity, setmore1Opacity] = useState(1);

    const navigateHandler = (path) => {
        if (path === 'catalog') {
            navigate(CATALOG_ROUTE)
        }
        if (path === 'create') {
            navigate(CREATE_ROUTE)
        }
        if (path === 'trainers') {
            navigate(TRAINER_PAGE)
        }
        if (path === 'recomend') {
            navigate(TEST_PAGE + '/' + store.user.id)
        }
    }

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const newOpacity = Math.max(1 - scrollPosition / 700, 0); // Уменьшаем прозрачность, но не ниже 0
            setOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const newOpacity = Math.min(0 + scrollPosition / 1000, 1); // Уменьшаем прозрачность, но не ниже 0
            setMoreOpacity(newOpacity);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY;
            const isGranisa = position > 1150
            if (isGranisa) {
                const scrollPosition = window.scrollY;
                const newOpacity = Math.max(1 - (scrollPosition - 1100) / 300, 0); // Уменьшаем прозрачность, начиная с 1550 пикселей
                setmore1Opacity(newOpacity);
            }

        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>

            <div className={styles.container}>
                <div>
                    <Header />
                </div>
                <div className={styles.content}>
                    <div className={styles.zagolovok1} id="sticky-comp" style={{ position: 'sticky', opacity: more1Opacity }}>
                        <p>Образовательная площадка Theta</p>
                    </div>
                    <div className={styles.zagolovok2} id="sticky-comp" style={{ position: 'sticky', opacity: more1Opacity }}>
                        <p>Не ставь себе целью обретение плодов деяний, и да не будет у тебя склонности к бездействию.</p>
                    </div>
                    <img className={styles.arrow} src={arrow} alt="" style={{ opacity: opacity }} />
                    <div className={styles.cards} >
                        <div className={`${styles.courses} ${styles.infoBlock}`} style={{ opacity: moreOpacity }}>
                            <InfoCard />
                        </div>
                    </div>
                    {/* <div className={styles.mainDopInfo}>
                        <p> Лорем испум Лорем испум Лорем испум Лорем испум Лорем испум Лорем испум Лорем испум Лорем испум</p>
                        <div className={`${styles.mainDopInfoBlock} `}>
                            <div className={`${styles.firstBlock} ${styles.glass2}`}>

                            </div>
                            <div className={styles.secondBlock}>
                                <div className={`${styles.thirdBlock} ${styles.glass2}`}>

                                </div>
                                <div className={`${styles.fourthBlock}`}>
                                    <div className={` ${styles.glass2}`}>

                                    </div>
                                    <div className={` ${styles.glass2}`}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>

                <div>
                    <Footer />
                </div>
            </div>



        </>
    )
}

function InfoCard() {

    return (
        <>
            <div className={styles.cardContainer}>
                <div className={styles.cardName}>
                    <p>Возможности</p>
                </div>
                <div className={styles.cardInfo}>
                    <div className={`${styles.mainCardInfo} ${styles.glass}`}>
                        <p>
                            Учиться
                        </p>
                        <div>
                            <p>
                                На Theta вы можете как обучаться, так и обучать. Познавайте новое или делитесь опытом.
                            </p>
                        </div>
                    </div>
                    <div className={`${styles.dopCardInfo} `}>
                        <div className={styles.glass}>
                            <p>Обучать</p>
                        </div>
                        <div className={styles.glass}>
                            <p>Практикаы</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}




export default observer(Landing)