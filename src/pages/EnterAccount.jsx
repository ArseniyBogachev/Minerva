import React, { useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import classes from "../assets/styles/enterAccount.module.scss";
import MyInput from "../components/MyInput.jsx";
import MyButton from "../components/MyButton.jsx";
import { UserData } from "../context";
import { logIn, completeRegistration } from "../hooks/api/enterAccountApi.js";

const EnterAccount = () => {
    const [enter, setEnter] = useState("login");
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [login, setLogin] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");
    const [password, setPassword] = useState("");
    const [repiedPassword, setRepiedPassword] = useState("");

    const {user, setUser} = useContext(UserData);
    const [cookies, setCookie, removeCookie] = useCookies(["user"]);

    function cleanState() {
        setEmail("");
        setPhone("");
        setLogin("");
        setSurname("");
        setPatronymic("");
        setPassword("");
        setRepiedPassword("");
    };

    function selectTag(tag) {
        setEnter(tag);
        cleanState();
    };

    async function createUser() {
        const response = await completeRegistration({
            // email: email,
            // phone: phone,
            login: login,
            // surname: surname,
            // patronymic: patronymic,
            password: password,
            repiedPassword: repiedPassword
        });

        if (response.status === 200) {
            setUser({
                email: email,
                phone: phone,
                login: login,
                surname: surname,
                patronymic: patronymic,
                password: password,
            });
            setCookie("token", response.data.token);
            cleanState();
            navigate("/");
        }
        else {
            console.log("Error")
        }
    };

    async function logInToAccount() {
        const response = await logIn(login, password)

        if (response.status === 200) {
            setCookie("token", response.data.token);
            cleanState();
            setUser({
                login: login
            })
            navigate("/")
            // window.location.reload()
        }
        else {
            console.log(response)
        }      
    }

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.tabs}>
                    <ul class="nav nav-tabs">
                        <li class="nav-item" onClick={() => selectTag("login")}>
                            <a className={enter === "login" ? "nav-link active" : "nav-link"} aria-current="page">Авторизация</a>
                        </li>
                        <li class="nav-item" onClick={() => selectTag("register")}>
                            <a className={enter === "register" ? "nav-link active" : "nav-link"}>Регитрация</a>
                        </li>
                    </ul>
                </div>
                <div className={classes.content}>
                    <div className={classes.content__wrapper}>
                        {enter === 'login' ? <div className={classes.content__wrapper__login}>
                            <div className={classes.content__wrapper__login__header}>
                                <h3>Войти в аккаунт</h3>
                            </div>
                            <div className={classes.content__wrapper__login__body}>
                                <MyInput placeholder={"Логин"} otherMainStyle={{width: "100%", height: "20%"}} otherInputStyle={{width: "100%"}} value={login} change={setLogin}/>
                                <MyInput type={"password"} placeholder={"Пароль"} otherMainStyle={{width: "100%", height: "20%"}} otherInputStyle={{width: "100%"}} value={password} change={setPassword}/>
                            </div>
                            <div className={classes.content__wrapper__login__footer}>
                                <MyButton 
                                    text={"Войти"} 
                                    otherStyle={{height: "50%", width: "20%"}} 
                                    click={logInToAccount}
                                />
                            </div>
                        </div> : 
                        <div className={classes.content__wrapper__register}>
                            <div className={classes.content__wrapper__register__header}>
                                <h3>Зарегестрировать учетную запись</h3>
                            </div>
                            <div className={classes.content__wrapper__register__body}>
                                <MyInput placeholder={"Email"} otherMainStyle={{width: "100%", height: "15%"}} otherInputStyle={{width: "100%"}} value={email} change={setEmail}/>
                                <MyInput placeholder={"Номер телефона"} otherMainStyle={{width: "100%", height: "15%"}} otherInputStyle={{width: "100%"}} value={phone} change={setPhone}/>
                                <div className={classes.content__wrapper__register__body__fio}>
                                    <MyInput placeholder={"Логин"} otherMainStyle={{width: "32%", height: "100%"}} otherInputStyle={{width: "100%"}} value={login} change={setLogin}/>
                                    <MyInput placeholder={"Фамилия"} otherMainStyle={{width: "32%", height: "100%"}} otherInputStyle={{width: "100%"}} value={surname} change={setSurname}/>
                                    <MyInput placeholder={"Отчество (при наличии)"} otherMainStyle={{width: "32%", height: "100%"}} otherInputStyle={{width: "100%"}} value={patronymic} change={setPatronymic}/>
                                </div>                                
                                <MyInput type={'password'} placeholder={"Пароль"} otherMainStyle={{width: "100%", height: "15%"}} otherInputStyle={{width: "100%"}} value={password} change={setPassword}/>
                                <MyInput type={'password'} placeholder={"Повторите пароль"} otherMainStyle={{width: "100%", height: "15%"}} otherInputStyle={{width: "100%"}} value={repiedPassword} change={setRepiedPassword}/>
                            </div>
                            <div className={classes.content__wrapper__register__footer}>
                                <MyButton text={"Создать"} otherStyle={{height: "100%", width: "20%"}} click={() => createUser()}/>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EnterAccount;