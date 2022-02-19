import logoSVG from '../../assets/vectors/logo.svg'
import questionsSVG from '../../assets/vectors/empty-questions.svg'
import { Link } from 'react-router-dom'
import './styles.scss'

export const Page404 = () => {
  return (
    <div id='page-404'>
      <header>
        <img src={logoSVG} alt='Letmeask' />
      </header>
      <main>
        <img src={questionsSVG} alt='' />
        <div>
          <h1>Essa pagina nao existe =(</h1>
          <p>
            Ir para a <Link to='/'>Home</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
