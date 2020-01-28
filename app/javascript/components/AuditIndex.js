
import React from "react";
import AuditItem from "./AuditItem";
import AuditCreateModal from "./AuditCreateModal";

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
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

class AuditIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      page: 0,
      rowsPerPage: 10,
      open: ''
    };
  }



  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: +event.target.value});
    this.setState({page: 0});
  };

  handleChangePage = (event, newPage) => {
    this.setState({page: newPage});
  };

  render () {
    const audits = this.props.audits.map((el) => {
        return (
          <AuditItem audit={el} />
        )
      }
    );

    return (
      <Container maxWidth="sm">

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <Container maxWidth="sm">
            <Box mx="auto" bgcolor="background.paper" p={5}>
              <div id="simple-modal-title">
                <AuditCreateModal checklists={this.props.checklists}/>
              </div>
            </Box>
          </Container>
        </Modal>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Checklist title</TableCell>
                <TableCell align="center">Last update</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.audits && this.props.audits.length > 0 ? (
                (this.state.rowsPerPage > 0
                  ? this.props.audits.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                  : this.props.audits
                ).map(audit => (
                  <AuditItem audit={audit} />
                ))
              ) : (
                <p> Sorry but there is no audits </p>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <Box mx="auto" bgcolor="background.paper" p={1}>
                  <Button variant="contained" color="success" onClick={this.handleOpen} >
                    Audit
                  </Button>
                </Box>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  rowsPerPage={this.state.rowsPerPage}
                  count={this.props.audits.length}
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

export default AuditIndex
