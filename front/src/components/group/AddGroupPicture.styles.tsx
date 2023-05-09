import styled from 'styled-components'
const boxStyle = `
  border: 1px solid black;
  min-width: 200px;
  min-height: 200px;
  nax-width: 200px;
  max-height: 200px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const UploadImageBox = styled.div`
  ${boxStyle}
  margin-top: 5%;
  margin-bottom: 10%;
  margin-right: 5%;
`;


export const InputImage = styled.input.attrs({
    id: "group-picture",
    type: "file",
    accept: "image/*",
  })`
    display: none;
  `;