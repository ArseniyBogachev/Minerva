import React from "react";
import classes from "../assets/styles/components/previewModal.module.scss";
import GeneratingFormFields from "./GeneratingFormFields.jsx";

const PreviewModal = ({listBlock, listTypeAnswer}) => {
    return (
        <div class="modal fade modal-lg" className={classes.myModal} id="previewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
            <div class="modal-dialog" className={classes.myModal__dialog}>
                <div class="modal-content" className={classes.myModal__dialog__content}>
                    <div class="modal-header" className={classes.myModal__dialog__content__header}>
                        <h5 class="modal-title" id="exampleModalLabel">Форма</h5>
                        <i class="fa-solid fa-xmark" data-bs-dismiss="modal" aria-label="Close"></i>
                    </div>
                    <div class="modal-body" className={classes.myModal__dialog__content__body}>
                        <GeneratingFormFields listBlock={listBlock} listTypeAnswer={listTypeAnswer}/>
                    </div>
                    <div class="modal-footer" className={classes.myModal__dialog__content__footer}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default PreviewModal;