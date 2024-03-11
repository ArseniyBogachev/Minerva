import React, { useState, useContext } from "react";
import classes from "../assets/styles/profile.module.scss";
import MyButton from "../components/MyButton.jsx";
import { UserData } from "../context";

const Profile = () => {
    const [edit, setEdit] = useState(true);
    const {user, setUser} = useContext(UserData);

    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);
    const [patronymic, setPatronymic] = useState(user.patronymic);

    function choiceInput(key) {
        switch (key) {
            case "email":
                return {get: email, set: setEmail}
            case "phone":
                return {get: phone, set: setPhone}
            case "name":
                return {get: name, set: setName}
            case "surname":
                return {get: surname, set: setSurname}
            case "patronymic":
                return {get: patronymic, set: setPatronymic}
        }
    }

    function editUser() {
        if (edit) {
            setEdit(!edit)
        }
        else {
            setUser({
                email: email,
                phone: phone,
                name: name,
                surname: surname,
                patronymic: patronymic
            })
            setEdit(!edit)
        }        
    }

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
                                click={() => editUser()}/>
                        </div>
                        <div className={classes.profile__wrapper__body}>
                            {Object.keys(user).map(key => key !== "password" ? <div className={classes.profile__wrapper__body__item}>
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