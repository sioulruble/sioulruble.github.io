export interface ImageMeta {
  dominantColor: string | null
  palette: string[]
  tags: string[]
}

export interface ImageEntry {
  src: string
  alt: string
  meta: ImageMeta
}

let _cache: ImageEntry[] | null = null

export async function getImages(): Promise<ImageEntry[]> {
  if (_cache) return _cache
  const res = await fetch('/images/manifest.json')
  _cache = (await res.json()) as ImageEntry[]
  return _cache
}

export function getImageMeta(src: string): ImageMeta | undefined {
  return _cache?.find((e) => e.src === src)?.meta
}
