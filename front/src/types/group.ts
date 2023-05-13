export type ActionType = "LIKED" | "BEST" | "ANGRY" | "SAD" | "SURPRISED";

export interface Writer {
  id: number;
  username: string;
  nickname: null | string;
  profilePath: null | string;
}

export interface Image {
  id: number;
  imgUrl: string;
}

export interface Reaction {
  id: number;
  username: string;
  actionType: string;
}

export interface Reply {
  id: number;
  writer: Writer;
  writeDate: string;
  text: string;
}

export interface Comment {
  id: number;
  writer: Writer;
  writeDate: string;
  text: string;
  replies: Reply[];
}

export interface Diary {
  diaryId: number;
  writer: Writer;
  writeDate: string;
  text: string;
  imgList: Image[];
  positiveRate: number;
  negativeRate: number;
  reactionList: Reaction[];
  commentList: Comment[];
}

export interface Member {
  id: number;
  username: string;
  nickname: string | null;
  profilePath: string | null;
}

export interface Info {
  clubUuid: string;
  thumbnailUrl: string | null;
  clubName: string;
  captainUsername: string | null;
}

export interface ClubDetail {
  diaryList: Diary[];
  memberList: Member[];
  clubInfo: Info;
}

export interface Club {
  clubDetail: ClubDetail;
}
