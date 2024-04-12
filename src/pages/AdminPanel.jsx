import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../assets/styles/adminPanel.module.scss";

const AdminPanel = () => {
    const [token, setToken] = useState("");
    const navigate = useNavigate();

    const [users, setUsers] = useState([
        {
          "email": "senya.bogachev@mail.ru",
          "first_name": "Арсений",
          "id": "1",
          "is_admin": false,
          "last_name": "Богачев",
          "login": "Ars",
          "phone": "89110128244"
        },
        {
            "email": "dasha@mail.ru",
            "first_name": "Дарья",
            "id": "1",
            "is_admin": false,
            "last_name": "Утешева",
            "login": "dasha",
            "phone": "89111032339"
        },
        {
            "email": "kirik@mail.ru",
            "first_name": "Кирилл",
            "id": "string",
            "is_admin": false,
            "last_name": "Жердев",
            "login": "Kirik",
            "phone": "89110045673"
        }
      ])

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.admin}>
                    <div className={classes.admin__linkProfile}>
                        <span onClick={() => navigate("/profile")}>Профиль</span>
                    </div>
                    <div className={classes.admin__wrapper}>
                        <div className={classes.admin__wrapper__header}>
                            <h3>Пользователи</h3>
                            
                        </div>
                        <div className={classes.admin__wrapper__body}>
                            <div className={classes.admin__wrapper__body__columns}>
                                <div className={classes.admin__wrapper__body__columns__item}>Логин</div>
                                <div className={classes.admin__wrapper__body__columns__item}>Фамилия</div>
                                <div className={classes.admin__wrapper__body__columns__item}>Email</div>
                            </div>
                            <div className={classes.admin__wrapper__body__users}>
                                {users.map(item => 
                                    <div className={classes.admin__wrapper__body__users__item}>
                                        <div className={classes.admin__wrapper__body__users__item__link}>{item.login}</div>
                                        <div className={classes.admin__wrapper__body__users__item__info}>{item.last_name}</div>
                                        <div className={classes.admin__wrapper__body__users__item__info}>{item.email}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;