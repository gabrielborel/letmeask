import logoSVG from '../../assets/vectors/logo.svg'
import deleteSVG from '../../assets/vectors/delete.svg'
import checkSVG from '../../assets/vectors/check.svg'
import answerSVG from '../../assets/vectors/answer.svg'
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
    await database.ref(`rooms/${roomId}`).update({ endedAt: new Date() })
    toast.success('Sala encerrada.')
    navigate('/')
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
      toast.success('Pergunta excluida com sucesso.')
    }
  }

  const handleCheckQuestionAsAnswered = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }

  const handleHighlightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
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
          {questions.map(({ id, content, author, isHighlighted, isAnswered }) => {
            return (
              <Question
                key={id}
                content={content}
                author={author}
                isHighlighted={isHighlighted}
                isAnswered={isAnswered}
              >
                {!isAnswered && (
                  <>
                    <button type='button' onClick={() => handleCheckQuestionAsAnswered(id)}>
                      <img src={checkSVG} alt='Marcar pergunta como respondida' />
                    </button>
                    <button type='button' onClick={() => handleHighlightQuestion(id)}>
                      <img src={answerSVG} alt='Remover pergunta' />
                    </button>
                  </>
                )}
                <button type='button' onClick={() => handleDeleteQuestion(id)}>
                  <img src={deleteSVG} alt='Dar destaque a pergunta' />
                </button>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}
