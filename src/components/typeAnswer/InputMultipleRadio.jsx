import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputMultiple.module.scss"

const InputMultipleRadio = ({postfix, optionAnswer, answers, updateAnswersForm}) => {
    function checkRadio(value) {
        if (answers[postfix].answer) {
            return answers[postfix].answer.some(item => item === value)
        }
        return false
    }

    function updateStateCheckbox(value) {
        if (updateAnswersForm) {
            if (answers[postfix].answer.some((item) => item === value)) {
                answers[postfix].answer.splice(answers[postfix].answer.indexOf(value), 1)
            }
            else {
                answers[postfix].answer.push(value)
            }
            updateAnswersForm(answers[postfix].answer, postfix)
        }            
    }

    return (
        <div className={classes.main}>
            {optionAnswer.map((item, i) => 
                <div class="form-check" key={i}>
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        name={`inputMultiple_${postfix}`} 
                        id={`inputMultiple_${postfix}`}
                        value={item.text} 
                        checked={answers ? checkRadio(item.text) : false}
                        onChange={() => updateStateCheckbox(item.text)}
                    />
                    {/* <label class="form-check-label" for={`inputMultiple_${postfix}`}>{item.text ? item.text : item[1].Value}</label> */}
                    <label class="form-check-label" for={`inputMultiple_${postfix}`}>{item.text}</label>
                </div>
            )}
        </div>
    )
}

export default InputMultipleRadio;