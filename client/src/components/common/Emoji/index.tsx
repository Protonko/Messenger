import 'emoji-mart/css/emoji-mart.css'
import {FC, useState, useRef} from 'react'
import {EmojiData, Picker} from 'emoji-mart'
import {ReactComponent as Smile} from 'assets/icons/smile.svg'
import {useOutsideClick} from 'hooks/useOutsideClick'

export interface IPropsEmoji {
  onSelect: (emoji: EmojiData) => void
}

export const Emoji: FC<IPropsEmoji> = ({onSelect}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const initiatorRef = useRef(null)

  useOutsideClick(ref, () => setOpen(false), initiatorRef)

  const onSelectEmoji = (emoji: EmojiData) => {
    onSelect(emoji)
    setOpen(false)
  }

  return (
    <div className="emoji">
      {open && (
        <div className="emoji__popup" ref={ref}>
          <Picker native={true} onSelect={onSelectEmoji} />
        </div>
      )}

      <Smile
        className="emoji__button"
        ref={initiatorRef}
        onClick={() => setOpen(!open)}
      />
    </div>
  )
}
