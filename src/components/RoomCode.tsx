import copySVG from '../assets/vectors/copy.svg'
import '../styles/room-code.scss'

type RoomCodeProps = {
  code?: string
}

export const RoomCode = ({ code }: RoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    code && navigator.clipboard.writeText(code)
  }

  return (
    <button className='room-code' onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copySVG} alt='Copy room code' />
      </div>
      <span>Sala #{code}</span>
    </button>
  )
}
