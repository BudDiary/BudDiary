import React from "react";
import { Reaction } from "../../../types/group";

type EmojiCountProps = {
  reactionList: Reaction[];
};

const emojiActionTypes: { [key: string]: string } = {
  LIKED: "😀",
  BEST: "👍",
  ANGRY: "😡",
  SAD: "😢",
  SURPRISED: "😲",
};

const EmojiCount = ({ reactionList }: EmojiCountProps) => {
  const countActionTypes = (reactionList: Reaction[]) => {
    const counts: Record<string, number> = {};
    reactionList.forEach((reaction) => {
      counts[reaction.actionType] = counts[reaction.actionType]
        ? counts[reaction.actionType] + 1
        : 1;
    });
    return counts;
  };
  const actionTypesCount = countActionTypes(reactionList);
  return (
    <div style={{ display: "flex" }}>
      {Object.keys(actionTypesCount).map((actionType) => (
        <p key={actionType} style={{ marginRight: "0.5rem" }}>
          {emojiActionTypes[actionType]} {actionTypesCount[actionType]}
        </p>
      ))}
    </div>
  );
};

export default EmojiCount;
