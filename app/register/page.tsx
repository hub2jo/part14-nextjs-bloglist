"use client"

import { useActionState } from "react"
import Link from "next/link"
import { registerUser } from "@/app/actions/users"
import FormField from "@/app/components/FormField"
import Button from "@/app/components/Button"

const initialState: Parameters<typeof registerUser>[0] = {
  errors: {},
  values: { username: "", name: "" },
}

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(registerUser, initialState)

  return (
    <div className="max-w-sm mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form action={formAction} className="space-y-4">
        <FormField
          label="Username"
          type="text"
          name="username"
          defaultValue={state.values.username}
          error={state.errors.username}
        />
        <FormField
          label="Name"
          type="text"
          name="name"
          defaultValue={state.values.name}
          error={state.errors.name}
        />
        <FormField
          label="Password"
          type="password"
          name="password"
          error={state.errors.password}
        />
        <FormField
          label="Confirm Password"
          type="password"
          name="passwordConfirm"
          error={state.errors.passwordConfirm}
        />
        <Button type="submit" disabled={pending} className="w-full" data-testid="register-button">
          Register
        </Button>
      </form>
      <p className="text-sm text-gray-500 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}