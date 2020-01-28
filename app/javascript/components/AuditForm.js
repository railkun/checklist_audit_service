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
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const schema = Yup.object().shape({
  answers: Yup.array()
    .of(Yup.object().shape({
      comment: Yup.string().min(12, "Min 28 chars").required('Required'),
      value: Yup.string().min(2, 'Too Short!').required('Required')
    }))
});

class AuditForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const questions = this.props.checklist.questions;
    let initAnswers = [];
    this.props.audit.answers.map((a) => {
      initAnswers.push({ comment: a.comment, value: a.value, question_id: a.question_id, id: a.id })
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
                question_id: questions[index].id
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
                          <TableContainer component={Paper} >
                            <Table aria-label="simple table">
                              <TableRow>
                                <TableCell align="left">
                                  <h4>{question.title}</h4>
                                  <p>{question.description}</p>
                                </TableCell>
                                <TableCell align="right">
                                  <div>
                                    <InputLabel id="demo-simple-select-helper-label">Select Answer</InputLabel>
                                    <Select
                                      value={values.answers[index].value}
                                      name={`answers.${index}.value`}
                                      onChange={handleChange}>
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
                                </TableCell>
                              </TableRow>
                              <Box mx="auto" p={1}>
                                <TextField
                                  id="standard-basic"
                                  label="Comment"
                                  type="text"
                                  onChange={handleChange}
                                  value={values.answers[index].comment}
                                  name={`answers.${index}.comment`}
                                />
                                <Field
                                  id="standard-basic"
                                  type="hidden"
                                  name={`answers.${index}.id`}
                                />
                                <Field
                                  id="standard-basic"
                                  type="hidden"
                                  name={`answers.${index}.question_id`}
                                />
                                {errors.answers && typeof errors.answers[index] === 'object' && errors.answers[index].comment ? (
                                  <div>{errors.answers[index].comment}</div>
                                ) : null}
                              </Box>
                            </Table>
                          </TableContainer>
                        </div>
                      ))
                    ) : (
                      <p> Sorry but there is no questions </p>
                    )}
                  </div>
                )}
              />
              <Box mx="auto" p={1}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </form>
          )}
        </Formik>

      </Container>
    );
  };
}

export default AuditForm
