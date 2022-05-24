import api from "./api";
import TokenService from "./TokenService";


class AuthService {
    login(username, password) {
        let data = new FormData();
        data.append("username", username);
        data.append("password", password);
        return api.post("login", data)
            .then((response) => {
                if (response.data["access_token"]) {
                    TokenService.setUser(response.data);
                }
                console.log(response)
                return response.data;
            })
    }

    logout() {
        TokenService.removeUser();
    }

    register(username, password) {
        let data = new FormData();
        data.append("username", username);
        data.append("password", password);
        return api.post("register", data)
    }
}

export default new AuthService();