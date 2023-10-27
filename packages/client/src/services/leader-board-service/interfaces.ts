export interface PostGameData {
  myField?: string
  otherField: number
}

export interface PostLeaderboardData {
  data: PostGameData
  ratingFieldName: string
}

export interface GetLeaderboardRequest {
  ratingFieldName: string
  cursor: number
  limit: number
}

export interface LeaderboardItem {
  name: string
  otherField: number
}

export type LeaderboardServerResponse = LeaderboardServerResponseItem[]

export interface RequestError {
  reason: string
}

export interface LeaderboardServerResponseItem {
  data: LeaderboardItem
}
