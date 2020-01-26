import React from "react";
import CheckListItem from "./CheckListItem";

import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';

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


class CheckListIndex extends React.Component {



  render () {

    const checklists = this.props.checklists.map((el) => {
        return (
          <CheckListItem checklist={el} />
        )
      }
    );

    return (
      <Container maxWidth="sm">
        <Button variant="contained" color="primary" href= {this.props.new_checklist_url} >
          Create checklist
        </Button>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.checklists.map(checklist => (
                <CheckListItem checklist={checklist} />
              ))}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPage="2"
                  count={this.props.checklists.length}
                  page="0"
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
