import illustrationSVG from '../assets/vectors/illustration.svg'
import logoSVG from '../assets/vectors/logo.svg'
import googleIconSVG from '../assets/vectors/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'

export const Home = () => {
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
          <button className='create-room'>
            <img src={googleIconSVG} alt='Logo do Google' />
            Crie sua sala com o Google
          </button>
          <div className='separator'>ou entre em uma sala</div>
          <form>
            <input type='text' placeholder='Digite o codigo da sala' />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
