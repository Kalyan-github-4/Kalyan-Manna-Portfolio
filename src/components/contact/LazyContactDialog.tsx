"use client"

import { cloneElement, useState, type ComponentType, type ReactElement, type SyntheticEvent } from "react"

import type { ContactDialog as ContactDialogType } from "./ContactDialog"

type Props = { children: ReactElement<{ onClick?: (e: SyntheticEvent) => void }> }

const load = () => import("./ContactDialog")

/**
 * ContactDialog, fetched on first intent instead of with the page.
 *
 * The dialog (Radix dialog, its motion and contents) is code nobody needs until
 * they reach for the button, yet it shipped with the hero. The trigger renders
 * as-is; hovering or focusing it starts the download, and a click that lands
 * before the download finishes opens the dialog as soon as it arrives.
 */
export function LazyContactDialog({ children }: Props) {
  const [Dialog, setDialog] = useState<ComponentType<React.ComponentProps<typeof ContactDialogType>> | null>(null)
  const [openOnLoad, setOpenOnLoad] = useState(false)

  const preload = () => {
    void load().then((m) => setDialog(() => m.ContactDialog))
  }

  if (Dialog) return <Dialog defaultOpen={openOnLoad}>{children}</Dialog>

  return (
    <span className="contents" onPointerEnter={preload} onFocusCapture={preload} onTouchStart={preload}>
      {cloneElement(children, {
        onClick: (e: SyntheticEvent) => {
          children.props.onClick?.(e)
          setOpenOnLoad(true)
          preload()
        },
      })}
    </span>
  )
}
