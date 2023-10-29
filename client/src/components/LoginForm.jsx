import React, { useContext, useState } from "react";
import styles from "../styles/loginForm.module.css"
import { Context } from "..";

export default function LoginForm({ showLogForm }) {
    return (
        <LogForm
            showLogForm={showLogForm}
        />
    )
}

function LogForm({ regVhod }) {
    const { store } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const name = regVhod === "vhod" ? "Войти" : "Зарегистрироваться"
    return (
        <>
            <div className={styles.container}>
                <div className={styles.buttons}>
                    <h1>
                        {regVhod === "vhod" ? "Вход" : "Регистрация"}
                    </h1>
                </div>
                <div className={styles.inputfields}>
                    <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        placeholder="Email"
                        type="text" />
                    <input
                        type="text"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder="Password"

                    />
                </div>
                <div className={styles.latsgo}>
                    <button onClick={regVhod === "vhod" ? () => store.login(email, password) : () => store.registration(email, password)}>
                        {name}
                    </button>
                </div>
            </div>
        </>
    )
}