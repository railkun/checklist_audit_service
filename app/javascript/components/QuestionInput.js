import React from 'react';

class QuestionInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions : {
        title_question: '',
        description_question: ''
      }
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      questions: {
        [name]: value
      }
    });
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <input
          id={this.state.id}
          name="title_question"
          type="text"
          value={this.state.title_question}
          onChange={this.handleInputChange}
          placeholder="Question title:" />
        <input
          name="description_question"
          type="text"
          value={this.state.description_question}
          onChange={this.handleInputChange}
          placeholder="Question description:" />
      </div>
    )
  }

}

export default QuestionInput
