import * as CT from './catTypes'

const initialState = {
    cats: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CT.FETCH_CATS_REQUEST:
            return {
                ...state
            };
        case CT.FETCH_CATS_SUCCESS:
            return {
                cats: action.payload,
                error: ''
            };
        case CT.FETCH_CATS_FAILURE:
            return {
                cats: [],
                error: action.payload
            }
        default: return state
    }
}

export default reducer;