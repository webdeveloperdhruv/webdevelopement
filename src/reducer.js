import { combineReducers } from 'redux';

 const dashboardReducer = (state = { data: [], filter: { user: '', category: '' } }, action) => {
  switch (action.type) {
    case 'FETCH_DATA_SUCCESS':
      return { ...state, data: action.payload.data }; 
        case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  dashboard: dashboardReducer,
});


