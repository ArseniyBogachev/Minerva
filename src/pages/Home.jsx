import React from "react";
import classes from "../assets/styles/home.module.scss";
import MyButton from "../components/MyButton.jsx";
import MyInput from "../components/MyInput.jsx";

const Home = () => {
    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.header}>
                    <div className={classes.header__top}>Кажется вы попали на общую страницу.</div>
                    <div className={classes.header__bottom}>Чтобы перейти к форме ввелите токен ниже или снова перейдите по ссылке.</div>
                </div>
                <div className={classes.content}>
                    <div className={classes.content__title}>
                        <div className={classes.content__title__wrapper}>
                            <h3>Перейти к нужной форме</h3>
                        </div>                     
                    </div>
                    <div className={classes.content__token}>
                        <div className={classes.content__token__wrapper}>
                            <MyInput placeholder={"Введите токен формы..."} otherMainStyle={{width: "100%"}} otherInputStyle={{width: "100%"}}/>
                        </div>
                    </div>
                    <div className={classes.content__search}>
                        <div className={classes.content__search__wrapper}>
                            <MyButton text={"Найти форму"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;