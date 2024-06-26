import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../assets/styles/profile.module.scss";
import MyButton from "../components/MyButton.jsx";
import { UserData } from "../context";
import { useCookies } from "react-cookie";
import { verifyUserApi } from "../hooks/api/enterAccountApi.js";
import { editUserApi } from "../hooks/api/profileApi.js";

const Profile = () => {
    const [edit, setEdit] = useState(true);
    const {user, setUser} = useContext(UserData);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [login, setLogin] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");

    const [cookies, setCookies, removeCookies] = useCookies(["user"]);
    const navigate = useNavigate();

    useEffect(() => {
        async function verifyUser() {
            const response = await verifyUserApi(cookies.token);

            if (response) {
                if (response.status === 200) {
                    setUser(response.data);
                    setEmail(response.data.email);
                    setPhone(response.data.phone);
                    setLogin(response.data.login);
                    setFirst_name(response.data.first_name);
                    setLast_name(response.data.last_name);
                }
                else {
                    console.log(response)
                }
            }
        }

        verifyUser()
    }, [])

    function choiceInput(key) {
        switch (key) {
            case "email":
                return {get: email, set: setEmail}
            case "phone":
                return {get: phone, set: setPhone}
            case "login":
                return {get: login, set: setLogin}
            case "last_name":
                return {get: last_name, set: setLast_name}
            case "first_name":
                return {get: first_name, set: setFirst_name}
        }
    }

    async function editUser() {
        if (edit) {
            setEdit(!edit)
        }
        else {
            const response = await editUserApi(cookies.token, {
                login: login,
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
                is_admin: user.is_admin
            })

            if (response.status === 200) {
                setUser({
                    login: login,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    is_admin: user.is_admin
                })
                setEdit(!edit)
            }           
        }        
    };

    function exitAccount() {
        removeCookies("token");
        setUser(false);
        navigate("/");
    }

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.profile}>
                    {/* {user.is_admin ? <div className={classes.profile__linkAdmin}>
                        <span onClick={() => navigate("/admin")}>Админ панель</span>
                    </div> : <div></div>} */}
                    <div className={classes.profile__wrapper}>
                        <div className={classes.profile__wrapper__header}>
                            <h3>Ваши данные</h3>
                            <div className={classes.profile__wrapper__header__btn}>
                                {user.is_admin ? <MyButton 
                                    text={
                                        edit ? 
                                        <span>Редактировать <i class="fa-solid fa-pen"></i></span> : 
                                        <span>Сохранить <i class="fa-solid fa-floppy-disk"></i></span>
                                    } 
                                    backgroundColor={edit ? "rgb(200, 200, 200)" : ""}
                                    click={() => editUser()}/>  : <div>Запросите изменение профиля у администратора</div>}
                                <MyButton 
                                    text={
                                        <span>Выйти</span>
                                    } 
                                    backgroundColor={edit ? "rgb(252, 151, 151)" : ""}
                                    click={() => exitAccount()}/>
                            </div>
                            
                        </div>
                        <div className={classes.profile__wrapper__body}>
                            {Object.keys(user).map(key => key !== "is_admin" ? <div className={classes.profile__wrapper__body__item}>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">{key}</span>
                                    <input 
                                        type="text" 
                                        class="form-control shadow-none" 
                                        value={choiceInput(key).get} 
                                        pattern={key === "email" ? "+[7-8]{1}[0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}" : ""} 
                                        disabled={edit} 
                                        onChange={(e) => choiceInput(key).set(e.target.value)}
                                        required={key !== "patronymic" ? true : false}/>
                                </div>
                            </div> : <div></div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;