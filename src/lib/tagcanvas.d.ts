/**
 * Types for the vendored TagCanvas build in ./tagcanvas.js. The module has no
 * exports — importing it for its side effect assigns `window.TagCanvas`.
 */
export {}

declare global {
    interface TagCanvasStatic {
        /** @param tagListId an element id to read tags from, or null for the canvas' own children */
        Start(
            canvasId: string,
            tagListId: string | null,
            options?: Record<string, unknown>,
        ): void
        Pause(canvasId: string): void
        Resume(canvasId: string): void
        Delete(canvasId: string): void
    }

    interface Window {
        TagCanvas?: TagCanvasStatic
    }
}
