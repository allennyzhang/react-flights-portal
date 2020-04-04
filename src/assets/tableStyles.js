import { createStyles } from '@material-ui/core';

export const tableStyles = (theme) => createStyles({
  table: {
    minWidth: 700,
    width: 'calc(100% - 2px)'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.secondary.main,
    },
    "border": '1px solid #b3bcbe'
  },
  tableHeadCell: {
    color: 'inherit',
    fontSize: '0.8125rem',
    fontWeight: 'bold'
  },
  tableCell: {
    lineHeight: '1.42857143',
    verticalAlign: 'middle',
    padding: '4px 16px 4px 16px'
  },
  tableResponsive: {
    width: '100%',
    overflowX: 'auto'
  },
});
