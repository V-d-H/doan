export const SET_NAMEPATIENT = 'SET_NAMEPATIENT';
export const SET_CMND = 'SET_CMND';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_NAMECARER = 'SET_NAMECARER';
export const SET_NUMBERPHONE = 'SET_NUMBERPHONE';
export const SET_AVT = 'SET_AVT';
export const SET_BIRTHDAY = 'SET_BIRTHDAY';
export const SET_SEX = 'SET_SEX';
export const SET_STATUS = 'SET_STATUS';

export const setStatusAPI = status => dispatch => {
  dispatch({
    type: SET_STATUS,
    payload: status,
  });
};
export const setNamePatient = name => dispatch => {
  dispatch({
    type: SET_NAMEPATIENT,
    payload: name,
  });
};
export const setCMNDofPatient = cmnd => dispatch => {
  dispatch({
    type: SET_CMND,
    payload: cmnd,
  });
};
export const setAddress = address => dispatch => {
  dispatch({
    type: SET_ADDRESS,
    payload: address,
  });
};
export const setNameCarer = name => dispatch => {
  dispatch({
    type: SET_NAMECARER,
    payload: name,
  });
};
export const setNumberphone = num => dispatch => {
  dispatch({
    type: SET_NUMBERPHONE,
    payload: num,
  });
};
export const setAvt = uriIamge => dispatch => {
  dispatch({
    type: SET_AVT,
    payload: uriIamge,
  });
};
export const setBirthday = date => dispatch => {
  dispatch({
    type: SET_BIRTHDAY,
    payload: date,
  });
};
export const setSex = sex => dispatch => {
  dispatch({
    type: SET_SEX,
    payload: sex,
  });
};
