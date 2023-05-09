import styled, { css } from "styled-components";

export const selectStyle = css`
background-color:#ABC4FF;
color:black;
`

interface TagProps {
  select?: boolean;
}

export const Tag = styled.div<TagProps>`
        height:30px;
        /* border-radius:4px; */
        padding:4px;
        margin:6px;
        display:inline-block;
        text-align:center;
        color:rgba(0,0,0,0.5);
        border:solid 1px gray;
        cursor:pointer;
        font-size:13px;
        ${({ select }) => select && selectStyle};
        border-radius: 4px;    
`

export const MoveIndex = styled.div`
  display: flex;
  justify-content: space-between;
`