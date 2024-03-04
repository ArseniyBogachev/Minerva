import React, { useState } from "react";
import classes from "../../assets/styles/components/typeAnswer/inputFile.module.scss"

const InputFile = (props) => {
    return (
        <div className={classes.main}>
            <input 
                // id={`file_${props.postfix}`}
                type="file" 
                multiple
                accept="image/*,image/jpeg,video/mp4,video/x-m4v,video/*" 
                className={classes.myModal__dialog__content__body__answer__file}
                // value={file}
                // onChange={event => setFile(event.target.value)}
            ></input> 
        </div>
    )
}

export default InputFile;