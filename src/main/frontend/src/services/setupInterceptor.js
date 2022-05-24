import axiosInstance from "./api"
import TokenService from "./TokenService";
import {refresh} from "../reduxService/index"

const setup = (store) => {
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getAccessToken();
            if (token) {
                config.headers["Authorization"] = token;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error)
        }

    );
    const {dispatch} = store;
    axiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            console.log("err", err);
            const originalConfig = err.config;
            if (originalConfig.url !== "/login" && err.response) {
                if (err.response.status == 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        let data = new FormData();
                        data.append("refresh_token", TokenService.getRefreshToken())
                        const rs = await axiosInstance.post("/refresh", data);

                        const {access_token} = rs.data;

                        dispatch(refresh(access_token));

                        TokenService.updateAccessToken(access_token);
                        return axiosInstance(originalConfig);
                    } catch (_error) {
                        return Promise.reject(_error)
                    }
                }
            }
            return Promise.reject(err)
        }
    )
}

export default setup;