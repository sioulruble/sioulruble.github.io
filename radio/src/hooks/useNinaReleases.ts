// TODO: wire up @nina-protocol/nina-sdk when hub ID is known

export interface NinaRelease {
  publicKey: string
  metadata: {
    name: string
    image: string
    description: string
  }
}

export interface UseNinaReleasesResult {
  releases: NinaRelease[]
  loading: boolean
  error: Error | null
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useNinaReleases(_hubId: string): UseNinaReleasesResult {
  return { releases: [], loading: false, error: null }
}
