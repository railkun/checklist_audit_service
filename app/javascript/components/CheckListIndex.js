import React from "react";
import CheckList from "./CheckList";

class CheckListIndex extends React.Component {

  render () {
    const checklisdsts = this.props.checklists.map((el) => {
        return (
          <CheckList checklist={el} />
        )
      }
    );

    return (
      <ul>
        {checklisdsts}
      </ul>
    );
  };
}

export default CheckListIndex
