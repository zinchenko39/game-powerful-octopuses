import { ChangePasswordProps } from '../../services'

export interface IChangePasswordForm {
  onSubmit: (values: ChangePasswordProps) => Promise<void>
}
