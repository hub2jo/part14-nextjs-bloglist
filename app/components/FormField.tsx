type FormFieldProps = React.ComponentProps<"input"> & {
  label: string
  error?: string
}

const FormField = ({ label, error, className = "", ...props }: FormFieldProps) => {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">{label}</span>
      <input
        {...props}
        className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
          error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
        } ${className}`}
      />
      {error && <span className="block text-red-600 text-sm mt-1">{error}</span>}
    </label>
  )
}

export default FormField