import React from "react";
import Grid from '@material-ui/core/Grid';

class CheckListDetailed extends React.Component {

  render () {
    return (
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12}>Title: {this.props.checklist.title}</Grid>
            <Grid item xs={12}>Description: {this.props.checklist.description}</Grid>
          </Grid>
        </div>
    );
  };
}

export default CheckListDetailed
