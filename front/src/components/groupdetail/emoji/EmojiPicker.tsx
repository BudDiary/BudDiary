import React from "react";

import { PickerContainer, EmojiButton } from "./Emoji.style";

type Props = {
  onSelect: (emoji: string) => void;
  selectedEmojis: string[];
};

const EmojiPicker = ({ onSelect, selectedEmojis }: Props) => {
  const emojis = ["😀", "😍", "😎", "🥳", "😡", "😢", "🤔"];

  return (
    <PickerContainer style={{ display: "flex", flexWrap: "wrap" }}>
      {emojis.map((emoji) => (
        <EmojiButton
          key={emoji}
          onClick={() => onSelect(emoji)}
          selected={selectedEmojis.includes(emoji)}
        >
          {emoji}
        </EmojiButton>
      ))}
    </PickerContainer>
  );
};

export default EmojiPicker;
