import { Box } from '@mui/material';
import styled from 'styled-components';

export const StyledBox = styled(Box)`
  width: 100px;
  /* height: 100px; */

  
  @media (min-width: 600px) {
    width: 300px;
    /* height: 200px; */
  }
`;
