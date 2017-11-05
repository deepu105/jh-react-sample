import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from './action-type.util';
import { messages } from '../config/constants';
import { ICrudGetAction, ICrudPutAction, ICrudDeleteAction } from '../shared/model/redux-action.type';

export const ACTION_TYPES = {
  FETCH_USERS: 'userManagement/FETCH_USERS',
  FETCH_USER:  'userManagement/FETCH_USER',
  CREATE_USER: 'userManagement/CREATE_USER',
  UPDATE_USER: 'userManagement/UPDATE_USER',
  DELETE_USER: 'userManagement/DELETE_USER'
};

const initialState = {
  loading: false,
  errorMessage: null,
  users: [],
  user: {},
  updateSuccess: false
};

// Reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_USERS):
    case REQUEST(ACTION_TYPES.FETCH_USER):
    case REQUEST(ACTION_TYPES.CREATE_USER):
    case REQUEST(ACTION_TYPES.UPDATE_USER):
    case REQUEST(ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERS):
    case FAILURE(ACTION_TYPES.FETCH_USER):
    case FAILURE(ACTION_TYPES.CREATE_USER):
    case FAILURE(ACTION_TYPES.UPDATE_USER):
    case FAILURE(ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        loading: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        loading: false,
        users: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USER):
      return {
        ...state,
        loading: false,
        user: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USER):
    case SUCCESS(ACTION_TYPES.UPDATE_USER):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        user: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        loading: false,
        updateSuccess: true,
        user: {}
      };
    default:
      return state;
  }
};

const apiUrl = '/api/users';
// Actions
export const getUsers: ICrudGetAction = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_USERS,
  payload: axios.get(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getUser: ICrudGetAction = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USER,
    payload: axios.get(requestUrl)
  };
};

export const createUser: ICrudPutAction = project => dispatch => dispatch({
  type: ACTION_TYPES.CREATE_USER,
  meta: {
    successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
    errorMessage: messages.DATA_UPDATE_ERROR_ALERT
  },
  payload: axios.post(apiUrl, project)
});

export const updateUser: ICrudPutAction = project => dispatch => dispatch({
  type: ACTION_TYPES.UPDATE_USER,
  meta: {
    successMessage: messages.DATA_CREATE_SUCCESS_ALERT,
    errorMessage: messages.DATA_UPDATE_ERROR_ALERT
  },
  payload: axios.put(apiUrl, project)
});

export const deleteUser: ICrudDeleteAction = id => dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  return dispatch({
    type: ACTION_TYPES.DELETE_USER,
    meta: {
      successMessage: messages.DATA_DELETE_SUCCESS_ALERT,
      errorMessage: messages.DATA_UPDATE_ERROR_ALERT
    },
    payload: axios.delete(requestUrl)
  });
};
