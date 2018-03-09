import { 
    HOME_PAGE_LOADED,
    HOME_PAGE_ERRORED,
    HOME_PAGE_LOADING
   } from '../actions/constants/ActionTypes';

//    PROFILE_PAGE_LAODED,
//    SEARCH 

import Strains from '../agentCannabis';



export function homePageLoaded(strains){
    return {
        type: HOME_PAGE_LOADED,
        strains
    };
}

export function homePageLoading(bool){
    return {
        type: HOME_PAGE_LOADING,
        isLoading: bool
    };
}


export function homePageErrored(bool){
    return {
        type: HOME_PAGE_ERRORED,
        hasErrored: bool
    };

}

export function fetchStrains() {
    return (dispatch) => {
        dispatch(homePageLoading(true));

        fetch('https://api.otreeba.com/v1/strains')
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(homePageLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(homePageLoaded(items.data)))
            .catch(() => dispatch(homePageErrored(true)));
    };
}


// export function getStrain(id) {
//     return {};
// }

// new Promise((resolve, reject) => {
//     resolve(Strains.all());
// })