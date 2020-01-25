import React from "react";
import CheckListItem from "./CheckListItem";
import Button from '@material-ui/core/Button';


class CheckListIndex extends React.Component {

  render () {
    const checklists = this.props.checklists.map((el) => {
        return (
          <CheckListItem checklist={el} />
        )
      }
    );

    return (
      <div>
        <Button variant="contained" color="primary" href= {this.props.new_checklist_url} >
          Create checklist
        </Button>
        <ul className="col-md-4 list-group">
          {checklists}
        </ul>
      </div>
    );
  };
}

export default CheckListIndex
