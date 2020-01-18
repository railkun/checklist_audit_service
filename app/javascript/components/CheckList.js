import React from "react";

class CheckList extends React.Component {
  render () {
    return (
      <div>
        <div> Title: {this.props.checklist.title}</div>
        <div> Description: {this.props.checklist.description}</div>
      </div>  
    );
  }
}

export default CheckList
