import React from "react";

import { PickerContainer, EmojiButton } from "./Emoji.style";
import {
  sendEmojiReaction,
  cancelReaction,
} from "../groupdetailapis/groupdetailapis";
import { userdummy } from "../../mypage/userdummy";

type Props = {
  onSelect: (emoji: string) => void;
  selectedEmojis: string[];
  diaryId: number;
};

const EmojiPicker = ({ onSelect, selectedEmojis, diaryId }: Props) => {
  const emojiActionTypes: { [key: string]: string } = {
    "😀": "LIKED",
    "👍": "BEST",
    "😡": "ANGRY",
    "😢": "SAD",
    "😲": "SUPRISED",
  };
  const emojis = ["😀", "👍", "😡", "😢", "😲"];

  const handleSelectEmoji = (emoji: string) => {
    const actionType = emojiActionTypes[emoji];
    if (actionType) {
      sendEmojiReaction(diaryId, userdummy.nickname, actionType);
    }
    onSelect(emoji);
  };

  const handleCancelEmoji = (emoji: string) => {
    const actionType = emojiActionTypes[emoji];
    if (actionType) {
      const actionId = selectedEmojis.indexOf(emoji);
      cancelReaction(diaryId, userdummy.nickname, actionId);
    }
    const updatedEmojis = selectedEmojis.filter(
      (selectedEmoji) => selectedEmoji !== emoji
    );
    onSelect(updatedEmojis.length ? updatedEmojis[0] : "");
  };
  return (
    <PickerContainer style={{ display: "flex", flexWrap: "wrap" }}>
      {emojis.map((emoji) => (
        <EmojiButton
          key={emoji}
          onClick={() => {
            if (selectedEmojis.includes(emoji)) {
              handleCancelEmoji(emoji);
            } else {
              handleSelectEmoji(emoji);
            }
          }}
          selected={selectedEmojis.includes(emoji)}
        >
          {emoji}
        </EmojiButton>
      ))}
    </PickerContainer>
  );
};

export default EmojiPicker;
