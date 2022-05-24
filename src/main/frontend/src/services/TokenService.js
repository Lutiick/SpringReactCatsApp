class TokenService {
    getAccessToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user["access_token"])
            return user["access_token"];
        else
            return null;
    }

    getRefreshToken() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user["refresh_token"])
            return user["refresh_token"];
        else
            return null;
    }

    updateAccessToken(token) {
        const user = JSON.parse(localStorage.getItem('user'));
        user["access_token"] = token;
        localStorage.setItem("user", JSON.stringify(user));
    }

    setUser(user) {
        localStorage.setItem("user", JSON.stringify(user));
    }

    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    removeUser() {
        localStorage.removeItem("user");
    }
}

export default new TokenService();