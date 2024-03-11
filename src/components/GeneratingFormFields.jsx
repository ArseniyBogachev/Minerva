import React, { useState } from "react";
import classes from "../assets/styles/generatingFormFields.module.scss";

const GeneratingFormFields = ({newForm, listTypeAnswer}) => {
    return (
        newForm.map((item, i) => 
            <div className={classes.item} key={i}>
                <div className={classes.item__question}>
                    <p className={classes.item__question__text}>{i + 1}) {item.question}</p>
                    <p className={classes.item__question__comment}>{item.comment}</p>
                </div>
                <div className={classes.item__answer}>
                    {
                        listTypeAnswer.find(type => type.id === item.typeAnswer).typeTag({postfix: i, answers: item.optionAnswer})
                    }
                </div>
            </div>
        )  
    )
}

export default GeneratingFormFields;