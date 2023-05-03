import styled from "styled-components";
import tw from "twin.macro";

export const InputBox = styled.textarea`
  ${tw`bg-blue-200 text-gray-700 border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal`}
  width: 80%;
  height: 30px;
`;

export const UserInfo = styled.div`
  ${tw`flex items-start mb-4`}

  > div:first-child {
    display: flex;
    align-items: center;
    margin-right: 1rem;
  }

  img {
    border-radius: 100%;
    width: 50px;
    height: 50px;
    border: 1px solid black;
  }

  h2 {
    margin-bottom: 0;
  }

  h3 {
    margin-top: 0.25rem;
    margin-left: 0.5rem;
    color: gray;
    font-size: 0.75rem;
  }

  .comment {
    margin-top: 0.5rem;
  }

  .comment p {
    margin-bottom: 0.5rem;
  }
`;

export const InputSet = styled.div`
  ${tw`flex justify-between w-full mt-4`}
`;

export const CommentWrapper = styled.div`
  ${tw`mx-auto`}
  width: 95%;
`;
