import {
  SET_NAMEPATIENT,
  SET_CMND,
  SET_ADDRESS,
  SET_NAMECARER,
  SET_NUMBERPHONE,
  SET_AVT,
  SET_SEX,
  SET_BIRTHDAY,
  SET_STATUS,
  SET_ID,
} from '../redux/action';

const initialState = {
  namepatient: '',
  cmnd: '',
  namecarer: '',
  address: '',
  numberphone: '',
  uriImage: null,
  birthday: '',
  sex: 0,
  status: 0,
  id: '',
};
export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NAMEPATIENT:
      return {...state, namepatient: action.payload};
    case SET_CMND:
      return {...state, cmnd: action.payload};
    case SET_ADDRESS:
      return {...state, address: action.payload};
    case SET_NAMECARER:
      return {...state, namecarer: action.payload};
    case SET_NUMBERPHONE:
      return {...state, numberphone: action.payload};
    case SET_AVT:
      return {...state, uriImage: action.payload};
    case SET_BIRTHDAY:
      return {...state, birthday: action.payload};
    case SET_SEX:
      return {...state, sex: action.payload};
    case SET_STATUS:
      return {...state, status: action.payload};
    case SET_ID:
      return {...state, id: action.payload};
    default:
      return state;
  }
}
