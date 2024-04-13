const protectedUrl = {
    notAuthorized: [
        "/forms",
        "/forms/edit",
        "/profile"
    ],
    Authorized: [
        "enter"
    ],
    notRights: [

    ]
}

function globalRender(url, user, navigate) {
    if (!user && protectedUrl.notAuthorized.some(item => item === url)) {
        navigate("/enter")
    }    
}

export { globalRender }