import {Component, ErrorInfo} from 'react';

interface IProps {}
interface IState {
  error: null | Error;
  errorInfo: null | ErrorInfo;
  hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      error: null,
      errorInfo: null,
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: Error) {
    console.log(error)
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  _renderDetailInfo() {
    if (process.env.NODE_ENV === 'development') {
      return (
        <div>

        </div>
      )
    }

    return null
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Что-то пошло не так.</h1>

          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          )}
        </>
      )
    }

    return this.props.children;
  }
}
