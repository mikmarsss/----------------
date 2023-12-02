import React, { useContext, useState } from "react";
import styles from '../styles/landing.module.css'
import { Context } from "..";
import { observer } from "mobx-react-lite";
import Image from "./Image";
import logo from "../Images/logo.svg"
import book1 from "../Images/book1.svg"
import book2 from "../Images/book2.svg"
import calendar from "../Images/calendar.svg"
import bookforbutt from "../Images/bookforbutt.svg"
import work from "../Images/work.svg"
import freelance from "../Images/freelance.svg"
import first from "../Images/01.svg"
import second from "../Images/02.svg"
import third from "../Images/03.svg"
import Footer from "./Footer";
import RegForm from "./RegForm";
import VhodForm from "./VhodForm";
import { Link } from "react-router-dom";
function Landing({ onSelectedFunc, hide, onSetHide }) {

    const { store } = useContext(Context)
    const [showBlockFirst, setShowBlockFirst] = useState(null)
    const [showBlockSecond, setShowBlockSecond] = useState(null)
    const [showVhodBlock, setShowVhodBlock] = useState(null)
    const [showRegBlock, setShowRegBlock] = useState(null)

    const handleClickNavFirst = (showBlockFirst) => {
        const shown = showBlockFirst === "show" ? null : "show"
        setShowBlockFirst(shown)
    }

    const handleClickNavSecond = (showBlockSecond) => {
        const shownn = showBlockSecond === "show" ? null : "show"
        setShowBlockSecond(shownn)
    }

    const regHandleClick = (showRegBlock) => {
        setShowRegBlock(showRegBlock)
    }

    const vhodHandleClick = (showVhodBlock) => {
        setShowVhodBlock(showVhodBlock);
    }

    return (
        <>

            <div className={`${showRegBlock === "show" ? styles.showReg : styles.non}`}>
                <RegForm showRegBlock={showRegBlock} onShowRegBlock={regHandleClick} />
            </div>
            <div className={`${(showVhodBlock === "show") ? styles.showVhod : styles.non}`}>
                <VhodForm showVhodBlock={showVhodBlock} onShowVhodBlock={vhodHandleClick} />
            </div>

            <div className={styles.header}>
                <div className={styles.navBar}>
                    <div className={styles.logo}>
                        <button>
                            <Link to="/catalog">
                                <Image image={logo} alt={"logo"} />
                            </Link>
                        </button>
                    </div>
                    <div className={styles.dropdownButtons} >
                        <div className={styles.course}>
                            <button onClick={() => handleClickNavFirst(showBlockFirst)} className={styles.navButtuns}>Курсы</button>
                            <div className={`${styles.workContainer} ${showBlockFirst === "show" ? styles.showSecond : ''}`}>
                                <button>
                                    <Link to="/catalog" style={{ textDecoration: 'none', color: 'white' }}>
                                        Учиться
                                    </Link>
                                </button>
                                <button>
                                    <Link to="/create" style={{ textDecoration: 'none', color: 'white' }}>
                                        Создать
                                    </Link></button>
                            </div>
                        </div>
                        <div className={styles.work}>
                            <button onClick={() => handleClickNavSecond(showBlockSecond)} className={styles.navButtuns} >Работа</button>
                            <div className={`${styles.workContainer} ${showBlockSecond === "show" ? styles.showSecond : ''}`}>
                                <button onClick={() => onSelectedFunc("workBlock")}>Фриланс</button>
                                <button onClick={() => onSelectedFunc("workBlock")}>Фул тайм</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.book2img}>
                        <Image image={book2} alt={"book"} />
                    </div>
                    <div className={styles.book1img}>
                        <Image image={book1} alt={"book"} />
                    </div>
                    <div className={styles.calendar}>
                        <Image image={calendar} alt={"book"} />
                    </div>
                    <div >
                        <div className={styles.container}>
                            <div>
                                <div className={styles.auth}>
                                    <button className={styles.navButtuns} onClick={() => vhodHandleClick("show")}>
                                        Вход
                                    </button>
                                    <button className={styles.navButtuns} onClick={() => regHandleClick("show")} >
                                        Регистрация
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div >
                    <h1 className={styles.slogan}>ОЧЕНЬ <br /> ЦЕПЛЯЮЩИЙ <br /> СЛОГАН</h1>
                    <p className={styles.opisanie}>Невероятно креативный текст, почему мы <br /> такие крутые и вообще просто жми на кнопку</p>
                </div>
                <div className={styles.buttons}>
                    <button onClick={() => vhodHandleClick("show")} className={styles.trybutton}>ПОПРОБОВАТЬ</button>
                    <button className={styles.watchvideobutton}>ВИДЕО</button>
                </div>
            </div>

            <div>
                <h1 className={styles.offer}>ЧТО МЫ ПРЕДЛАГАЕМ?</h1>
            </div>
            {/* <div className={styles.fon}>
            </div> */}
            <div className={styles.opportunities}>
                <button className={styles.Block}>
                    <Image image={bookforbutt} alt={"book"} />
                    <div>КУРСЫ</div>
                </button>
                <button className={styles.Blockwork}>
                    <Image image={work} alt={"book"} />
                    <div>РАБОТА</div>
                </button>
                <button className={styles.Block}>
                    <Image image={freelance} alt={"book"} />
                    <div>ФРИЛАНС</div>
                </button>
            </div>

            {/* <div className={styles.fon2}>
            </div> */}
            <div className={styles.whymeContainer}>
                <div className={styles.whyme}>
                    <h1 className={styles.whyMeh1}>
                        ПОЧЕМУ ИМЕННО МЫ?
                    </h1>
                    <div className={styles.blockopp}>
                        <div>
                            <Image image={first} alt={"01"} />
                            <p>Рыба рыба рыба рыба</p>
                        </div>
                        <div>
                            <Image image={second} alt={"02"} />
                            <p>Рыба рыба рыба рыба</p>
                        </div>
                        <div>
                            <Image image={third} alt={"03"} />
                            <p>Рыба рыба рыба рыба</p>
                        </div>
                    </div>
                </div>

            </div>
            {/* <div className={styles.fon3}></div> */}
            <div className={styles.tryuscontainer}>
                <div className={styles.tryustext}>
                    <p>УЖЕ НЕ ТЕРПИТСЯ ПОПРОБОВАТЬ?</p>
                    <span>Скорее присоединяйся</span>
                </div>
                <button onClick={() => vhodHandleClick("show")} className={styles.trybutton2}>ПРИСОЕДЕНИТЬСЯ</button>
            </div>

            <Footer />

        </>
    )
}




export default observer(Landing)