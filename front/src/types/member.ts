export type MemberLoginType = {
  id: string;
  email: string;
  nickname: string;
  profile: ProfileType;
  point: number;
  checkPreference: boolean;
};

export type ProfileType = {
  image: string;
  content: string;
};

// 초기 상태 타입
export type MemberStateType = {
  isLoggedIn: boolean;
  memberData: MemberLoginType;
};