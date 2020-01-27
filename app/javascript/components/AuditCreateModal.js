import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Box from '@material-ui/core/Box';

class AuditCreateModal extends React.Component {
  constructor(props) {
    super(props);

  }

  render () {
    return (
      <Container maxWidth="sm" >
        <Formik
          initialValues={{ checklist: '' }}
          onSubmit={(values, { setSubmitting }) => {
            window.location.href = `/audits/new?checklist_id=${values.checklist.value.id}`
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
            <div>
              <FormControl>
                <h2>Select the checklist for the audit:</h2>
                <InputLabel id="demo-simple-select-label"></InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name={`checklist.value`}
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>Checklists</MenuItem>
                  {this.props.checklists.map( checklist => (
                    <MenuItem value={checklist}>{checklist.title}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <Box mx="auto" bgcolor="background.paper" p={1}>
              <Button type="submit" variant="contained" color="primary">
                Audit
              </Button>
            </Box>
          </form>
          )}
        </Formik>
      </Container>
    );
  }
}
export default AuditCreateModal
