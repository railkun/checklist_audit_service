import React from "react";
import Button from '@material-ui/core/Button';

import axios from 'axios';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';





class CheckListItem extends React.Component {

  handleClickDelete() {
    axios.delete(this.props.checklist.url).then(function (response) {
      window.location.href = response.data.redirect_url;
    });
  };

  render () {
    return (
      <TableRow hover key={this.props.checklist.id}>
        <TableCell component="th" scope="row">
          {this.props.checklist.title}
        </TableCell>
        <TableCell>{this.props.checklist.description}</TableCell>
        <TableCell align="right">
          <IconButton color="primary" href={this.props.checklist.url}>
            <InfoIcon />
          </IconButton>
          <IconButton href={this.props.checklist.edit_url}>
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

export default CheckListItem
