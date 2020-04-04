import React from 'react';
import {
  withStyles, Grid, Typography, Select,
  MenuItem, createStyles
} from '@material-ui/core';
import ReactPaginate from 'react-paginate';

const styles = () => createStyles({
  root: {
    width: '100%',
    overflowX: 'auto',
    flexGrow: 1,
    margin: 'auto'
  },
  paper: {
    height: 140,
    width: 100,
  }
});

const defaultPageSize = 10;

class PaginationImpl extends React.Component {
  onPageSizeChange = (event) => {
    if (this.props.onPageSizeChange) {
      this.props.onPageSizeChange(+(event.target.value));
    }
  }

  render() {
    const { totalHits, classes, currentPage, handleChangePage } = this.props;
    const pageSize = this.props.pageSize || defaultPageSize;
    const pageSizeOptions = this.props.pageSizeOptions || [10, 20, 50];
    return (
      (totalHits > 0) &&
      <Grid container className={classes.root} spacing={2} justify='space-between' alignItems='center' direction='row'>
        <Grid item />
        <Grid item>
          <Grid container justify='flex-start' alignItems='center' spacing={1}>
            <Grid item>
              <Typography>
                {((currentPage - 1) * pageSize) + 1} - {(currentPage * pageSize) > totalHits ?
                  totalHits : (currentPage * pageSize)} of {totalHits}
              </Typography>
            </Grid>
            <Grid item>
              <ReactPaginate previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={totalHits / pageSize}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handleChangePage}
                forcePage={currentPage - 1}
                disableInitialCallback={true}
                containerClassName={'react-paginate'}
                activeClassName={'active'} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item key="RowsPerPage">
          <Grid container spacing={1} alignItems='center'>
            <Grid item>
              <Typography display='inline'>Rows per page:</Typography>
            </Grid>
            <Grid item>
              <Select
                value={pageSize}
                onChange={this.onPageSizeChange}
                inputProps={{
                  id: 'pagesize-dropdown',
                }}
              >
                {pageSizeOptions.map(p => <MenuItem key={`rowsPerPage-${p}`} value={p}>{p}</MenuItem>)}
              </Select>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export const Pagination = withStyles(styles)(PaginationImpl);
