import React, { useState } from "react";
import classes from "../../assets/styles/components/typeAnswer/dropDownList.module.scss"

const DropDownList = ({postfix, optionAnswer, answers, updateAnswersForm}) => {
    console.log(optionAnswer)
    return (
        <div className={classes.main}>
            <select 
                value={answers ? answers[postfix].answer : ""} 
                onChange={updateAnswersForm ? (e) => updateAnswersForm(Number(e.target.value), postfix) : () => {}}
            >
                {optionAnswer.map((item, i) => 
                    // <option value={item.id ? item.id : item[0].Value} key={i}>{item.text ? item.text : item[1].Value}</option>
                    <option value={item.id} key={i}>{item.text}</option>
                )}
            </select>
        </div>
    )
}

export default DropDownList;