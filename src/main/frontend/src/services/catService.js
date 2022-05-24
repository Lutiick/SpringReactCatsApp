import authHeader from "./authHeader";
import api from "./api";

class CatService {
    getList() {
        return api.get("/api/cats")
    }
}

export default new CatService();