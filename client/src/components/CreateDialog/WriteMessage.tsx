import type {RootState} from 'store/reducers'
import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {TextTypes} from 'models/common/text'
import {createDialog} from 'store/actions/dialogs'
import {Text} from 'components/common/Text'
import {ContentContainer} from 'components/common/ContentContainer'
import {Textarea} from 'components/common/Textarea'
import {Button} from 'components/common/Button'

export const WriteMessage= () => {
  const {creating, createErrorMessage} = useSelector((state: RootState) => (state.dialogs))
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  return (
    <>
      <header className="dialogs-modal__section dialogs-modal__section--header">
        <Text type={TextTypes.h4} customStyles="dialogs-modal__title">
          Write a message
        </Text>
      </header>

      <div className="dialogs-modal__section dialogs-modal__section--body">
        <ContentContainer
          customStyles={'dialogs-modal__error'}
          errorMessage={createErrorMessage}
          loading={creating}
        >
          <div className="dialogs-modal__textarea">
            <Textarea
              rows={10}
              value={message}
              onChange={setMessage}
            />
          </div>
        </ContentContainer>
      </div>

      <footer className="dialogs-modal__section dialogs-modal__section--footer">
        <Button text="Create dialog" onClick={() => dispatch(createDialog(message))} />
      </footer>
    </>
  )
}
