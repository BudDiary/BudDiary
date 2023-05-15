import styled from "styled-components";
import tw from "twin.macro";

export const InputBox = styled.textarea`
  ${tw`bg-blue-200 text-gray-700 border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal font-hassam`}
  width: 80%;
  height: 100%;
  resize: none;
  ::-webkit-scrollbar {
    display: none;
  }
  vertical-align: middle;
  @media (max-width: 640px) {
    ${tw`bg-blue-200 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 mr-2 block appearance-none leading-normal font-hassam`}
    width: 70%;
  }
`;

export const UserInfo = styled.div`
  ${tw`flex items-start font-hassam my-1 p-2 pl-4`}

  > div:first-child {
    ${tw`flex items-center mr-2`}
  }
  > div:last-child {
    ${tw` mr-1`}
    width: 90%;
  }
  @media (max-width: 640px) {
    ${tw`flex items-start font-hassam my-2 p-2 pl-2`}
  }
  img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    border: 2px solid #abc4ff;

    @media (max-width: 640px) {
      width: 40px;
      height: 40px;
    }
  }

  h2 {
    ${tw`mb-0 font-bold`}

    @media (max-width: 640px) {
      font-size: 1.2rem;
    }
  }

  h3 {
    ${tw`mt-0.5 text-gray-500 text-xs`}

    @media (max-width: 640px) {
      font-size: 0.9rem;
    }
  }
`;

export const InputSet = styled.div`
  ${tw`flex justify-between w-full mt-4`}
`;

export const CommentWrapper = styled.div`
  ${tw`mx-auto`}
  width: 100%;
  @media (max-width: 640px) {
    font-size: 0.9rem;
  }
`;
export const EmojiPickerWrapper = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 1rem;
`;

export const DeleteContent = styled.div`
  ${tw`bg-blue-200 text-gray-700 mx-3 p-5`}
  height: 150px;
  border-radius: 15px;
  overflow-y: auto; /* 수직 스크롤 적용 */
`;
export const EditContentBox = styled.textarea`
  ${tw`bg-blue-200 text-gray-700 mx-3 p-5`}
  height: 180px;
  width: 90%;
  border-radius: 15px;
  overflow-y: auto;
  resize: none;
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
export const ReplyBox = styled.div`
  width: 40%;

  h2 {
    ${tw`font-bold`}
    font-size: 14px;
  }

  h3 {
    ${tw`font-bold text-gray-500`}
    font-size: 12px;
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
