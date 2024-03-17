import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../assets/styles/viewForm.module.scss";
import { FormsData, TypeAnswerData } from "../context";
import GeneratingFormFields from "../components/GeneratingFormFields.jsx";
import MyButton from "../components/MyButton.jsx";

const ViewForm = () => {
    const navigate = useNavigate();
    const { formId } = useParams();
    const {forms, setForms} = useContext(FormsData);
    const {listTypeAnswer, setListTypeAnswer} = useContext(TypeAnswerData);

    function newForm() {
        return forms.find(item => item.id === Number(formId))
    };

    const [answers, setAnswers] = useState(
        newForm() ? newForm().listAnswer.map(item => (
            {id: item.id, answer: []}
        )) : ""
    );

    function updateAnswersForm(value, id) {
        setAnswers(
            answers.map((item, i) => {
                if (id === i) {
                    item.answer = value;
                }
                return item
            })
        )
    };

    return (
        <div className={classes.main}>
            {newForm() ? 
            <div className={classes.wrapper}>
                <div className={classes.form}>
                    <div className={classes.form__header}>
                        <div className={classes.form__header__title}>
                            <span>{newForm().title}</span>
                        </div>
                        <div className={classes.form__header__id}>
                            <span>#{formId}</span>
                        </div>
                    </div>
                    <div className={classes.form__content}>
                        <GeneratingFormFields newForm={newForm().listAnswer} listTypeAnswer={listTypeAnswer} answers={answers} updateAnswersForm={updateAnswersForm}/>
                    </div>
                </div>
                <div className={classes.footer}>
                    <MyButton text={"Отправить"}/>
                    <MyButton text={"Отмена"} backgroundColor={"rgb(180, 180, 180)"} click={() => console.log(answers)}/>
                </div>                 
            </div> :
            <div className={classes.wrapper}>
                <div className={classes.form}>
                    <div className={classes.form__unexists}>
                        <span>Форма с идентификатором #{formId} отсутствует.</span>
                    </div>
                </div>                 
            </div>}
        </div>     
    )
}

export default ViewForm;