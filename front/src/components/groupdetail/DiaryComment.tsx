import React, { useState, Dispatch, SetStateAction } from "react";
import Replies from "./Replies";
import CommentEdit from "./CommentEdit";
import DeleteComment from "./DeleteComment";
import { BasicButton } from "./Diaries.styles";
import { ClubList } from "./GroupInfo.styles";
import {
  InputBox,
  UserInfo,
  InputSet,
  CommentWrapper,
  CommentBox,
  ExpansionButton,
  CommentError,
} from "./DiaryComment.style";
import { postCommentApi } from "../../apis/commentApi";
import { getClubDetailApi } from "../../apis/clubApi";
import {
  handleCommentChange,
  handleCommentBlur,
  handleCheckComment,
} from "./GroupDetailFunction";
import { EditButton, DeleteButton } from "../common/Button.styles";
import useMember from "../../hooks/memberHook";
import { timeAgo } from "./GroupDetailFunction";
import { Divider } from "@mui/material";
import { Comment, Info, Club } from "../../types/group";

interface CommentProps {
  commentList: Comment[];
  diaryId: number;
  clubInfo?: Info;
  setClubData: Dispatch<SetStateAction<Club | null>>;
}

export default function DiaryComment({
  commentList,
  diaryId,
  clubInfo,
  setClubData,
}: CommentProps) {
  const { memberData } = useMember();
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [height, setHeight] = useState("35px");
  const [checkComment, setCheckComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  // 댓글 수정 & 삭제 모달
  const [commentUpdate, setCommentUpdate] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );
  const showUpdateModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setCommentUpdate(true);
  };

  const [commentDelete, setCommentDelete] = useState(false);

  const showDeleteModal = (commentId: number) => {
    setSelectedCommentId(commentId);
    setCommentDelete(true);
  };

  const handleCloseModal = () => {
    setCommentUpdate(false);
    setCommentDelete(false);
  };

  const handleCommentSubmit = async () => {
    if (error || commentText === "") {
      return;
    }
    console.log("댓글 요청", commentText, diaryId);
    setHeight("35px");

    try {
      const response = await postCommentApi(diaryId, commentText);
      const data = await getClubDetailApi(clubInfo?.clubUuid ?? "");
      setCommentText("");
      setClubData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <CommentWrapper>
      <ClubList>댓글 {commentList.length}</ClubList>
      {commentList
        .slice(0, showAllComments ? commentList.length : 2)
        .map((comment) => (
          <UserInfo key={comment.id}>
            <div>
              <img src={comment.writer.profilePath ?? ""} alt="프로필" />
            </div>
            <CommentBox>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  marginBlock: "10px",
                  marginBottom: "10px",
                }}
              >
                <h2>{comment.writer.nickname}</h2>
                <h3 style={{ marginInline: "8px" }}>
                  {timeAgo(comment.writeDate)}
                </h3>
                <div style={{ display: "flex", alignItems: "baseline" }}>
                  {commentDelete && selectedCommentId === comment.id && (
                    <DeleteComment
                      key={comment.id}
                      clubInfo={clubInfo}
                      comment={comment}
                      diaryId={diaryId}
                      setClubData={setClubData}
                      isOpen={false}
                      onClose={handleCloseModal}
                    />
                  )}

                  {memberData.username === comment.writer.username && (
                    <DeleteButton
                      style={{ fontSize: "12px" }}
                      onClick={() => showDeleteModal(comment.id)}
                    >
                      삭제
                    </DeleteButton>
                  )}
                </div>
              </div>

              <div>
                <p>{comment.text}</p>
              </div>
              <Replies
                key={comment.id}
                commentId={comment.id}
                clubInfo={clubInfo}
                setClubData={setClubData}
                replies={comment.replies}
              />
            </CommentBox>
          </UserInfo>
        ))}

      <Divider style={{ border: "solid 1px #BFDBFE", marginTop: "10px" }} />
      {commentList.length > 2 && (
        <div style={{ textAlign: "center" }}>
          <ExpansionButton onClick={() => setShowAllComments((prev) => !prev)}>
            {showAllComments ? "▲ 닫기" : "▼ 전체 댓글 보기"}
          </ExpansionButton>
        </div>
      )}
      <InputSet>
        <InputBox
          key={commentText}
          defaultValue={commentText}
          onChange={(e) => {
            handleCommentChange(e, setHeight);
            handleCheckComment(e, setCheckComment, setError);
          }}
          onBlur={(e) => handleCommentBlur(e, setCommentText)}
          style={{ height }}
        />
        <BasicButton onClick={handleCommentSubmit}>댓글달기</BasicButton>
      </InputSet>
      {error && <CommentError>{error}</CommentError>}
    </CommentWrapper>
  );
}
