import React, { useMemo, Dispatch, SetStateAction } from "react";
import { PickerContainer, EmojiButton } from "./Emoji.style";
import { postReactionApi, deleteReactionApi } from "../../../apis/reactionApi";
import { Reaction, ActionType } from "../../../types/group";
import useMember from "../../../hooks/memberHook";
import { Info, Club } from "../../../types/group";
import { getClubDetailApi } from "../../../apis/clubApi";
type Props = {
  onSelect: (emoji: string, diaryId: number) => void;
  diaryId: number;
  reactionList: Reaction[];
  clubInfo?: Info;
  setClubData: Dispatch<SetStateAction<Club | null>>;
};

const EmojiPicker = ({
  onSelect,
  diaryId,
  reactionList,
  clubInfo,
  setClubData,
}: Props) => {
  // console.log("이모티콘", reactionList);
  const { memberData } = useMember();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const emojiActionTypes: { [key: string]: ActionType } = {
    "😀": "LIKED",
    "👍": "BEST",
    "😡": "ANGRY",
    "😢": "SAD",
    "😲": "SURPRISED",
  };

  const emojis = ["😀", "👍", "😡", "😢", "😲"];

  const handleCancelEmoji = async (emoji: string, diaryId: number) => {
    const actionType = emojiActionTypes[emoji];
    const emojiReaction = reactionList.find(
      (reaction) =>
        memberData.username === reaction.username &&
        actionType === reaction.actionType
    );
    if (emojiReaction) {
      const actionId = emojiReaction.id;
      await deleteReactionApi(diaryId, actionId).then(() => {
        onSelect("", diaryId);
      });
      const data = await getClubDetailApi(clubInfo?.clubUuid ?? "");
      setClubData(data);
    }
  };

  const emojiData = useMemo(() => {
    return emojis.map((emoji) => {
      const actionType = emojiActionTypes[emoji];
      const emojiReaction = reactionList.find(
        (reaction) =>
          memberData.username === reaction.username &&
          actionType === reaction.actionType
      );
      return {
        emoji,
        selected: Boolean(emojiReaction),
      };
    });
  }, [emojis, emojiActionTypes, reactionList, memberData]);

  const handleEmojiClick = async (emoji: string) => {
    const actionType: ActionType = emojiActionTypes[emoji];
    const emojiReaction = reactionList.find(
      (reaction) =>
        memberData.username === reaction.username &&
        actionType === reaction.actionType
    );
    if (emojiReaction) {
      await handleCancelEmoji(emoji, diaryId);
    } else {
      await postReactionApi(diaryId, actionType).then(() => {
        onSelect(emoji, diaryId);
      });
      const data = await getClubDetailApi(clubInfo?.clubUuid ?? "");
      setClubData(data);
    }
  };

  return (
    <PickerContainer style={{ display: "flex", flexWrap: "wrap" }}>
      {emojiData.map((emojiData) => (
        <EmojiButton
          key={emojiData.emoji}
          onClick={() => handleEmojiClick(emojiData.emoji)}
          selected={emojiData.selected}
        >
          {emojiData.emoji}
        </EmojiButton>
      ))}
    </PickerContainer>
  );
};

export default EmojiPicker;
