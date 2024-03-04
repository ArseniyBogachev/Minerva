import React from "react";
import classes from "../../assets/styles/components/typeAnswer/yesNo.module.scss"

const YesNo = (props) => {
    return (
        <div className={classes.main}>
            <div class="form-check">
                <input class="form-check-input" type="radio" name={`YesOrNo_${props.postfix}`} id="choiceYes"/>
                <label class="form-check-label" for="choiceYes">Да</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name={`YesOrNo_${props.postfix}`} id="choiceNo"/>
                <label class="form-check-label" for="choiceNo">Нет</label>
            </div>
        </div>
    )
}

export default YesNo;