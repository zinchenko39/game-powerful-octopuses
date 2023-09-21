import React from 'react'
import { CustomTextFieldProps } from './props'
import { TextField } from '@mui/material'
import { useFormikContext, FormikProps } from 'formik'

export function CustomTextField({ id, label, type }: CustomTextFieldProps) {
  const formik = useFormikContext<any>() as FormikProps<any>

  return (
    <TextField
      fullWidth
      id={id}
      name={id}
      label={label}
      type={type}
      variant="outlined"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values[id]}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      helperText={(formik.touched[id] && formik.errors[id]) as React.ReactNode}
    />
  )
}
