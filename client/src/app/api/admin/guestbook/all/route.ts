import { listEntries } from "@/server/adminGuestbook"

export function GET(request: Request) {
  return listEntries(request)
}
