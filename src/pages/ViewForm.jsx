import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import classes from "../assets/styles/viewForm.module.scss";
import { FormsData, TypeAnswerData } from "../context";
import GeneratingFormFields from "../components/GeneratingFormFields.jsx";
import MyButton from "../components/MyButton.jsx";
import { listFormBlockApi } from "../hooks/api/formApi.js";
import { listFormsApi } from "../hooks/api/listFormsApi.js";
import { responseDataToListBlock } from "../hooks/sundry/parseListBlock.js";

const ViewForm = () => {
    const navigate = useNavigate();
    const { formId } = useParams();
    const {forms, setForms} = useContext(FormsData);
    const {listTypeAnswer, setListTypeAnswer} = useContext(TypeAnswerData);
    const [cookies, _, __] = useCookies(["user"]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [title, setTitle] = useState("");
    

    useEffect(() => {
        async function getForm() {
            const responseForms = await listFormsApi(cookies.token);
            const responseBlocks = await listFormBlockApi(cookies.token, formId);

            if (responseBlocks.status === 200 && responseForms.status === 200 && responseBlocks.data) {
                const listBlocks = responseDataToListBlock(responseBlocks.data);

                setQuestions(listBlocks)
                setAnswers(listBlocks.map(item => (
                    {id: item.id, answer: []}
                )))
                setTitle(responseForms.data.find(item => item.id === formId).title)
            }
            else {
                console.log(responseForms)
                console.log(responseBlocks)
            }
        };

        getForm()
    }, []);

    function updateAnswersForm(value, id) {
        setAnswers(
            answers.map((item, i) => {
                if (id === i) {
                    item.answer = value;
                }
                return item
            })
        )
    };

    function saveAnswers() {
        // saveAnswersApi(formId, answers)
        //     .then((resolve, _) => {
        //         console.log(resolve)
        //         setAnswers([]);
        //         navigate("/");
        //     })
        //     .catch((error) => console.log(error));
        setAnswers([]);
        navigate("/forms");
    }

    return (
        <div className={classes.main}>
            {questions ? 
            <div className={classes.wrapper}>
                <div className={classes.form}>
                    <div className={classes.form__header}>
                        <div className={classes.form__header__title}>
                            <span>{title}</span>
                        </div>
                        <div className={classes.form__header__id}>
                            <span>#{formId}</span>
                        </div>
                    </div>
                    <div className={classes.form__content}>
                        <GeneratingFormFields listBlock={questions} listTypeAnswer={listTypeAnswer} answers={answers} updateAnswersForm={updateAnswersForm}/>
                    </div>
                </div>
                <div className={classes.footer}>
                    <MyButton text={"Отправить"} click={saveAnswers}/>
                    <MyButton text={"Отмена"} backgroundColor={"rgb(180, 180, 180)"} click={() => {
                        setAnswers([]);
                        navigate("/");
                    }}/>
                </div>                 
            </div> :
            <div className={classes.wrapper}>
                <div className={classes.form}>
                    <div className={classes.form__unexists}>
                        <span>Форма с идентификатором #{formId} отсутствует.</span>
                    </div>
                </div>                 
            </div>}
        </div>     
    )
}

export default ViewForm;