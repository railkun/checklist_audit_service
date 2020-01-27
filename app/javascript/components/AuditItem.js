import React from "react";
import Button from '@material-ui/core/Button';

import axios from 'axios';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';





class AuditItem extends React.Component {

  handleClickDelete() {
    axios.delete(this.props.audit.url).then(function (response) {
      window.location.href = response.data.redirect_url;
    });
  };

  render () {
    return (
      <TableRow hover key={this.props.audit.id}>
        <TableCell component="th" scope="row">
          {this.props.audit.checklist.title}
        </TableCell>
        <TableCell>{this.props.audit.updated_at}</TableCell>
        <TableCell align="center">
          <IconButton href={this.props.audit.edit_url}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" color="secondary" onClick={this.handleClickDelete.bind(this)}>
            <DeleteIcon />
          </IconButton>

        </TableCell>
      </TableRow>
    );
  }
}

export default AuditItem
