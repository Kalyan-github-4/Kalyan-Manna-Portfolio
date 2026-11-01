import { Cpu, GraphicsCard, Laptop, type Icon } from "@phosphor-icons/react"
import type { IconType } from "react-icons"
import { BsOpenai } from "react-icons/bs"
import {
    SiArc,
    SiClaude,
    SiFigma,
    SiFramer,
    SiGithub,
    SiNotion,
    SiPostman,
    SiShadcnui,
    SiSpotify,
    SiWarp,
} from "react-icons/si"
import { VscVscode } from "react-icons/vsc"

export interface HardwareSpec {
    label: string
    value: string
    icon: Icon
}

export interface UsesTool {
    name: string
    /** What it's for, in a few words. */
    note: string
    icon: IconType
    /** Brand colour, or white where the real mark is black. */
    color: string
}

export interface UsesToolGroup {
    title: string
    tools: UsesTool[]
}

export const hardware: HardwareSpec[] = [
    { label: "Laptop", value: "HP Victus", icon: Laptop },
    { label: "Processor", value: "Intel Core i5", icon: Cpu },
    { label: "Graphics", value: "NVIDIA RTX 3050", icon: GraphicsCard },
]

// Each group needs 6 tools to fill whole rows at both 2 and 3 columns.
export const toolGroups: UsesToolGroup[] = [
    {
        title: "Code",
        tools: [
            { name: "VS Code", note: "Code editor", icon: VscVscode, color: "#22A6F2" },
            { name: "ChatGPT", note: "Planning", icon: BsOpenai, color: "#10A37F" },
            { name: "Claude", note: "AI assistant", icon: SiClaude, color: "#D97757" },
            { name: "Warp", note: "Terminal", icon: SiWarp, color: "#01A4FF" },
            { name: "GitHub", note: "Code hosting", icon: SiGithub, color: "#FFFFFF" },
            { name: "Postman", note: "API testing", icon: SiPostman, color: "#FF6C37" },
        ],
    },
    {
        title: "Design & everyday",
        tools: [
            { name: "Figma", note: "Interface design", icon: SiFigma, color: "#F24E1E" },
            { name: "shadcn/ui", note: "UI components", icon: SiShadcnui, color: "#FFFFFF" },
            { name: "Motion", note: "Web animation", icon: SiFramer, color: "#FFF312" },
            { name: "Notion", note: "Notes and docs", icon: SiNotion, color: "#FFFFFF" },
            { name: "Arc", note: "Web browser", icon: SiArc, color: "#FCBFBD" },
            { name: "Spotify", note: "Music", icon: SiSpotify, color: "#1ED760" },
        ],
    },
]
