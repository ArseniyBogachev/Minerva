import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputMultiple.module.scss"

const InputMultipleRadio = ({postfix, optionAnswer, answers, updateAnswersForm}) => {
    function checkRadio(i) {
        if (answers[postfix].answer) {
            return answers[postfix].answer.some(item => item === Number(i))
        }
        return false
    }

    function updateStateCheckbox(i) {
        if (updateAnswersForm) {
            if (answers[postfix].answer.some((item) => item === Number(i))) {
                answers[postfix].answer.splice(answers[postfix].answer.indexOf(i), 1)
            }
            else {
                answers[postfix].answer.push(i)
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
                        value={i} 
                        checked={answers ? checkRadio(i) : false}
                        onChange={() => updateStateCheckbox(i)}
                    />
                    {/* <label class="form-check-label" for={`inputMultiple_${postfix}`}>{item.text ? item.text : item[1].Value}</label> */}
                    <label class="form-check-label" for={`inputMultiple_${postfix}`}>{item.text}</label>
                </div>
            )}
        </div>
    )
}

export default InputMultipleRadio;