import axios from "axios";

async function editUserApi(token, data) {
    try {
        const response = await axios.post("https://api.minerva.krbl.ru/auth/manage/edit", 
        {
            "email": data.email,
            "first_name": data.first_name,
            "id": "6617fec3f603c43e1719d3c8",
            "is_admin": data.is_admin,
            "last_name": data.last_name,
            "login": data.login,
            "phone": data.phone
        },
        { 
            headers: {
                "Authorization": `Token ${token}`,
            },
        })

        console.log(response)
        return response
    }
    catch(e) {
        console.log(e)
        return e
    }    
    // return false
}

export {editUserApi}