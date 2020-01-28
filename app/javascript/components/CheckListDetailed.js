import React from "react";
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
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';

class CheckListDetailed extends React.Component {

  render () {
    return (
      <Container maxWidth="sm">
        <h1>{this.props.checklist.title}</h1>
        <p>{this.props.checklist.description}</p>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Question title:</TableCell>
                <TableCell align="center">Question description:</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.checklist.questions && this.props.checklist.questions.length > 0 ? (
                this.props.checklist.questions.map((question) => {
                    return (
                      <TableRow hover key={question.id}>
                        <TableCell>{question.title}</TableCell>
                        <TableCell align="center">{question.description}</TableCell>
                      </TableRow>
                    )
                  })
                ) : (
                <p> Sorry but there is no questions </p>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  };
}

export default CheckListDetailed
