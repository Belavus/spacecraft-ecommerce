import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import {PAGE_PADDING_TOP} from "../../theme/sizes";

export const StyledPageContainer = styled(Container)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

  ${({ withHeaderOffset }) =>
      withHeaderOffset &&
      `
    padding-top: ${PAGE_PADDING_TOP};
  `}
`;
