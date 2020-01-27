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
      comment: Yup.string().min(2, "Min 28 chars").required('Required'),
      value: Yup.string().min(2, 'Too Short!').required('Required')
      // Rest of your amenities object properties
    }))
});

class AuditForm extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    const questions = this.props.checklist.questions;
    let initAnswers = [];
  
    this.props.checklist.questions.map((q) => {
      initAnswers.push({ comment: '', value: '', question_id: q.id, answers_id: '' })
    });

    return (
      <Container maxWidth="sm">
        <h1>{this.props.checklist.title}</h1>
        <p>{this.props.checklist.description}</p>
        <Formik
          initialValues={{ answers: initAnswers }}
          validationSchema={schema}
          onSubmit={(values, { setSubmitting }) => {

            let data = {
              audit: {
                checklist_id: this.props.checklist.id,
                answers_attributes: []
              }
            };
            values.answers.map((answer, index) => {
              data['audit']['answers_attributes'][index] = {
                id: answer.id,
                comment: answer.comment,
                value: answer.value,
                question_id: answer.question_id
              }
            })
            axios({
              method: this.props.http_method,
              url:  this.props.url,
              data: data
            }).then(function (response) {
              window.location.href = response.data.redirect_url;
            });
          }}

        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit
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
                            <Field
                              id="standard-basic"
                              label="Comment"
                              type="text"
                              name={`answers.${index}.comment`}
                            />
                            <Field
                              id="standard-basic"
                              type="hidden"
                              name={`answers.${index}.id`}
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
