import React from "react";

type Props = {
  emojis: string[];
};

const EmojiCount = ({ emojis }: Props) => {
  const emojiCounts = emojis.reduce(
    (counts: Record<string, number>, emoji: string) => {
      counts[emoji] = counts[emoji] ? counts[emoji] + 1 : 1;
      return counts;
    },
    {}
  );

  return (
    <div style={{ display: "flex" }}>
      {Object.keys(emojiCounts).map((emoji) => (
        <p key={emoji} style={{ marginRight: "0.5rem" }}>
          {emoji} {emojiCounts[emoji]}
        </p>
      ))}
    </div>
  );
};

export default EmojiCount;
