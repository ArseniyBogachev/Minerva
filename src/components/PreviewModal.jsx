import React from "react";
import classes from "../assets/styles/components/previewModal.module.scss";

const PreviewModal = ({newForm, listTypeAnswer}) => {
    // const [file, setFile] = useState('');
    // const [value, setValue] = useState('');

    return (
        <div class="modal fade modal-lg" className={classes.myModal} id="previewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
            <div class="modal-dialog" className={classes.myModal__dialog}>
                <div class="modal-content" className={classes.myModal__dialog__content}>
                    <div class="modal-header" className={classes.myModal__dialog__content__header}>
                        <h5 class="modal-title" id="exampleModalLabel">Форма</h5>
                        <i class="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
                    </div>
                    <div class="modal-body" className={classes.myModal__dialog__content__body}>
                        {newForm.map((item, i) => 
                            <div className={classes.myModal__dialog__content__body__item} key={i}>
                                <div className={classes.myModal__dialog__content__body__item__question}>
                                    <p className={classes.myModal__dialog__content__body__item__question__text}>{i + 1}) {item.question}</p>
                                    <p className={classes.myModal__dialog__content__body__item__question__comment}>{item.comment}</p>
                                </div>
                                <div className={classes.myModal__dialog__content__body__item__answer}>
                                    {
                                        listTypeAnswer.find(type => type.id === item.typeAnswer).typeTag({postfix: i, answers: item.optionAnswer})
                                    }
                                </div>
                            </div>
                        )} 
                    </div>
                    <div class="modal-footer" className={classes.myModal__dialog__content__footer}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewModal;