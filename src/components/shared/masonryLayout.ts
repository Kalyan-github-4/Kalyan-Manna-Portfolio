/**
 * Pure layout maths behind <Masonry />. Kept DOM-free (and in its own module)
 * so it can be reasoned about, reused and unit-tested on its own.
 */

export interface MasonryItem {
  id: string | number
  /** Image URL. Used by the default renderer and for `alt`-less previews. */
  img: string
  /**
   * Intrinsic dimensions of the image. Only the *ratio* matters: the layout
   * scales every tile to the column width and derives its height from
   * `height / width`. Knowing this up front is what lets the grid settle
   * before a single byte of image data arrives (zero layout shift).
   */
  width: number
  height: number
  /** Opened in a new tab on click when no `onItemClick` handler is given. */
  url?: string
}

export interface MasonryTile<T extends MasonryItem> {
  item: T
  x: number
  y: number
  w: number
  h: number
  /** Index of the column this tile was placed in. */
  col: number
}

export interface MasonryLayout<T extends MasonryItem> {
  tiles: MasonryTile<T>[]
  /** Total height of the packed grid, in px. */
  height: number
  columnWidth: number
}

/**
 * Pinterest-style masonry packing — "shortest column first".
 *
 * Every tile is scaled to a fixed column width, so its height is fully
 * determined by its aspect ratio. Walking the items in order, each one is
 * dropped into whichever column is currently shortest; that column's running
 * height grows and the next item re-evaluates against the updated heights. The
 * result is a set of columns whose bottoms stay within roughly one tile of
 * each other, without the ragged trailing gaps a naive round-robin
 * (`index % columns`) produces.
 *
 * Ties go to the left-most column, which keeps the first row filling in
 * reading order instead of scattering.
 *
 * A single greedy pass: O(n · columns), deterministic and stable — the same
 * item list always yields the same grid, so re-renders and resizes animate
 * toward a predictable target rather than reshuffling.
 */
export function layoutMasonry<T extends MasonryItem>(
  items: T[],
  containerWidth: number,
  columns: number,
  gap: number
): MasonryLayout<T> {
  if (containerWidth <= 0 || columns <= 0) {
    return { tiles: [], height: 0, columnWidth: 0 }
  }

  const columnWidth = (containerWidth - gap * (columns - 1)) / columns

  // Running bottom edge of each column, in px.
  const colHeights = new Array<number>(columns).fill(0)

  const tiles = items.map((item) => {
    // Pick the shortest column. The epsilon keeps ties left-most rather than
    // flip-flopping on sub-pixel float noise.
    let col = 0
    for (let i = 1; i < columns; i += 1) {
      if (colHeights[i] < colHeights[col] - 0.5) col = i
    }

    // Aspect-ratio driven height — the whole trick behind a stable masonry.
    const ratio = item.height / item.width
    const h = columnWidth * (Number.isFinite(ratio) && ratio > 0 ? ratio : 1)

    const tile: MasonryTile<T> = {
      item,
      x: col * (columnWidth + gap),
      y: colHeights[col],
      w: columnWidth,
      h,
      col,
    }

    colHeights[col] += h + gap
    return tile
  })

  // The trailing gap isn't part of the grid's visual height.
  const height = Math.max(0, Math.max(0, ...colHeights) - gap)

  return { tiles, height, columnWidth }
}
