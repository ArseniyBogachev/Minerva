import { totalRegisterValidate } from "../validation/enterAccountValidate.js";
import axios from "axios";

async function logIn(login, password) {
    try {
        const response = await axios.post("http://localhost:8080/auth/signIn", {"login": login, "password": password})
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
            const response = await axios.post("http://localhost:8080/auth/signUp", {"login": data.login, "password": data.password})
            return response
        }
        catch (e) {
            return e
        }
    }
    return validate.message
};

async function verifyUserApi(token=false) {
    if (token) {
        try {
            const response = await axios.get("http://localhost:8080/auth/me", { 
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