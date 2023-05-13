import React, { useEffect } from "react";
import { PickerContainer, EmojiButton } from "./Emoji.style";
import { postReactionApi, deleteReactionApi } from "../../../apis/reactionApi";
import { Reaction, ActionType } from "../../../types/group";
import useMember from "../../../hooks/memberHook";
type Props = {
  onSelect: (emoji: string) => void;
  selectedEmojis: string[];
  diaryId: number;
  reactionList: Reaction[];
};

const EmojiPicker = ({
  onSelect,
  selectedEmojis,
  diaryId,
  reactionList,
}: Props) => {
  const { memberData } = useMember();
  const emojiActionTypes: { [key: string]: ActionType } = {
    "😀": "LIKED",
    "👍": "BEST",
    "😡": "ANGRY",
    "😢": "SAD",
    "😲": "SURPRISED",
  };

  const emojis = ["😀", "👍", "😡", "😢", "😲"];

  const handleSelectEmoji = (emoji: string) => {
    const actionType: ActionType = emojiActionTypes[emoji];
    const emojiReaction = reactionList.find(
      (reaction) =>
        memberData.username === reaction.username &&
        actionType === reaction.actionType
    );
    if (emojiReaction) {
      handleCancelEmoji(emoji);
    } else {
      postReactionApi(diaryId, actionType);
      onSelect(emoji);
    }
  };

  const handleCancelEmoji = (emoji: string) => {
    const actionType = emojiActionTypes[emoji];
    const emojiReaction = reactionList.find(
      (reaction) =>
        memberData.username === reaction.username &&
        actionType === reaction.actionType
    );
    if (emojiReaction) {
      const actionId = emojiReaction.id;
      deleteReactionApi(diaryId, actionId);
    }
    onSelect("");
  };

  const checkEmoji = () => {
    return emojis.map((emoji) => {
      const actionType = emojiActionTypes[emoji];
      const emojiReaction = reactionList.find(
        (reaction) =>
          memberData.username === reaction.username &&
          actionType === reaction.actionType
      );
      return { emoji, selected: Boolean(emojiReaction) };
    });
  };

  useEffect(() => {
    console.log(reactionList);
  }, []);

  return (
    <PickerContainer style={{ display: "flex", flexWrap: "wrap" }}>
      {checkEmoji().map((emojiData) => (
        <EmojiButton
          key={emojiData.emoji}
          onClick={() => {
            if (selectedEmojis.includes(emojiData.emoji)) {
              handleCancelEmoji(emojiData.emoji);
            } else {
              handleSelectEmoji(emojiData.emoji);
            }
          }}
          selected={emojiData.selected}
        >
          {emojiData.emoji}
        </EmojiButton>
      ))}
    </PickerContainer>
  );
};

export default EmojiPicker;
