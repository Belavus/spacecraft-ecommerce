import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import {PAGE_PADDING_TOP} from "../../theme/sizes";
import {Box} from "@mui/material";

export const StyledPageContainer = styled(Box)`
  max-width: 1500px;
  margin: 0 auto;
  padding: 0 20px;

  ${({ withHeaderOffset }) =>
      withHeaderOffset &&
      `
    padding-top: ${PAGE_PADDING_TOP};
  `}
`;
