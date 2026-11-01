type ButtonProps = React.ComponentProps<"button">

const Button = ({ className = "", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    />
  )
}

export default Button