import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import classes from "../assets/styles/home.module.scss";
import MyButton from "../components/MyButton.jsx";
import MyInput from "../components/MyInput.jsx";

const Home = () => {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  return (
    <div className={classes.main}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.header__top}>
            Кажется вы попали на общую страницу.
          </div>
          <div className={classes.header__bottom}>
            Чтобы перейти к форме введите токен ниже или снова перейдите по
            ссылке.
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.content__title}>
            <div className={classes.content__title__wrapper}>
              <h3>Перейти к нужной форме</h3>
            </div>
          </div>
          <div className={classes.content__token}>
            <div className={classes.content__token__wrapper}>
              <MyInput
                placeholder={"Введите токен формы..."}
                otherMainStyle={{ width: "100%" }}
                otherInputStyle={{ width: "100%" }}
                value={token}
                change={(e) => setToken(e)}
              />
            </div>
          </div>
          <div className={classes.content__search}>
            <div className={classes.content__search__wrapper}>
              <MyButton
                text={"Найти форму"}
                click={() => navigate(`/forms/${token}`)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
