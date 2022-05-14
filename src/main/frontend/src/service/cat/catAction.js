import * as CT from "./catTypes";
import axios from "axios";

const fetchCatsRequest = () => {
    return {type: CT.FETCH_CATS_REQUEST};
};

const fetchCatsSuccess = (cats) => {
    return {
        type: CT.FETCH_CATS_SUCCESS,
        payload: cats
    }
}

const fetchCatsFailure = (error) => {
    return {
        type: CT.FETCH_CATS_FAILURE,
        payload: error
    }
}

export const fetchCats = () => {
    return (dispatch) => {
        dispatch(fetchCatsRequest());
        axios.get('/api/cats', {
            headers: {
                'Authorization': localStorage.getItem("access_token")
            }
        })
            .then((response) => {
                console.log(response);
                console.log("hello");
                dispatch(fetchCatsSuccess(response.data));
            })
            .catch((error) => {
                console.log(error);
                console.log("hello");
                dispatch(fetchCatsFailure(error.message))
            });
    }
}