import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material';
import { Field, FieldArray, Form, Formik } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';
import React from 'react';
import { boolean, number, object, string, array, ValidationError } from 'yup';


interface IDonations {
  institution: string
  percentage: number
}
interface IFormProps {
  fullName: string;
  donationsAmount: number;
  termsAndConditions: boolean;
  donations?: IDonations[]
}

const validationSchema = object({
  fullName: string()
    .required('Name is required')
    .min(3, 'Full Name must contain minimum 3 characters')
    .max(30),
  donationsAmount: number().required().min(10, 'Minimum donation is 10 $'),
  termsAndConditions: boolean().required().isTrue(),
  donations: array(object({
    institution: string().required().min(2).max(20),
    percentage: number().required().min(1).max(100)
  })).min(1).max(3).test((
    donations: Array<{
      percentage: number,
      institution: string
    }>
  ) => {
    const sum = donations.reduce((acc, curr) => acc + curr.percentage, 0)
    console.log(sum, 'Donate');

    if (sum !== 100) {
      return new ValidationError(`Percentage should be 100% but you have ${sum}%`, undefined, 'donations')
    }
    return true

  })
});

const formikInitialValues = {
  fullName: '',
  donationsAmount: 0,
  termsAndConditions: false,
  donations: [{ institution: '', percentage: 0 }]
};
const onSubmit = async (val: IFormProps) => {
  console.log('my values', val);
  return new Promise((resolve) => {
    return setTimeout(resolve, 1500);
  });
};

export default function Home() {
  return (
    <Card>
      <CardContent>
        <Formik
          initialValues={formikInitialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ values, errors, isSubmitting }) => (
            <Form autoComplete='off'>
              <Grid container direction='column' spacing={4}>
                <Grid item>
                  <Field
                    fullWidth
                    name='fullName'
                    component={TextField}
                    label='Full Name'
                    variant='filled'
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name='donationsAmount'
                    type='number'
                    component={TextField}
                    label='Donation ($)'
                    variant='filled'
                  />
                </Grid>

                <Grid item >
                  <FieldArray name='donations' >
                    {
                      ({ push, remove, }) => (
                        <>
                          <Grid item>
                            <Typography variant='body2'>All your donations</Typography>
                          </Grid>

                          {values.donations.map((_, index) => (
                            <Grid container item spacing={3} >
                              <Grid item xs={12}>
                                <Field
                                  fullWidth
                                  name={`donations[${index}].institution`}
                                  component={TextField}
                                  label='Institution'
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Field
                                  fullWidth
                                  name={`donations[${index}].percentage`}
                                  component={TextField}
                                  label='Percentage'
                                />
                              </Grid>
                              <Grid item xs={12} sm="auto">
                                <Button onClick={() => remove(index)}>Delete</Button>
                              </Grid>
                            </Grid>
                          ))}

                          <Grid>
                            <Button variant='contained'
                              onClick={() => push({
                                institution: '',
                                percentage: 0
                              })}>Add Donation</Button>
                          </Grid>
                        </>
                      )
                    }
                  </FieldArray>
                </Grid>

                <Grid item>
                  <Field
                    name='termsAndConditions'
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
                    startIcon={
                      isSubmitting ? (
                        <CircularProgress size='1rem' />
                      ) : undefined
                    }
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </Button>
                </Grid>
              </Grid>
              <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
}
