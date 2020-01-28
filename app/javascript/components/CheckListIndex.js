import React from "react";
import CheckListItem from "./CheckListItem";

import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Box from '@material-ui/core/Box';

class CheckListIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      page: 0,
      rowsPerPage: 10
    };
  }


  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: +event.target.value});
    this.setState({page: 0});
  };

  handleChangePage = (event, newPage) => {
    this.setState({page: newPage});
  };

  render () {
    const checklists = this.props.checklists.map((el) => {
        return (
          <CheckListItem checklist={el} />
        )
      }
    );

    return (
      <Container maxWidth="sm">

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title:</TableCell>
                <TableCell align="center">Description:</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.checklists && this.props.checklists.length > 0 ? (
                (this.state.rowsPerPage > 0
                  ? this.props.checklists.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                  : this.props.checklists
                ).map(checklist => (
                  <CheckListItem checklist={checklist} />
                ))
              ) : (
                <p> Sorry but there is no checklists </p>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <Box mx="auto" bgcolor="background.paper" p={1}>
                  <IconButton variant="contained" color="primary" href= {this.props.new_checklist_url} >
                    <AddIcon />
                  </IconButton>
                </Box>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  rowsPerPage={this.state.rowsPerPage}
                  count={this.props.checklists.length}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
              </TableRow>
            </TableFooter>

          </Table>
        </TableContainer>
      </Container>
    );
  };
}

export default CheckListIndex
