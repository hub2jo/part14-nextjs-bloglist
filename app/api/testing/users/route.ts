import { NextRequest, NextResponse } from "next/server"
import { createUser, getUserByUsername } from "@/app/services/users"

export const POST = async (req: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 })
  }

  const { username, name, password } = (body ?? {}) as Record<string, unknown>
  if (
    typeof username !== "string" || !username ||
    typeof name !== "string" || !name ||
    typeof password !== "string" || !password
  ) {
    return NextResponse.json(
      { error: "username, name and password are required" },
      { status: 400 },
    )
  }

  if (await getUserByUsername(username)) {
    return NextResponse.json({ error: "username already exists" }, { status: 409 })
  }

  const user = await createUser(username, name, password)
  return NextResponse.json(user, { status: 201 })
}