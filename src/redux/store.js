import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
} from './reducers/userReducers';

import {
  rewardStatusReducer,
  rewardClaimReducer,
} from './reducers/rewardReducers';

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  rewardStatus: rewardStatusReducer,
  rewardClaim: rewardClaimReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
