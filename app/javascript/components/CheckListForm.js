import React from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import TextField from '@material-ui/core/TextField';
import * as Yup from 'yup';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


const SignupSchema = Yup.object().shape({
  title: Yup.string()
    .max(40, 'Too Long!')
    .required('Required'),
  questions: Yup.array()
    .of(Yup.object().shape({
      title: Yup.string()
        .min(12, "Too Short!")
        .max(40, 'Too Long!')
        .required('Required')
    }))
});

class CheckListForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const checklist =  this.props.checklist;
    const http_method = this.props.http_method;

    return (
      <Container maxWidth="sm">
        <Formik
          initialValues={{ title: checklist.title, description: checklist.description, questions: checklist.questions }}
          validationSchema={SignupSchema}
          onSubmit={(values, { setSubmitting }) => {
            let data = {
              checklist: {
                title: values.title,
                description: values.description,
                questions_attributes: []
              }
            };
            values.questions.map((question, index) => {
              data['checklist']['questions_attributes'][index] = {
                title: question.title,
                description: question.description,
                id: question.id
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
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  id="standard-basic"
                  label="Title"
                  type="text"
                  name="title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />

                {errors.title && (
                  <span>{errors.title}</span>
                )}
                <TextField
                  id="standard-basic"
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </div>

              <FieldArray
                name="questions"
                render={arrayHelpers => (
                  <div>
                    {values.questions && values.questions.length > 0 ? (
                      values.questions.map((question, index) => (
                        <div key={index}>
                          {question.id && (
                            <TextField
                              type="hidden"
                              value={question.id}
                              onChange={handleChange}
                              name={`questions.${index}.id`} />
                          )}
                          <TextField
                            id="standard-basic"
                            label="Question title"
                            type="text"
                            value={values.questions[index].title}
                            onChange={handleChange}
                            name={`questions.${index}.title`} />
                          {Array.isArray(errors.questions) && errors.questions[index] != null && typeof errors.questions[index] === 'object' && errors.questions[index].title && (
                            <span>{errors.questions[index].title}</span>
                          )}
                          <TextField
                            id="standard-basic"
                            label="Question description"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.questions[index].description}
                            name={`questions.${index}.description`} />
                          <IconButton variant="contained" type="button" onClick={() => arrayHelpers.remove(index)} >
                            <RemoveIcon />
                          </IconButton>
                          <IconButton variant="contained" type="button" onClick={() => arrayHelpers.insert(index, {title: '', description: ''})}>
                            <AddIcon />
                          </IconButton>
                        </div>
                      ))
                    ) : (
                      <Box mx="auto" bgcolor="background.paper" p={1}>
                        <Button variant="contained" color="primary" type="button" onClick={() => arrayHelpers.push('')}>
                          Add question
                        </Button>
                      </Box>
                    )}
                  </div>
                )}
              />

              <div>
                <Box mx="auto" bgcolor="background.paper" p={1}>
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Submit
                  </Button>
                </Box>
              </div>
            </form>
          )}
        </Formik>

      </Container>
    );
  };
}

export default CheckListForm
