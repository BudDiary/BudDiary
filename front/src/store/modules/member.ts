import { MemberStateType, MemberLoginType } from '../../types/member';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 상태에서 사용할 멤버 데이터 타입 정의
export type Member = {
  nickname: string;
  intro: string;
};
// 초기 상태 타입

// 초기상태
const initialState: MemberStateType = {
  isLoggedIn: false,
  memberData: {
    id: 0,
    username: '',
    nickname: '',
    profilePic : '',
    intro: '',
    points: 0,
    checkPreference: false,
  },
};

// 리듀서 슬라이스
const memberSlice = createSlice({
  name: 'member',
  initialState,
  reducers: { 
    loginAction(state: MemberStateType, action: PayloadAction<MemberLoginType>) {
      state.isLoggedIn = true;
      state.memberData = action.payload;
    },
    logoutAction(state: MemberStateType) {
      state.isLoggedIn = false;
      state.memberData = {
        id: 0,
        username: '',
        nickname: '',
        profilePic : '',
        intro: '',
        points: 0,
        checkPreference: false,
      };
    },
    updateIntroAction(state: MemberStateType, action: PayloadAction<string>) {
      state.memberData.intro = action.payload;
    },
    updateNicknameAction(state: MemberStateType, action: PayloadAction<string>) {
      state.memberData.nickname = action.payload;
    },
    updateProfilePicAction(state: MemberStateType, action: PayloadAction<string>) {
      state.memberData.profilePic = action.payload;
    },
  },
});

// 리듀서 & 액션 리턴
const { reducer, actions } = memberSlice;
export const { loginAction, logoutAction, updateIntroAction, updateNicknameAction,updateProfilePicAction } = actions;
export default reducer;
