import { totalRegisterValidate } from "../validation/enterAccountValidate.js";
import axios from "axios";

async function logIn(login, password) {
    try {
        const response = await axios.post("https://api.minerva.krbl.ru/auth/signIn", {"login": login, "password": password})
        return response
    }
    catch (e) {
        return e
    }
};

async function completeRegistration(data) {
    const validate = totalRegisterValidate(data);

    if (validate.status) {
        try {
            const response = await axios.post("https://api.minerva.krbl.ru/auth/signUp", {
                "login": data.login, 
                "password": data.password,
            })
            return response
        }
        catch (e) {
            return "Ошибка. Проверте корректность введенных данных."
        }
    }
    return validate.message
};

async function verifyUserApi(token=false) {
    if (token) {
        try {
            const response = await axios.get("https://api.minerva.krbl.ru/auth/me", { 
                headers: {
                    "Authorization": `Token ${token}`,
                },
            })
            return response
        }
        catch(e) {
            return e
        }    
    }
    return false
}

export { logIn, completeRegistration, verifyUserApi };