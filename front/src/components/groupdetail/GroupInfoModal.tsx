import React, { useEffect } from "react";
import { EditTitle } from "./DiaryComment.style";
import { ModalTopNavContainer, GroupModal } from "../common/ModalWindow.styles";
import { MemberList, ClubList } from "./GroupInfo.styles";
import { BasicButton } from "./Diaries.styles";
import useMember from "../../hooks/memberHook";
import { Divider } from "@mui/material";
import { Member, Info } from "../../types/group";
import crown from "../../assets/group/crown.png";
import close from "../../assets/modal/close.png";
interface GroupInfoProps {
  clubInfo?: Info;
  onClose: () => void;
  memberList?: Member[];
}

export default function GroupInfoModal({
  clubInfo,
  memberList,
  onClose,
}: GroupInfoProps) {
  const { memberData } = useMember();
  const username = memberData.username;

  const closeCommentModal = () => {
    onClose();
  };

  useEffect(() => {});
  return (
    <GroupModal style={{ padding: "10px" }}>
      <ModalTopNavContainer
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={close}
            alt=""
            onClick={closeCommentModal}
            style={{
              height: "25px",
              width: "25px",
              border: "none",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EditTitle>My그룹</EditTitle>
        </div>
        <div
          style={{
            height: "25px",
            width: "25px",
            border: "none",
          }}
        ></div>
      </ModalTopNavContainer>

      <img
        src={clubInfo?.thumbnailUrl ?? ""}
        alt="그룹 섬네일"
        style={{ marginBlock: "10px" }}
      />
      <p>{clubInfo?.clubName}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <ClubList>멤버 {memberList?.length}</ClubList>
        <BasicButton>초대하기</BasicButton>
      </div>
      <Divider style={{ border: "solid 2px #BFDBFE" }} />
      <MemberList>
        {memberList?.map((member) => (
          <div key={member.id}>
            <img src={member.profilePath ?? ""} alt="프로필" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {member.nickname}
              {member.username === clubInfo?.captainUsername ? (
                <img
                  src={crown}
                  alt=""
                  style={{ border: "none", height: "20px", width: "20px" }}
                />
              ) : (
                ""
              )}
              <p>{member.username === username ? "  me" : ""}</p>
            </div>
          </div>
        ))}
      </MemberList>
    </GroupModal>
  );
}
