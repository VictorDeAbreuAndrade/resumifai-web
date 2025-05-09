import { cn } from '../utils/utils'


export function Header({ children = <h1>Conteúdo do Header</h1> }) {
  return (
    <div
      className={cn(
        'h-20 p-2 m-2 mt-4 text-center text-8xl font-semibold',
        'flex flex-row items-center justify-center'
      )}
    >
      {children}
    </div>
  )
}
