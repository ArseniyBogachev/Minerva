import React, { useState, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from 'react-router-dom';
import { answersData } from "../context";
import classes from "../assets/styles/answersForm.module.scss";
import { responseDataToListBlock } from "../hooks/sundry/parseListBlock";
import { listFormBlockApi, getAnswersApi } from "../hooks/api/formApi";
import { listUsersApi } from "../hooks/api/adminApi";

const AnswersForm = () => {
    const { formId } = useParams();
    const {answersList, setAnswersList} = useContext(answersData);
    const [data, setData] = useState(false);
    const [cookies, _, __] = useCookies(["user"]);

    useEffect(() => {
        async function getForm() {
            const result = []
            const responseBlocks = await listFormBlockApi(cookies.token, formId);
            const responseAnswers = await getAnswersApi(cookies.token, formId);
            const listUsers = await listUsersApi(cookies.token);
            console.log("responseBlocks", responseBlocks)
            console.log("responseAnswers", responseAnswers)

            if (responseBlocks.status === 200 && responseBlocks.data) {
                const listBlocks = responseDataToListBlock(responseBlocks.data);
                
                if (responseAnswers.data) {
                    for (let item of responseAnswers.data) {
                        const blocks = {
                            user: listUsers.data.find(user => user.id === item.user_id).login,
                            block: []
                        }

                        if (item.data) {
                            for (let i = 0; i < item.data.length; i++) {
                                blocks.block.push({answers: {id: item.data[i][0].Value, answer: item.data[i][1].Value}, question: listBlocks[i]})
                            }
                        }
                        else {
                            for (let i = 0; i < listBlocks.length; i++) {
                                blocks.block.push({answers: [], question: listBlocks[i]})
                            }
                        }

                        result.push(blocks)
                    }   
                    console.log("result", result)
                }

                setData(result)
            }
            else {
                console.log(responseBlocks)
            }
        };

        getForm()
    }, []);

    return (
        <div className={classes.main}>
            <div className={classes.wrapper}>
                <div className={classes.answers}>
                    <div className={classes.answers__wrapper}>
                        <div className={classes.answers__wrapper__header}>
                            <h3>Ответы</h3>
                        </div>
                        <div className={classes.answers__wrapper__body}>
                            {data ? 
                                data.map((item, i) => 
                                    <div className={classes.answers__wrapper__body__item} key={i}>
                                        <div className={classes.answers__wrapper__body__item__user} data-bs-toggle={"modal"} data-bs-target={`#answersModal${i}`}>
                                            {item.user}
                                        </div>

                                        <div class="modal fade myModal" className={classes.myModal} id={`answersModal${i}`} tabIndex="-1" aria-labelledby="exampleModalLabel" data-bs-backdrop="static" aria-hidden="true">
                                            <div class="modal-dialog myModal__dialog" className={classes.myModal__dialog}>
                                                <div class="modal-content" className={classes.myModal__dialog__content}>
                                                    <div class="modal-body" className={classes.myModal__dialog__content__body}>


                                                        {item.block.map((block, i) => 
                                                        <div className={classes.myModal__item} key={i}>
                                                            <div className={classes.myModal__item__question}>
                                                                <p className={classes.myModal__item__question__text}>{block.question.question}</p>
                                                                <p className={classes.myModal__item__question__comment}>{block.question.comment}</p>
                                                            </div>
                                                            <div className={classes.myModal__item__answer}>
                                                                <p className={classes.myModal__item__question__text}>Ответ: {block.answers.answer}</p>
                                                            </div>
                                                        </div>)}
                                                    </div>
                                                    <div class="modal-footer myModal__dialog__content__footer" className={classes.myModal__dialog__content__footer}>
                                                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Отмена</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            : <div>Ответов нет</div>}


                            {/* <MyButton text={'Предпросмотр'} backgroundColor={'rgb(225, 225, 225)'} toggle={"modal"} target={"#previewModal"}/>
                            {data ? <div className={classes.answers__wrapper__body__item}></div> */}
                            {/* {data ? 
                                data.map((item, i) => 
                                    <div className={classes.answers__wrapper__body__item} key={i}>
                                        <div className={classes.answers__wrapper__body__item__question}>
                                            <p className={classes.answers__wrapper__body__item__question__text}>{i + 1}) {item.question.question}</p>
                                            <p className={classes.item__question__comment}>{item.question.comment}</p>
                                        </div>
                                        <div className={classes.answers__wrapper__body__item__answer}>
                                            <p className={classes.answers__wrapper__body__item__question__text}>Ответ: {item.answers.answer}</p>
                                        </div>
                                    </div>
                                )
                            : <div>Ответов нет</div>} */}
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnswersForm;