import axios from 'axios';
import {
  REWARD_STATUS_REQUEST,
  REWARD_STATUS_SUCCESS,
  REWARD_STATUS_FAIL,
  REWARD_CLAIM_REQUEST,
  REWARD_CLAIM_SUCCESS,
  REWARD_CLAIM_FAIL,
  API_BASE_URL
} from '../../constants/constant';

export const getRewardStatus = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REWARD_STATUS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(API_BASE_URL+'/api/rewards/status', config);

    dispatch({ type: REWARD_STATUS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REWARD_STATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const claimReward = () => async (dispatch, getState) => {
  try {
    dispatch({ type: REWARD_CLAIM_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(API_BASE_URL+'/api/rewards/claim', {}, config);

    dispatch({ type: REWARD_CLAIM_SUCCESS });
  } catch (error) {
    dispatch({
      type: REWARD_CLAIM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
