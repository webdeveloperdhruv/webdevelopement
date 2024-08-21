export const SET_FILTER = 'SET_FILTER';

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
export const fetchData = () => ({
    type: 'FETCH_DATA',
  });
  
  export const fetchDataSuccess = (data) => ({
    type: 'FETCH_DATA_SUCCESS',
    payload: data,
  });
  
  export const fetchDataFailure = (error) => ({
    type: 'FETCH_DATA_FAILURE',
    payload: error,
  });