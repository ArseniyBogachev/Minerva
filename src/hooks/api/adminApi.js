import axios from "axios";

async function listUsersApi(token) {
    try {
        const response = await axios.get(`https://api.minerva.krbl.ru/auth/manage/users`,
        {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        return response
    }
    catch (e) {
        return e
    }
};

export {listUsersApi}