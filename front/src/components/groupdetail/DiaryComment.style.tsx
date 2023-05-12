import styled from "styled-components";
import tw from "twin.macro";

export const InputBox = styled.textarea`
  ${tw`bg-blue-200 text-gray-700 border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal`}
  width: 80%;
  height: 30px;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
  vertical-align: middle;
`;

export const UserInfo = styled.div`
  ${tw`flex items-start font-hassam my-2 mt-1 p-2 pl-4`}
  > div:first-child {
    display: flex;
    align-items: center;
    margin-right: 0.8rem;
  }

  img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    border: 1px solid black;
  }

  h2 {
    margin-bottom: 0;
    font-weight: bold;
  }

  h3 {
    margin-top: 0.25rem;
    color: gray;
    font-size: 0.75rem;
  }
`;

export const InputSet = styled.div`
  ${tw`flex justify-around w-full mt-4`}
`;

export const CommentWrapper = styled.div`
  ${tw`mx-auto`}
  width: 95%;
`;
export const EmojiPickerWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 1rem;
`;

export const DeleteContent = styled.div`
  ${tw`bg-blue-200 text-gray-700 mx-6 p-4`}
  height: 150px;
  border-radius: 15px;
`;

export const CommentBox = styled.div`
  width: 55%;

  h2 {
    ${tw`font-bold`}
  }

  h3 {
    ${tw`font-bold text-gray-500 text-sm`}
  }
`;

export const ExpansionButton = styled.div`
  ${tw`text-xs font-bold my-4 text-blue-700 text-bud-blue font-hassam`}
`;

export const CommentError = styled.div`
  ${tw`text-red-400 text-bud-pink ml-3 mt-2 font-hassam text-sm`}
`;

export const EditTitle = styled.div`
  ${tw`text-lg font-berry`}
  letter-spacing: 0.5px;
`;
