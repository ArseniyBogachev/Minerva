import React, { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "../assets/styles/viewForm.module.scss";
import { FormsData, TypeAnswerData } from "../context";
import GeneratingFormFields from "../components/GeneratingFormFields.jsx";

const ViewForm = () => {
    const navigate = useNavigate();
    const { formId } = useParams();
    const {forms, setForms} = useContext(FormsData);
    const {listTypeAnswer, setListTypeAnswer} = useContext(TypeAnswerData);

    function newForm() {
        const searchForm = forms.find(item => item.id === Number(formId))

        if (searchForm) {
            return searchForm.listAnswer
        }
        return []
    }

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.form}>
                    <div className={classes.form__header}>

                    </div>
                    <div className={classes.form__content}>
                        <GeneratingFormFields newForm={newForm()} listTypeAnswer={listTypeAnswer}/>
                    </div>
                    <div className={classes.form__footer}>

                    </div>
                </div>                 
            </div>
        </div>     
    )
}

export default ViewForm;