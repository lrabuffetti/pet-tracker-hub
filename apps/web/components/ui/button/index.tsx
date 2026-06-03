const Button = ({
  children,
  onClick,
  isDisabled,
  type = 'button',
}: {
  children: React.ReactNode
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>
  isDisabled: boolean
  type: 'button' | 'submit' | 'reset'
}) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button
