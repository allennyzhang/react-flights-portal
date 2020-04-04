
import { createMuiTheme } from '@material-ui/core/styles';

const primaryColor = '#f8961d';
const cloudGrayColor = '#f2f6f9';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: cloudGrayColor
    },
    background: {
      default: cloudGrayColor
    },
  },
  overrides: {
    MuiTableRow: {
      root: {
        height: 40,
      }
    },
    MuiTableCell: {
      root: {
        padding: '4px 16px 4px 16px',
      }
    },
  },
});
