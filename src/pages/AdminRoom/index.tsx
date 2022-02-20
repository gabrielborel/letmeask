import logoSVG from '../../assets/vectors/logo.svg'
import deleteSVG from '../../assets/vectors/delete.svg'
import checkSVG from '../../assets/vectors/check.svg'
import answerSVG from '../../assets/vectors/answer.svg'
import openMenuSVG from '../../assets/vectors/open-menu.svg'
import closeMenuSVG from '../../assets/vectors/close-menu.svg'
import deleteSVGModal from '../../assets/vectors/delete-modal.svg'
import excluirSVGModal from '../../assets/vectors/excluir-modal.svg'
import '../Room/styles.scss'
import { Button } from '../../components/Button'
import { RoomCode } from '../../components/RoomCode'
import { Question } from '../../components/Question'
import { database } from '../../services/firebase'
import { useRoom } from '../../hooks/useRoom'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import Modal from 'react-modal'

type RoomParams = {
  id: string
}

type ModalProps = {
  isOpen: boolean
  modal: string
}

Modal.setAppElement(document.getElementById('root') as HTMLElement)

export const AdminRoom = () => {
  const { id: roomId } = useParams<RoomParams>()
  const { questions, title } = useRoom(roomId)
  const navigate = useNavigate()
  const [modalIsOpen, setModalIsOpen] = useState<ModalProps>({
    isOpen: false,
    modal: '',
  })
  const [questionId, setQuestionId] = useState('')

  const handleEndRoom = async () => {
    await database.ref(`rooms/${roomId}`).update({ endedAt: new Date() })
    toast.success('Sala encerrada.')
    navigate('/')
  }

  const handleDeleteQuestion = async () => {
    setModalIsOpen({ isOpen: false, modal: '' })
    await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    toast.success('Pergunta excluida com sucesso.')
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

  const customStyles = {
    content: {
      margin: `0 auto`,
      width: '80%',
      maxWidth: '600px',
      height: '362px',
      top: '25%',
      border: 'none',
      borderRadius: '8px',
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }

  return (
    <div id='page-room'>
      <Toaster />
      <header>
        <div className='content'>
          <img src={logoSVG} alt='Letmeask' />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => setModalIsOpen({ isOpen: true, modal: 'room' })}>
              Encerrar sala
            </Button>
            <button
              className='menu-mobile'
              onClick={() => setModalIsOpen({ isOpen: true, modal: 'menu' })}
            >
              <img src={openMenuSVG} alt='Icone de abrir o menu' />
            </button>
            <Modal
              isOpen={modalIsOpen.isOpen && modalIsOpen.modal === 'menu'}
              style={{
                content: {
                  width: '100vw',
                  inset: '0',
                  height: 'fit-content',
                  position: 'relative',
                  padding: '24px',
                },
              }}
            >
              <div className='modal-menu'>
                <div className='header'>
                  <img src={logoSVG} alt='Letmeask' />
                  <button
                    className='close-modal'
                    onClick={() => setModalIsOpen({ isOpen: false, modal: '' })}
                  >
                    <img src={closeMenuSVG} alt='Fechar menu' />
                  </button>
                </div>
                <RoomCode code={roomId} />
                <Button isOutlined onClick={() => setModalIsOpen({ isOpen: true, modal: 'room' })}>
                  Encerrar sala
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </header>
      <Modal isOpen={modalIsOpen.isOpen && modalIsOpen.modal === 'room'} style={customStyles}>
        <div className='modal-container'>
          <img src={deleteSVGModal} alt='Icone de deletar' />
          <h2>Encerrar sala</h2>
          <p>Tem certeza que voce deseja encerrar esta sala ?</p>
          <div>
            <Button
              type='button'
              className='button btn-cancelar'
              onClick={() => setModalIsOpen({ isOpen: false, modal: '' })}
            >
              Cancelar
            </Button>
            <Button type='button' className='button btn-encerrar' onClick={handleEndRoom}>
              Sim, encerrar
            </Button>
          </div>
        </div>
      </Modal>

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
                      <img src={answerSVG} alt='Dar destaque a pergunta' />
                    </button>
                  </>
                )}
                <button
                  type='button'
                  onClick={() => {
                    setModalIsOpen({ isOpen: true, modal: 'question' })
                    setQuestionId(id)
                  }}
                >
                  <img src={deleteSVG} alt='Remover pergunta' />
                </button>
                <Modal
                  isOpen={modalIsOpen.isOpen && modalIsOpen.modal === 'question'}
                  style={customStyles}
                >
                  <div className='modal-container'>
                    <img src={excluirSVGModal} alt='Icone de excluir' />
                    <h2>Excluir pergunta</h2>
                    <p>Tem certeza que voce deseja excluir essa pergunta ?</p>
                    <div>
                      <Button
                        type='button'
                        className='button btn-cancelar'
                        onClick={() => setModalIsOpen({ isOpen: false, modal: '' })}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type='button'
                        className='button btn-encerrar'
                        onClick={handleDeleteQuestion}
                      >
                        Sim, excluir
                      </Button>
                    </div>
                  </div>
                </Modal>
              </Question>
            )
          })}
        </div>
      </main>
    </div>
  )
}
