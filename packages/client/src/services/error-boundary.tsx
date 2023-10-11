import { Paper, Typography } from '@mui/material'
import React, { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  customError?: Error
  customErrorInfo?: ErrorInfo
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      customError: undefined,
      customErrorInfo: undefined,
    }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({
      hasError: true,
      customError: error,
      customErrorInfo: info,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper elevation={3} style={{ padding: '16px' }}>
          <Typography variant="h4" color="error">
            Что-то пошло не так
          </Typography>
          <Typography variant="body1">
            Пожалуйста, обновите страницу или попробуйте позднее.
          </Typography>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '8px' }}>
            <Typography variant="body2" color="error">
              {this.state.customError && this.state.customError.toString()}
            </Typography>
            <Typography variant="body2">
              {this.state.customErrorInfo &&
                this.state.customErrorInfo.componentStack}
            </Typography>
          </details>
        </Paper>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
