import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import classes from "../assets/styles/forms.module.scss"
import MyButton from "../components/MyButton.jsx";
import MyInput from "../components/MyInput.jsx";
import { FormsData, UserData } from "../context";
import { removeFormApi } from "../hooks/api/formApi.js";

const Forms = () => {
    const navigate = useNavigate();
    const {forms, setForms} = useContext(FormsData);
    const {user, setUser} = useContext(UserData);
    const [stateLoading, setStateLoading] = useState(false);

    const response = ms => {
        return new Promise(r => setTimeout(() => r('response end'), ms))
    };

    function createForm() {
        setStateLoading(true);
        response(1000)
            .then((r) => {
                console.log(r); 
                setStateLoading(false);
                navigate("/forms/edit");
            }
        )
    };

    function editForm(item) {
        navigate("/forms/edit", { 
            state: {
                id: item.id,
                data: item.questions
            }
        });
    };

    function removeForm(id) {
        removeFormApi(id)
            .then((resolve, _) => {
                console.log(resolve);
                setForms([...forms.filter(item => {
                    item.id !== id
                })]);
            })
            .catch(error => console.log(error));
    };

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.panel}>
                    <MyInput placeholder={'Поиск...'}/>
                    <MyButton click={createForm} otherStyle={{width: '200px'}} text={
                        stateLoading ? <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">Загрузка...</span>
                        </div> : 'Создать'
                    }/>
                </div>
                <div className={classes.listForms}>
                    <div className={classes.listForms__columns}>
                        <div className={classes.listForms__columns__item}>Название</div>
                        {/* <div className={classes.listForms__columns__item}>Ответы</div>
                        <div className={classes.listForms__columns__item}>Изменения</div> */}
                    </div>
                    <div className={classes.listForms__forms}>
                        {forms.map((item, i) =>
                            <div className={classes.listForms__forms__item} key={i}>
                                <div className={classes.listForms__forms__item__title} onClick={() => editForm(item)}>{item.title}</div>
                                {/* <div className={classes.listForms__forms__item__answers}>{item.datetime}</div>
                                <div className={classes.listForms__forms__item__update}>{item.update}</div> */}
                                <i class="fa-solid fa-ellipsis-vertical" id="action" data-bs-toggle="dropdown"></i>
                                <ul class="dropdown-menu" aria-labelledby="action">
                                    <li><a class="dropdown-item" onClick={() => navigate(`/forms/${item.id}/`)}>Открыть</a></li>
                                    <li><a class="dropdown-item" onClick={() => navigator.clipboard.writeText(`http://localhost:3000/forms/${item.id}/`)}>Скопировать ссылку</a></li>
                                    <li><a class="dropdown-item" onClick={() => removeForm(item.id)}>Удалить</a></li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forms;