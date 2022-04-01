import * as types from '../constants/actionTypes';

export const addBankActionCreator = bank => ({
  type: types.ADD_BANK,
  payload: bank,
});

export const updateBankActionCreator = (bankId) => ({
    type: types.UPDATE_BANK,
    payload: bankId
  });

export const deleteBankActionCreator = (bankId) => ({
    type: types.DELETE_BANK,
    payload: bankId
  });

export const makeDonation = () => ({
    type: types.DONATE,
    payload: newValue,
  });
  
export const addCharityActionCreator = (charity) => ({
  type: types.ADD_CHARITY,
  payload: charity
});

export const deleteCharityActionCreator = (charityId) => ({
    type: types.DELETE_CHARITY,
    payload: charityId
});

export const loginUser = (userId) => ({
    type: types.LOGIN,
    payload: userId
});

export const signupUser = (user) => ({
    type: types.SIGNUP,
    payload: user
});

