export interface PostGameData {
  points: number
  name: string
}

export interface PostLeaderboardData {
  data: PostGameData
}

export interface GetLeaderboardRequest {
  cursor: number
  limit: number
}

export interface LeaderboardItem {
  name: string
  powerfulOctopuses: number
}

export type LeaderboardServerResponse = LeaderboardServerResponseItem[]

export interface LeaderboardServerResponseItem {
  data: LeaderboardItem
}
