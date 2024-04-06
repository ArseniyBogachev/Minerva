import axios from "axios";


async function listFormsApi(token) {
    try {
        const response = await axios.get("http://localhost:8080/formBuilder/list", {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
        return response
    }
    catch (e) {
        return e
    }
};

async function createFormApi(token) {
    try {
        const response = await axios.post("http://localhost:8080/formBuilder/new",
        {
            title: "Новая форма"
        },
        {
            headers: {
                "Authorization": `Token ${token}`,
            }
        })
        return response
    }
    catch (e) {
        return e
    }
};

async function removeFormApi(token, formId) {
    try {
        const response = await axios.post(`http://localhost:8080/formBuilder/edit/${formId}/delete`, {
            headers: {
                "Authorization": `Token ${token}`,
            },
        })
        return response
    }
    catch (e) {
        return e
    }
};

export { listFormsApi, createFormApi, removeFormApi };