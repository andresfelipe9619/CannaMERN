import { 
    HOME_PAGE_LOADED,
    PROFILE_PAGE_LAODED,
    HOME_PAGE_ERRORED,
    HOME_PAGE_LOADING,
    SEARCH } from '../actions/constants/ActionTypes';
// const strainListReducer = (state = {strains:{}}, action) => {
//     switch (action.type) {
//         case HOME_PAGE_LOADED:
//             state = {
//                 ...state,
//                 strains: action.payload
//             };
//             break;
//         case SEARCH:
//             state = {
//                 ...state,
//                 strains: action.payload
//             };
//             break;
//         case PROFILE_PAGE_LAODED:
//             state = {
//                 ...state,
//                 strains: action.payload
//             }
//     }
//     return state;
// };
// export default strainListReducer;\


export function homeErrored(state = false, action) {
    switch (action.type) {
        case HOME_PAGE_ERRORED:
            return action.hasErrored;
        default:
            return state;
    }
}

export function homeLaoding(state = false, action) {
    switch (action.type) {
        case HOME_PAGE_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function homeLoaded(state = [], action) {
    switch (action.type) {
        case HOME_PAGE_LOADED:
            return action.strains;
        default:
            return state;
    }
}