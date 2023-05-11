import React from "react";
import { PickerContainer, EmojiButton } from "./Emoji.style";
import { postReactionApi, deleteReactionApi } from "../../../apis/reactionApi";
import { userdummy } from "../../mypage/userdummy";
import { Reaction } from "../../../types/group";

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
  const emojiActionTypes: { [key: string]: string } = {
    "😀": "LIKED",
    "👍": "BEST",
    "😡": "ANGRY",
    "😢": "SAD",
    "😲": "SURPRISED",
  };
  const emojis = ["😀", "👍", "😡", "😢", "😲"];

  const handleSelectEmoji = (emoji: string) => {
    const actionType = emojiActionTypes[emoji];
    const emojiReaction = reactionList.find(
      (reaction) =>
        userdummy.username === reaction.username &&
        actionType === reaction.actionType
    );
    if (emojiReaction) {
      handleCancelEmoji(emoji);
    } else {
      postReactionApi(diaryId, userdummy.username, actionType);
      onSelect(emoji);
    }
  };

  const handleCancelEmoji = (emoji: string) => {
    const actionType = emojiActionTypes[emoji];
    const emojiReaction = reactionList.find(
      (reaction) =>
        userdummy.username === reaction.username &&
        actionType === reaction.actionType
    );
    if (emojiReaction) {
      const actionId = emojiReaction.id;
      deleteReactionApi(diaryId, actionId, userdummy.username);
    }
    onSelect("");
  };

  const checkEmoji = () => {
    return emojis.map((emoji) => {
      const actionType = emojiActionTypes[emoji];
      const emojiReaction = reactionList.find(
        (reaction) =>
          userdummy.username === reaction.username &&
          actionType === reaction.actionType
      );
      return { emoji, selected: Boolean(emojiReaction) };
    });
  };

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
