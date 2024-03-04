import React from "react";
import classes from "../../assets/styles/components/typeAnswer/inputDate.module.scss"

const InputDate = (props) => {
    return (
        <div className={classes.main}>
            <input type="datetime-local" />
        </div>
    )
}

export default InputDate;