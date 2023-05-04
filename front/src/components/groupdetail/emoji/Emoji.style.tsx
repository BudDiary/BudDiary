import styled from "styled-components";

export const PickerContainer = styled.div`
  position: absolute;
  top: 0;
  right: 35px;
  display: flex;
  flex-direction: row; /* 가로 방향으로 아이템 배치 */
  background-color: white;
  border: 1px solid #bfdbfe;
  z-index: 1;
`;

export const EmojiButton = styled.button<{ selected?: boolean }>`
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
  border: none;
  background-color: ${({ selected }) => (selected ? "#BFDBFE" : "transparent")};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;
