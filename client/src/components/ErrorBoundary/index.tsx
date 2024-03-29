import type {Dispatch} from 'redux'
import type {IInitialState} from 'store/reducers/error'
import type {HideErrorNotificationAction} from 'models/store/actions/error'
import {Component, ErrorInfo, ReactNode} from 'react'
import {connect} from 'react-redux'
import {commonError, hideErrorNotification} from 'store/actions/error'
import {Notification, NotificationType} from 'components/common/Notification'
import {socket} from 'utils/socket'
import {EventsSocket} from 'models/common/socket'
import {CommonErrorAction} from 'models/store/actions/error'

interface IProps {
  showErrorNotification: boolean
  errorMessage: string
  hideErrorNotification: () => void
  callCommonError: (errorMessage: string) => void
  children: ReactNode
}

interface IState {
  error: null | Error
  errorInfo: null | ErrorInfo
  hasError: boolean
}

class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

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
    }
  }

  componentDidMount() {
    socket.on(EventsSocket.SOCKET_ERROR, (errorMessage: string) => {
      this.props.callCommonError(errorMessage)
    })
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>Something went wring.</h1>

          {process.env.NODE_ENV === 'development' && (
            <details style={{whiteSpace: 'pre-wrap'}}>
              {this.state.error?.toString()}
              <br />
              {this.state.errorInfo?.componentStack}
            </details>
          )}
        </>
      )
    }

    return (
      <>
        <Notification
          type={NotificationType.ERROR}
          visible={this.props.showErrorNotification}
          onEntered={this.props.hideErrorNotification}
          text={this.props.errorMessage}
        />

        {this.props.children}
      </>
    )
  }
}

const mapStateToProps = ({error}: {error: IInitialState}) => ({
  showErrorNotification: error.showErrorNotification,
  errorMessage: error.errorMessage,
})

const mapDispatchToProps = (
  dispatch: Dispatch<HideErrorNotificationAction | CommonErrorAction>,
) => ({
  hideErrorNotification: () => dispatch(hideErrorNotification()),
  callCommonError: (errorMessage: string) =>
    dispatch(commonError(errorMessage)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary)
