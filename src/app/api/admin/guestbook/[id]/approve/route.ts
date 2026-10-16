import { setEntryStatus } from "@/server/adminGuestbook"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return setEntryStatus(request, (await params).id, "approved")
}
