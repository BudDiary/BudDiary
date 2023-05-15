import React, { useMemo } from "react";
import { PickerContainer, EmojiButton } from "./Emoji.style";
import { postReactionApi, deleteReactionApi } from "../../../apis/reactionApi";
import { Reaction, ActionType } from "../../../types/group";
import useMember from "../../../hooks/memberHook";

type Props = {
  onSelect: (emoji: string, diaryId: number) => void;
  diaryId: number;
  reactionList: Reaction[];
};

const EmojiPicker = ({ onSelect, diaryId, reactionList }: Props) => {
  // console.log("이모티콘", reactionList);
  const { memberData } = useMember();

  const emojiActionTypes: { [key: string]: ActionType } = {
    "😀": "LIKED",
    "👍": "BEST",
    "😡": "ANGRY",
    "😢": "SAD",
    "😲": "SURPRISED",
  };

  const emojis = ["😀", "👍", "😡", "😢", "😲"];

  const handleCancelEmoji = (emoji: string, diaryId: number) => {
    const actionType = emojiActionTypes[emoji];
    const emojiReaction = reactionList.find(
      (reaction) =>
        memberData.username === reaction.username &&
        actionType === reaction.actionType
    );
    if (emojiReaction) {
      const actionId = emojiReaction.id;
      deleteReactionApi(diaryId, actionId).then(() => {
        onSelect("", diaryId);
      });
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

  const handleEmojiClick = (emoji: string) => {
    const actionType: ActionType = emojiActionTypes[emoji];
    const emojiReaction = reactionList.find(
      (reaction) =>
        memberData.username === reaction.username &&
        actionType === reaction.actionType
    );
    if (emojiReaction) {
      handleCancelEmoji(emoji, diaryId);
    } else {
      postReactionApi(diaryId, actionType).then(() => {
        onSelect(emoji, diaryId);
      });
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
