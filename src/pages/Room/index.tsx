import logoSVG from '../../assets/vectors/logo.svg'
import './styles.scss'

import { FormEvent, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { useAuth } from '../../hooks/useAuth'
import { database } from '../../services/firebase'
import toast, { Toaster } from 'react-hot-toast'
import { Question } from '../../components/Question'

type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string
      avatar: string
    }
    content: string
    isHighlighted: boolean
    inAswered: boolean
  }
>

type QuestionProps = {
  id: string
  author: {
    name: string
    avatar: string
  }
  content: string
  isHighlighted: boolean
  isAnswered: boolean
}

type RoomParams = {
  id: string
}

export const Room = () => {
  const [newQuestion, setNewQuestion] = useState('')
  const [questions, setQuestions] = useState<QuestionProps[]>([])
  const [title, setTitle] = useState('')
  const { user } = useAuth()
  const { id: roomId } = useParams<RoomParams>()

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', (room) => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isAnswered: value.inAswered,
          isHighlighted: value.isHighlighted,
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault()

    if (newQuestion.trim() === '') return

    if (!user) {
      throw new Error('You must be logged in.')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`/rooms/${roomId}/questions`).push(question)

    toast.success('Pergunta enviada com sucesso.')
    setNewQuestion('')
  }

  return (
    <div id='page-room'>
      <Toaster />
      <header>
        <div className='content'>
          <img src={logoSVG} alt='Letmeask' />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className='room-title'>
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='O que voce quer perguntar?'
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className='form-footer'>
            {user ? (
              <div className='user-info'>
                <img src={user.avatar} alt='User avatar' />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faca seu login</button>.
              </span>
            )}
            <Button type='submit' disabled={!user}>
              Enviar pegunta
            </Button>
          </div>
        </form>

        <div className='question-list'>
          {questions.map(({ id, content, author }) => {
            return <Question key={id} content={content} author={author} />
          })}
        </div>
      </main>
    </div>
  )
}
