import React, { useState, useEffect, useLayoutEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FormsData, UserData, TypeAnswerData, answersData } from "./context";
import { useCookies } from "react-cookie";
import { globalRender } from "./router/protectedRouting.js";
import { verifyUserApi } from "./hooks/api/enterAccountApi.js"
import classes from "./assets/styles/app.module.scss"
import NavBar from "./components/NavBar.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import InputText from "./components/typeAnswer/InputText.jsx";
import TextArea from "./components/typeAnswer/TextArea.jsx";
import YesNo from "./components/typeAnswer/YesNo.jsx"
import InputDate from "./components/typeAnswer/InputDate.jsx";
import InputMultipleRadio from "./components/typeAnswer/InputMultipleRadio.jsx";
import InputRadio from "./components/typeAnswer/InputRadio.jsx";
import DropDownList from "./components/typeAnswer/DropDownList.jsx";
import InputFile from "./components/typeAnswer/InputFile.jsx";

const App = () => {
    const navigate = useNavigate();
    const [forms, setForms] = useState([]);
    const [user, setUser] = useState(false);
    const [answersList, setAnswersList] = useState([]);
    const [listTypeAnswer, setListTypeAnswer] = useState([
        {id: 1, text: 'Краткий ответ', typeTag: InputText},
        {id: 2, text: 'Расширенный ответ', typeTag: TextArea},
        {id: 3, text: 'Выбор из вариантов', typeTag: InputRadio},
        {id: 4, text: 'Множественный выбор', typeTag: InputMultipleRadio},
        {id: 5, text: 'Выпадающий список', typeTag: DropDownList},
        {id: 6, text: 'Да/Нет', typeTag: YesNo},
        {id: 7, text: 'Файл', typeTag: InputFile},
        {id: 8, text: 'Дата', typeTag: InputDate}
    ]);

    // useEffect(() => globalRender(window.location.pathname, user, navigate));
    const [cookies, _, __] = useCookies(["user"]);

    useEffect(() => {
        async function verifyUser() {
            const response = await verifyUserApi(cookies.token);
            console.log("app", user)

            if (response) {
                if (response.status === 200) {
                    setUser(response.data);
                }
                else {
                    console.log(response)
                }
            }
        }

        verifyUser();
    }, [])

    return (
        <UserData.Provider value={{ user, setUser }}>
            <answersData.Provider value={{ answersList, setAnswersList }}>
                <FormsData.Provider value={{ forms, setForms }}>
                    <TypeAnswerData.Provider value={{ listTypeAnswer, setListTypeAnswer }}>
                        <div className={classes.main}>
                            <div className={classes.container}>
                                <div className={classes.header}>
                                    <NavBar navigate={navigate} auth={user} setAuth={setUser}/>                   
                                </div>
                                <div className={classes.content}>
                                    <Outlet/>
                                </div>
                            </div>
                        </div>
                    </TypeAnswerData.Provider>
                </FormsData.Provider>  
            </answersData.Provider>
        </UserData.Provider>      
    )
}

export default App;