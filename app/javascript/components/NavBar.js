import React from "react";
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import PlaylistAddCheckSharpIcon from '@material-ui/icons/PlaylistAddCheckSharp';
import { IconButton } from '@material-ui/core';
import CheckBoxSharpIcon from '@material-ui/icons/CheckBoxSharp';
import { palette } from '@material-ui/system';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';

class NavBar extends React.Component {

  handleClickChecklist() {
    window.location.href = "/checklists";
  }

  handleClickAudit() {
    window.location.href = "/audits";
  }

  handleClickBack() {
    window.history.back();
  }

  render () {
    return (
      <Box mx="auto" p={1}>

          <TableContainer component={Paper} >
            <Table aria-label="simple table" bgcolor="LightSlateGray">
              <TableRow>
                <TableCell align="left">
                  <h3>Checklist audit service</h3>
                </TableCell>
                <TableCell align="right">
                  <IconButton variant="contained" onClick={this.handleClickChecklist} color="text.primary">
                    <PlaylistAddCheckSharpIcon />
                  </IconButton>
                  <IconButton variant="contained" onClick={this.handleClickAudit} color="text.primary">
                    <CheckBoxSharpIcon />
                  </IconButton>
                  <IconButton variant="contained" onClick={this.handleClickBack}>
                    <BackspaceSharpIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </Table>
          </TableContainer>

      </Box>
    )
  }
}
export default NavBar
