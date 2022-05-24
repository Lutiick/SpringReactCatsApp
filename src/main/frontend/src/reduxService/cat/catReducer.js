import * as CT from './catTypes'

const initialState = {
    cats: [],
    error: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case CT.FETCH_CATS_REQUEST || CT.DELETE_CAT_REQUEST:
            return {
                ...state
            };
        case CT.DELETE_CAT_SUCCESS :
            let newStateCats = state.cats.filter((cat) => {
                return cat.id !== action.id;
            })
            return {
                cats: newStateCats,
                error: ''
            }
        case CT.CATS_SUCCESS:
            return {
                cats: action.payload,
                error: ''
            };
        case CT.CATS_FAILURE:
            return {
                cats: [],
                error: action.payload
            }
        default: return state
    }
}

export default reducer;