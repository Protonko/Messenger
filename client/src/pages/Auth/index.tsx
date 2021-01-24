import {AuthForm} from 'components/AuthForm';

export const Auth = () => {
  return (
    <div className="auth">
      <div className="auth__head-bg" />
      <AuthForm
        title={'Sign in'}
        description={'Note that you need an existing account to log in to this messenger. To sign up, use the button bellow.'}
      />
    </div>
  )
}
