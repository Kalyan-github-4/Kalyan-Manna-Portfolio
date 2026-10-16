import { deleteEntry } from "@/server/adminGuestbook"

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  return deleteEntry(request, (await params).id)
}
