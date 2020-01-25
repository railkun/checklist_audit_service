import React from "react";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

class CheckListItem extends React.Component {
  handleClickDelete() {

  axios.delete(this.props.checklist.url)
  };

  render () {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div>
            <a href={this.props.checklist.url}>
              <div> Title: {this.props.checklist.title}</div>
            </a>

            <div> Description: {this.props.checklist.description}</div>

            <div>
              <Button variant="contained" href={this.props.checklist.edit_url}>
                Edit
              </Button>

              <Button variant="contained" color="secondary" onClick={this.handleClickDelete.bind(this)}>
                Delete
              </Button>
            </div>
          </div >
        </Grid>
      </Grid>
    );
  }
}

export default CheckListItem
