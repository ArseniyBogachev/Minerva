import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputMultiple.module.scss"

const InputMultipleRadio = (props) => {
    function checkRadio(i) {
        if (props.answers[props.id].answer) {
            return props.answers[props.id].answer.some(item => item === Number(i))
        }
        return false
    }

    function updateStateCheckbox(i) {
        if (props.updateAnswersForm) {
            if (props.answers[props.id].answer.some((item) => item === Number(i))) {
                props.answers[props.id].answer.splice(props.answers[props.id].answer.indexOf(i), 1)
            }
            else {
                props.answers[props.id].answer.push(i)
            }
            props.updateAnswersForm(props.answers[props.id].answer, props.id)
        }            
    }

    return (
        <div className={classes.main}>
            {props.optionAnswer.map((item, i) => 
                <div class="form-check" key={i}>
                    <input 
                        class="form-check-input" 
                        type="checkbox" 
                        name={`inputMultiple_${props.postfix}`} 
                        id={`inputMultiple_${props.postfix}`}
                        value={i} 
                        checked={props.answers ? checkRadio(i) : false}
                        onChange={() => updateStateCheckbox(i)}
                    />
                    <label class="form-check-label" for={`inputMultiple_${props.postfix}`}>{item.text}</label>
                </div>
            )}
        </div>
    )
}

export default InputMultipleRadio;