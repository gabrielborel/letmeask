import logoSVG from '../../assets/vectors/logo.svg'
import deleteSVG from '../../assets/vectors/delete.svg'
import '../Room/styles.scss'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'
import { useRoom } from '../../hooks/useRoom'
// import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

type RoomParams = {
  id: string
}

export const AdminRoom = () => {
  const { id: roomId } = useParams<RoomParams>()
  const { questions, title } = useRoom(roomId)
  const navigate = useNavigate()
  // const { user } = useAuth()

  const handleEndRoom = async () => {
    await database.ref('rooms').update({ endedAt: new Date() })
    toast.success('Sala encerrada.')
    navigate('/')
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
      toast.success('Pergunta excluida com sucesso.')
    }
  }

  return (
    <div id='page-room'>
      <Toaster />
      <header>
        <div className='content'>
          <img src={logoSVG} alt='Letmeask' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className='question-list'>
          {questions.map(({ id, content, author }) => {
            return (
              <Question key={id} content={content} author={author}>
                <button type='button' onClick={() => handleDeleteQuestion(id)}>
                  <img src={deleteSVG} alt='Remover pergunta' />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}
