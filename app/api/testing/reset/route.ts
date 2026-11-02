import { NextResponse } from "next/server"
import { resetDatabase } from "@/app/services/testing"

export const DELETE = async () => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 },
    )
  }

  await resetDatabase()
  return new NextResponse(null, { status: 204 })
}