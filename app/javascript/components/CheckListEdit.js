import React from "react";
import QuestionInput from "./QuestionInput"
import axios from 'axios';

class CheckListEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      title_question: '',
      description_question: '',
      title_checklist: this.props.checklist.title,
      description_checklist: this.props.checklist.description
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick() {
    axios.put('/checklists/2', {
      checklist: { title: 'this.refs.title.value' ,
      description: 'this.refs.description.value',
    },
    questions: {
      checklist_id: 2,
      title: 'this.refs.title.value2' ,
      description: 'this.refs.description.value2'
    }})
  };

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addQuestion = () => {
    var questions = this.state.questions
    questions.push(
      <QuestionInput />
    )
    this.setState({questions: questions})
  }

  render() {
    return (
      <div>
        <div>
          Title: <input
            name="title_checklist"
            type="text"
            value={this.state.title_checklist}
            onChange={this.handleInputChange} />
        </div>

        <div>
          Description: <input
            name="description_checklist"
            type="text"
            value={this.state.description_checklist}
            onChange={this.handleInputChange} />
        </div>

        <table>
          {
            this.state.questions.map((r) => (
              <tr>
                <td>{r}</td>
              </tr>
            ))
          }
        </table>
        <button id="addBtn" onClick={this.addQuestion}>Add question</button>
        <button onClick={this.handleClick}>Update checklist</button>
      </div>
    );
  };
};

export default CheckListEdit
