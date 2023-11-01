export interface PostGameData {
  points: number
  name: string
}

export interface PostLeaderboardData {
  data: PostGameData
  ratingFieldName: string
  teamName: string
}

export interface GetLeaderboardRequest {
  ratingFieldName: string
  cursor: number
  limit: number
}

export interface LeaderboardItem {
  name: string
  powerfulOctopuses: number
}

export type LeaderboardServerResponse = LeaderboardServerResponseItem[]

export interface RequestError {
  reason: string
}

export interface LeaderboardServerResponseItem {
  data: LeaderboardItem
}
