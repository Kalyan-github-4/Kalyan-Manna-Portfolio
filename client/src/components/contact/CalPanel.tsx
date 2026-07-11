import Cal from "@calcom/embed-react"

export default function CalPanel() {
    return (
        <div className="min-h-180">
            <Cal
                calLink={import.meta.env.VITE_CAL_LINK || "kalyanmanna/30min"}
                style={{
                    width: "100%",
                    height: "720px",
                    overflow: "scroll",
                }}
                config={{
                    theme: "dark",
                    layout: "month_view",
                }}
            />
        </div>
    )
}