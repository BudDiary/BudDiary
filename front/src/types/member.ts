export type MemberLoginType = {
  id: number;
  username: string;
  nickname: string;
  profilePic: string | null;
  intro: string | null;
  points: number;
  checkPreference: false;
  sticker: Array<Sticker> | null;
};

// 초기 상태 타입
export type MemberStateType = {
  isLoggedIn: boolean;
  memberData: MemberLoginType;
};

export type Sticker = {
  count: number;
  sticker: {
    imageUrl: string;
    name: string;
    price: number;
    stickerId: number;
  };
  unusedStickerId: number;
};
