import React, { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import classes from "../assets/styles/forms.module.scss"
import MyButton from "../components/MyButton.jsx";
import MyInput from "../components/MyInput.jsx";
import { FormsData, UserData } from "../context";
import { listFormsApi, createFormApi, removeFormApi, newFormTokenApi } from "../hooks/api/listFormsApi.js";

const Forms = () => {
    const navigate = useNavigate();
    const {forms, setForms} = useContext(FormsData);
    const {user, setUser} = useContext(UserData);
    const [stateLoading, setStateLoading] = useState(false);

    const [cookies, _, __] = useCookies(["user"]);

    useEffect(() => {
        async function listForms() {
            const response = await listFormsApi(cookies.token);

            if (response.data) {
                setForms(response.data)
            }
            else if (response.status === 200 && response.data) {
                setForms([])
            }
            else {
                console.log(response)
            }
        };

        listForms();
    }, [])

    async function createForm() {
        setStateLoading(true);
        const response = await createFormApi(cookies.token);
        console.log("response", response)
        setStateLoading(false);

        if (response.data) {
            const token = await newFormTokenApi(cookies.token, response.data.id)
            console.log("token", token)
            navigate(`/forms/${response.data.id}/edit`)
        }
        else {
            console.log(response)
        }
    };

    function editForm(item) {
        navigate(`/forms/${item.id}/edit`);
    };

    async function removeForm(id) {
        setForms([...forms.filter(item => item.id !== id)]);
        // const response = await removeFormApi(cookies.token, id)

        // if (response.status === 200) {
        //     setForms([...forms.filter(item => item.id !== id)]);
        // }
        // else {
        //     console.log(response)
        // }
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