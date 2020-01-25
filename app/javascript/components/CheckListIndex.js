import React from "react";
import CheckListItem from "./CheckListItem";

import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';


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
        <ul className="col-md-4 list-group">
          {checklists}
        </ul>
      </Container>
    );
  };
}

export default CheckListIndex
