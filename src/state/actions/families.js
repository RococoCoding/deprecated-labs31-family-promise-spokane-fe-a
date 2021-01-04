// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Import action TYPES at the top of the file for family related actions
import { axiosWithAuth } from '../../api/axiosWithAuth';

import {
  GET_HOUSEHOLD_FETCHING,
  GET_MEMBERS_FAILURE,
  GET_HOUSEHOLD_SUCCESS,
} from '../types';

const fetchHousehold = () => (dispatch) => {
    state = getState();
    // get family id from family state
    // and then fetch household
    dispatch({ type: GET_HOUSEHOLD_FETCHING, payload: household });
    try {
        let householdinfo = await axiosWithAuth()
        .get('/{family_id}/household')
        .then(res => res.data.user);
        dispatch({ type: GET_HOUSEHOLD_SUCCESS, payload: currentUser });
    } catch (error) {
        alert('error');
        console.log(error);
        console.log(error?.response);
    } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
    }
};

