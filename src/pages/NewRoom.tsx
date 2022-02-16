import { Link } from 'react-router-dom'
import illustrationSVG from '../assets/vectors/illustration.svg'
import logoSVG from '../assets/vectors/logo.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
// import { useAuth } from '../hooks/useAuth'

export const NewRoom = () => {
  return (
    <div id='page-auth'>
      <aside>
        <img src={illustrationSVG} alt='Ilustracao simbolizando perguntas e respostas' />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as duvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoSVG} alt='Letmeask' />
          <h2>Criar uma nova sala</h2>
          <form>
            <input type='text' placeholder='Nome da sala' />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente ? <Link to='/'>Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
