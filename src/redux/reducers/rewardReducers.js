import {
  REWARD_STATUS_REQUEST,
  REWARD_STATUS_SUCCESS,
  REWARD_STATUS_FAIL,
  REWARD_CLAIM_REQUEST,
  REWARD_CLAIM_SUCCESS,
  REWARD_CLAIM_FAIL,
} from '../../constants/constant';

export const rewardStatusReducer = (state = { reward: [] }, action) => {
   switch (action.type) {
    case REWARD_STATUS_REQUEST:
      return { loading: true, ...state };
    case REWARD_STATUS_SUCCESS:
      return { loading: false, reward: action.payload };
    case REWARD_STATUS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const rewardClaimReducer = (state = {}, action) => {
  switch (action.type) {
    case REWARD_CLAIM_REQUEST:
      return { loading: true };
    case REWARD_CLAIM_SUCCESS:
      return { loading: false, success: true };
    case REWARD_CLAIM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
