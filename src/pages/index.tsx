import { Button, Card, CardContent, CircularProgress, Grid } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import React from 'react';
import { boolean, number, object, string } from 'yup';

interface IFormProps {
  fullName: string
  donationsAmount: number
  termsAndConditions: boolean
}

const validationSchema = object({
  fullName: string().required('Name is required').min(3, 'Full Name must contain minimum 3 characters').max(30),
  donationsAmount: number().required().min(10, 'Minimum donation is 10 $'),
  termsAndConditions: boolean().required().isTrue()
})

const formikInitialValues = {
  fullName: "",
  donationsAmount: 0,
  termsAndConditions: false
}
const onSubmit = async (val: IFormProps) => {
  console.log('my values', val);
  return new Promise(resolve => {
    return setTimeout(resolve, 2500)
  })
}

export default function Home() {

  return (
    <Card>
      <CardContent>
        <Formik initialValues={formikInitialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit(values)}>
          {({ values, errors, isSubmitting, }) => (
            <Form autoComplete='off'>
              <Grid container direction='column' spacing={4}>
                <Grid item>
                  <Field
                    fullWidth
                    name="fullName"
                    component={TextField}
                    label='Full Name'
                    variant='filled'
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name="donationsAmount"
                    type='number'
                    component={TextField}
                    label='Donation ($)'
                    variant='filled'
                  />
                </Grid>
                <Grid item>
                  <Field
                    name="termsAndConditions"
                    type='checkbox'
                    component={CheckboxWithLabel}
                    Label={{ label: 'I accept the terms and conditions' }}
                  />
                </Grid>
                <Grid item>
                  <Button
                    disabled={isSubmitting}
                    type='submit'
                    variant='contained'
                    color='primary'
                    startIcon={isSubmitting ? <CircularProgress size='1rem' /> : undefined}
                  >
                    {isSubmitting ? "Submitting..." : 'Submit'}
                  </Button>
                </Grid>
              </Grid>
              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form >
          )}
        </Formik>
      </CardContent>
    </Card >
  )
}