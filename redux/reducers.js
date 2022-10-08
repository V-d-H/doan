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
} from '../redux/action';

const initialState = {
  namepatient: 'Vũ Đức Hoàng',
  cmnd: '272802164',
  namecarer: 'Vũ Đức Huân',
  address: '25/12/30 Bùi Quang Là',
  numberphone: '0978215276',
  uriImage: null,
  birthday: '17/11/2001',
  sex: 0,
  status: 0,
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
    default:
      return state;
  }
}
