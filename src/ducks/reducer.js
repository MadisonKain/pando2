import axios from "axios";

const initialState = {
    user: {}
};

const UPDATE_USER_INFO = "UPDATE_USER_INFO";


// ========== ACTION CREATORS ========== //

export function getUserInfoFromServer() {
    const userData = axios.get("/auth/me").then(res => {
        return res.data;
    });
    return {
        type: UPDATE_USER_INFO,
        payload: userData
    };
}

// ========== REDUCER FUNCTION ========== //

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_INFO:
            
            return [...state, { user: action.payload }];
        default:
            return state;
    }
}