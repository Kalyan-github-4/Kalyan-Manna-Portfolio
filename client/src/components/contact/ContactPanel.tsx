import CalPanel from "./CalPanel"
import MessagePanel from "./MessagePanel"
import type { ContactTab } from "./contactTypes"

interface ContactPanelProps {
    activeTab: ContactTab
}

export default function ContactPanel({ activeTab }: ContactPanelProps) {
    return (
        <div className="mx-auto max-w-7xl overflow-hidden">
            {activeTab === "book-call" ? <CalPanel /> : <MessagePanel />}
        </div>
    )
}