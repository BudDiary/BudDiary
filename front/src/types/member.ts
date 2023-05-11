export type MemberLoginType = {
  id: number,
  username: string,
  nickname: string,
  profilePic : string | null ,
  intro: string | null ,
  points: 0,
  checkPreference: false,
};


// 초기 상태 타입
export type MemberStateType = {
  isLoggedIn: boolean;
  memberData: MemberLoginType;
};