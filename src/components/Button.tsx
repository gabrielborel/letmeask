import { ButtonHTMLAttributes } from 'react'
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: ButtonProps) => {
  return <button {...props} className='button'></button>
}