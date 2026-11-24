export interface RefreshTokenPayload {
  id: string
  sessionId: string
  tokenUse?: "refresh"
}
