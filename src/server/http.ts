const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export function isUuid(value: string) {
  return UUID.test(value)
}

export function invalidEntryId() {
  return Response.json({ message: "Invalid entry id" }, { status: 400 })
}

/** Parses a JSON object body; anything else becomes an empty object. */
export async function readJsonObject(request: Request) {
  try {
    const body: unknown = await request.json()
    return body && typeof body === "object"
      ? (body as Record<string, unknown>)
      : {}
  } catch {
    return {}
  }
}
