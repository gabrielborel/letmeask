import { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'
import './styles.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean
}

export const Button = ({ isOutlined = false, children, ...props }: ButtonProps) => {
  return (
    <button className={cx('button', { outlined: isOutlined })} {...props}>
      {children}
    </button>
  )
}
