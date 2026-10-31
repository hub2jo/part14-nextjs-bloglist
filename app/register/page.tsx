import { registerUser } from "@/app/actions/users"

const messages: Record<string, string> = {
  invalid: "All fields are required and the password must be at least 3 characters",
  taken: "That username is already taken",
}

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const { error } = await searchParams

  return (
    <div>
      <h2>Register</h2>
      {error && messages[error] && (
        <p style={{ color: "red" }}>{messages[error]}</p>
      )}
      <form action={registerUser}>
        <div>
          <label>
            Username
            <input type="text" name="username" required />
          </label>
        </div>
        <div>
          <label>
            Name
            <input type="text" name="name" required />
          </label>
        </div>
        <div>
          <label>
            Password
            <input type="password" name="password" required minLength={3} />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}