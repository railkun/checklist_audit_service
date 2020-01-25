import React from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Container from '@material-ui/core/Container';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  answers: Yup.array()
    .of(Yup.object().shape({
      comment: Yup.string().min(28, "Min 28 chars").required('Required'),
      value: Yup.string().min(2, 'Too Short!').required('Required')
      // Rest of your amenities object properties
    }))
});

class AuditForm extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.checklist)
    // this.state = { title: '', description: '', questions: []};
  }

  // const handleSelectChange = event => {
  //   setAge(event.target.value);
  // };

  render () {
    const questions = this.props.checklist.questions;
    // { comment: '', value: '' }
    let initAnswers = [];
    this.props.checklist.questions.map((q) => {
      initAnswers.push({ comment: '', value: '' })
    });

    return (
      <Container maxWidth="sm">
        {console.log(initAnswers)}
        <h1>{this.props.checklist.title}</h1>
        <p>{this.props.checklist.description}</p>
        <Formik
          initialValues={{ answers: initAnswers }}
          validationSchema={schema}
          onSubmit={(values, touched) => {
            alert('Hahahaaaaaaaaaaaaaaaa!!!!')
            console.log(values)
            console.log(touched)
            // let data = {
            //   checklist: {
            //     title: values.title,
            //     description: values.description,
            //     questions_attributes: []
            //   }
            // };
            // values.questions.map((question, index) => {
            //   data['checklist']['questions_attributes'][index] = {
            //     title: question.title,
            //     description: question.description
            //   }
            // })
            //
            // axios.post('/checklists', {
            //   data
            // }).then(function (response) {
            //   window.location.replace(response.redirect_url);
            // })

          }}

        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <FieldArray
                name="answers"
                render={arrayHelpers => (
                  <div>
                    {questions && questions.length > 0 ? (
                      questions.map((question, index) => (
                        <div key={index}>
                          <h4>{question.title}</h4>
                          <p>{question.description}</p>
                          <div>
                            <InputLabel id="demo-simple-select-helper-label">Select Answer</InputLabel>
                            <Select name={`answers.${index}.value`} onChange={handleChange}>
                              <MenuItem value="" disabled>
                                Placeholder
                              </MenuItem>
                              <MenuItem value='yes'>yes</MenuItem>
                              <MenuItem value='no'>no</MenuItem>
                              <MenuItem value='NA'>NA</MenuItem>
                            </Select>
                            {errors.answers && typeof errors.answers[index] === 'object' && errors.answers[index].value ? (
                              <div>{errors.answers[index].value}</div>
                            ) : null}
                          </div>
                          <div>
                            <TextField
                              id="standard-basic"
                              label="Comment"
                              type="text"
                              name={`answers.${index}.comment`}
                            />
                            {errors.answers && typeof errors.answers[index] === 'object' && errors.answers[index].comment ? (
                              <div>{errors.answers[index].comment}</div>
                            ) : null}
                          </div>


                          <hr/>
                        </div>
                      ))
                    ) : (
                      <p> Sorry but there is no questions </p>
                    )}
                  </div>
                )}
              />
              <div>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>

      </Container>
    );
  };
}

export default AuditForm
