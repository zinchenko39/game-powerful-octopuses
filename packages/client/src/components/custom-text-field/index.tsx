import { TextField } from '@mui/material'
import { useFormikContext } from 'formik'

type CustomTextFieldProps = {
  id: string
  label: string
  type: string
}

export function CustomTextField({ id, label, type }: CustomTextFieldProps) {
  const { values, handleChange, handleBlur, touched, errors } =
    useFormikContext<{ [id: string]: string }>()

  const value = values[id]

  const isError = Boolean(touched[id] && errors[id])

  const errorText = errors[id] || 'ошибка'

  const helperText = isError ? errorText : null

  return (
    <TextField
      fullWidth
      id={id}
      name={id}
      label={label}
      type={type}
      variant="outlined"
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      error={isError}
      helperText={helperText}
    />
  )
}
