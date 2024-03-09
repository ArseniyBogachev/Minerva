import React, { useState, useContext } from "react";
import classes from "../assets/styles/profile.module.scss";
import MyButton from "../components/MyButton.jsx";
import { UserData } from "../context";

const Profile = () => {
    const [edit, setEdit] = useState(true);
    const {user, setUser} = useContext(UserData);

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [patronymic, setPatronymic] = useState("");

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.profile}>
                    <div className={classes.profile__wrapper}>
                        <div className={classes.profile__wrapper__header}>
                            <h3>Ваши данные</h3>
                            <MyButton 
                                text={
                                    edit ? 
                                    <span>Редактировать <i class="fa-solid fa-pen"></i></span> : 
                                    <span>Сохранить <i class="fa-solid fa-floppy-disk"></i></span>
                                } 
                                backgroundColor={edit ? "rgb(200, 200, 200)" : ""}
                                click={() => setEdit(!edit)}/>
                        </div>
                        <div className={classes.profile__wrapper__body}>
                            {Object.keys(user).map(key => key !== "password" ? <div className={classes.profile__wrapper__body__item}>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">{key}</span>
                                    <input 
                                        type="text" 
                                        class="form-control shadow-none" 
                                        value={user[key]} 
                                        pattern={key === "email" ? "+[7-8]{1}[0-9]{3} [0-9]{3}-[0-9]{2}-[0-9]{2}" : ""} 
                                        disabled={edit} 
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