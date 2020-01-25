import React from "react";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import TextField from '@material-ui/core/TextField';

class CheckListForm extends React.Component {
  constructor(props) {
    super(props);

    // this.state = { title: '', description: '', questions: []};

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleClick() {

    axios.post('/checklists', {
      checklist: {
        title: this.state.title ,
        description: this.state.description
      }
    })
  };

  render () {
    return (
      <div>
        <Formik
          initialValues={{ title: '', description: '', questions: [] }}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values.questions)
            // setTimeout(() => {
            //   alert(JSON.stringify(values, null, 2));
            //   setSubmitting(false);
            // }, 400);
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
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <FieldArray
                name="questions"
                render={arrayHelpers => (
                  <div>
                    {values.questions && values.questions.length > 0 ? (
                      values.questions.map((question, index) => (
                        <div key={index}>
                          <Field name={`questions.${index}.title`} />
                          <Field name={`questions.${index}.description`} />
                          <button
                            type="button"
                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                          >
                            -
                          </button>
                          <button
                            type="button"
                            onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                          >
                            +
                          </button>
                        </div>
                      ))
                    ) : (
                      <button type="button" onClick={() => arrayHelpers.push('')}>
                        {/* show this when user has removed all friends from the list */}
                        Add a friend
                      </button>
                    )}
                    <div>
                      <button type="submit">Submit</button>
                    </div>
                  </div>
                )}
              />

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
              </div>

              <div>
                <TextField
                  id="standard-basic"
                  label="Description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
              </div>
              <div>
                <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </div>
            </form>
          )}
        </Formik>

      </div>
    );
  };
}

export default CheckListForm
