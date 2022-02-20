import copySVG from '../../assets/vectors/copy.svg'
import './styles.scss'
import toast from 'react-hot-toast'

type RoomCodeProps = {
  code?: string
}

export const RoomCode = ({ code }: RoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    code && navigator.clipboard.writeText(code)
    toast.success('Codigo da sala copiado com sucesso')
  }

  return (
    <button className='room-code' onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copySVG} alt='Copy room code' />
      </div>
      <span>Sala {code}</span>
    </button>
  )
}
