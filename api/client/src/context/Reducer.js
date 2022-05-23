const Reducer = (state, action) => {
    switch(action.type){
        case "LOGIN_START":
        return{
            user: null,
            isFetching: true,
            error: false
        };
        case "LOGIN_SUCCESS":
        return{
            user: action.payload,
            isFetching: false,
            error: false,
        };
        case "LOGIN_FAILURE":
        return{
            user: null,
            isFetching: false,
            error: true,
        };
        case "ADD_PRODUCT_START":
        return{
            user: null,
            isFetching: true,
            error: false
        };
        case "ADD_PRODUCT_SUCCESS":
        return{
            user: action.payload,
            isFetching: false,
            error: false,
        };
        case "ADD_PRODUCT_FAILURE":
        return{
            user: null,
            isFetching: false,
            error: true,
        };
        case "SEARCH_POST_START":
        return{
            user: null,
            isFetching: true,
            error: false
        };
        case "SEARCH_POST_SUCCESS":
        return{
            user: action.payload,
            isFetching: false,
            error: false,
        };
        case "SEARCH_POST_FAILURE":
        return{
            user: null,
            isFetching: false,
            error: true,
        };
        case "LOGOUT":
        return{
            user: null,
            isFetching: false,
            error: false,
        };
        default:
            return state;
    }
}

export default Reducer;