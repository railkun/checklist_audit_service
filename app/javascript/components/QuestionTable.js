import React, { Component } from 'react';

class QuestionTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions : [],
      title_question:[],
      description_question:[]
    }
  }

  addQuestion() {
    this.setState({questions: [...this.state.questions, ""]})
  }

  handleChange(e, index) {
    const name = e.target.name;

    if (name = 'title_question')
      console.log(name);
    console.log(name);

    this.state.questions[index] = e.target.value

    this.setState({[name]: this.state.questions})

    console.log(this.state)
  }

  handleRemove(index){
    this.state.questions.splice(index, 1)

    console.log(this.state.questions, "$$$$");

    this.setState({questions: this.state.questions})
  }

  handleSubmit(e){
    console.log(this.state, "$$$$");
  }


  render() {
    return (
      <div className='App'>

        <h1>The form</h1>

        <label>Address</label>

        {
          this.state.questions.map((question, index) => {
            return (
              <div key={index}>
                <input onChange={(e)=>this.handleChange(e, index)}
                  name="title_question"
                  value={question} />
                  <input onChange={(e)=>this.handleChange(e, index)}
                    name="description_question"
                    value={question} />
                <button onClick={()=>this.handleRemove(index) }>Remove</button>
              </div>
            )
          })
        }

        <hr />

        <button onClick={(e)=>this.addQuestion(e)}>Add question</button>

        <hr />

        <button onClick={(e)=>this.handleSubmit(e)}>Submit </button>

      </div>
    );
  }

}
export default QuestionTable
