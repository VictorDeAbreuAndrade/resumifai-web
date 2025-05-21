export function Header({ children = <h1>Conteúdo do Header</h1> }) {
  return (
    <div
      className="h-20 pt-3 mt-4 text-center text-8xl font-semibold flex flex-row items-center justify-center"
    >
      {children}
    </div>
  )
}
