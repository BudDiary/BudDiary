import styledComponents from "styled-components";
import tw from "twin.macro";
import { styled } from "@mui/system";
import Option, { optionClasses } from "@mui/base/Option";
import { selectClasses } from "@mui/base/Select";
import Popper from "@mui/base/Popper";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  50: "#f6f8fa",
  100: "#eaeef2",
  200: "#d0d7de",
  300: "#afb8c1",
  400: "#8c959f",
  500: "#6e7781",
  600: "#57606a",
  700: "#424a53",
  800: "#32383f",
  900: "#24292f",
};

export const StyledOption = styled(Option)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionClasses.selected} {
      background-color: ${
        theme.palette.mode === "dark" ? blue[900] : blue[100]
      };
      color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
    }
  
    &.${optionClasses.highlighted} {
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &.${optionClasses.highlighted}.${optionClasses.selected} {
      background-color: ${
        theme.palette.mode === "dark" ? blue[900] : blue[100]
      };
      color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
    }
  
    &.${optionClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionClasses.disabled}) {
      background-color: ${
        theme.palette.mode === "dark" ? grey[800] : grey[100]
      };
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
    `
);

export const StyledButton = styled("button")(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    min-width: 320px;
    padding: 12px;
    border-radius: 12px;
    text-align: left;
    line-height: 1.5;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
    }
  
    &.${selectClasses.focusVisible} {
      border-color: ${blue[400]};
      outline: 3px solid ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }
  
    &.${selectClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `
);

export const StyledListbox = styled("ul")(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 320px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    box-shadow: 0px 4px 30px ${
      theme.palette.mode === "dark" ? grey[900] : grey[200]
    };
    `
);

export const StyledPopper = styled(Popper)`
  z-index: 1;
`;

// -------------------------------------------------------------------------------
// 스티커페이지 CSS

export const ContentBox = styledComponents.div`
  ${tw`w-full min-h-[720px] border my-8 px-4 pt-8 pb-32`};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const StickerListTitle = styledComponents.div`
  ${tw`text-2xl w-full my-4 font-berry`};
`;
