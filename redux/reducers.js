import {act} from 'react-test-renderer';
import {
  SET_NAMEPATIENT,
  SET_CMND,
  SET_ADDRESS,
  SET_NAMECARER,
  SET_NUMBERPHONE,
} from '../redux/action';

const initialState = {
  namepatient: '',
  cmnd: '',
  namecarer: '',
  address: '',
  numberphone: '',
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
    default:
      return state;
  }
}
