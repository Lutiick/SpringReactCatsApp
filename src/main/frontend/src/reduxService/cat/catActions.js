import * as CT from "./catTypes";
import axios from "axios";
import authHeader from "../../services/authHeader";
import catService from "../../services/catService";

const fetchCatsRequest = () => {
    return {type: CT.FETCH_CATS_REQUEST};
};

const catsSuccess = (cats) => {
    return {
        type: CT.CATS_SUCCESS,
        payload: cats
    }
}

const catsFailure = (error) => {
    return {
        type: CT.CATS_FAILURE,
        payload: error
    }
}

export const fetchCats = () => {
    return (dispatch) => {
        dispatch(fetchCatsRequest());
        catService.getList()
            .then((response) => {
                console.log(response);
                console.log("hello");
                dispatch(catsSuccess(response.data));
            })
            .catch((error) => {
                console.log(error);
                console.log("hello");
                dispatch(catsFailure(error.message))
            });
    }
}

const deleteCatRequest = () => {
    return {type: CT.DELETE_CAT_REQUEST};
}

const deleteCatSuccess = (id) => {
    return {
        type: CT.DELETE_CAT_SUCCESS,
        id: id
    }
}

export const deleteCat = (id) => {
    return (dispatch) => {
        dispatch(deleteCatRequest());
        axios.delete(`/api/cats/${id}`, {
            headers: authHeader()
        })
            .then((response) => {
                dispatch(deleteCatSuccess(id));
            })
            .catch((error) => {
                dispatch(catsFailure(error.message))
            });
    }
}