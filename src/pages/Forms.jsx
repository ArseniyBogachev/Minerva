import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import classes from "../assets/styles/forms.module.scss"
import MyButton from "../components/MyButton.jsx";
import MyInput from "../components/MyInput.jsx";
import { FormsData } from "../context";

const Forms = () => {
    const navigate = useNavigate()
    const {forms, setForms} = useContext(FormsData);
    const [stateLoading, setStateLoading] = useState(false)

    const response = ms => {
        return new Promise(r => setTimeout(() => r('response end'), ms))
    }

    function createForm() {
        setStateLoading(true);
        // Эмуляция пост запроса
        response(1000)
            .then((r) => {
                console.log(r); 
                setStateLoading(false);
                navigate("/new");
            }
        )
    }

    function editForm(item) {
        navigate("/new", { 
            state: {
                id: item.id,
                data: item.listAnswer
            }
        });
    }

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
                        <div className={classes.listForms__columns__item}>Ответы</div>
                        <div className={classes.listForms__columns__item}>Изменения</div>
                    </div>
                    <div className={classes.listForms__forms}>
                        {forms.map((item, i) =>
                            <div className={classes.listForms__forms__item} key={i}>
                                <div className={classes.listForms__forms__item__title} onClick={() => editForm(item)}>{item.title}</div>
                                <div className={classes.listForms__forms__item__answers}>{item.answers}</div>
                                <div className={classes.listForms__forms__item__update}>{item.update}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forms;