import { NextRequest, NextResponse } from "next/server"
import { getUserByToken } from "@/app/services/users"

export const GET = async (req: NextRequest) => {
  const authorization = req.headers.get("authorization")
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "token missing" }, { status: 401 })
  }

  const token = authorization.slice("Bearer ".length).trim()
  const user = token ? await getUserByToken(token) : undefined

  if (!user) {
    return NextResponse.json({ error: "token invalid" }, { status: 401 })
  }

  return NextResponse.json(user)
}