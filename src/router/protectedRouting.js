const protectedUrl = {
    notAuthorized: [
        "/forms",
        "/forms/edit",
        "/profile"
    ],
    Authorized: [
        "/enter"
    ],
    notRights: [
        "/forms"
    ]
}

function globalRender(url, user, navigate) {
    if (!user && protectedUrl.notAuthorized.some(item => item === url)) {
        navigate("/enter")
    }
    else if (user && protectedUrl.Authorized.some(item => item === url)) {
        navigate("/")
    }   
    else if (user && protectedUrl.notRights.some(item => item === url)) {
        if (!user.is_admin) {
            navigate("/")
        } 
    }
}

export { globalRender }