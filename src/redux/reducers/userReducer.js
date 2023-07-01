import {
    FETCH_USER_LOGIN,
    FETCH_USER_ERROR,
    FETCH_USER_SUCCESS,
    USER_OUT,
    USER_REFRESH
} from '../actions/userAction';

const INITIAL_STATE = {

    account: {
        email: '',
        auth: null,
        token: ''
    },
    isLoading: false,
    isError: false
};

const UserReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case FETCH_USER_LOGIN:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case FETCH_USER_ERROR:
            return {
                ...state,
                account: {
                    auth: false
                },
                isLoading: false,
                isError: true
            };
        case FETCH_USER_SUCCESS:
            return {
                ...state,
                account: {
                    email: action.data.email,
                    token: action.data.token,
                    auth: true
                },
                isLoading: false,
                isError: false
            };
        case USER_OUT:
            localStorage.removeItem('email')
            localStorage.removeItem('token')
            return {
                ...state,
                account: {
                    email: '',
                    token: '',
                    auth: false
                }
            }
        case USER_REFRESH:
            return {
                ...state,
                account: {
                    email: localStorage.removeItem('email'),
                    token: localStorage.removeItem('token'),
                    auth: true
                },
            };
        default: return state;
    }

};
export default UserReducer;