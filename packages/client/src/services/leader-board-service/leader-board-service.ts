import { network } from '../../api'
import { RequestError } from '../common-interfaces'
import {
  PostLeaderboardData,
  GetLeaderboardRequest,
  LeaderboardServerResponse,
} from './interfaces'

export class LeaderboardService {
  static url = '/leaderboard'
  static teamName = 'powerfulOctopuses'

  static async postScore(
    args: PostLeaderboardData
  ): Promise<string | RequestError> {
    const response = await network.post(`${this.url}`, args)
    return response.data
  }

  static async getLeaderboard(
    args: GetLeaderboardRequest
  ): Promise<LeaderboardServerResponse> {
    const response = await network.post(`${this.url}/all`, args)
    return response.data
  }

  static async getTeamLeaderboard(
    args: GetLeaderboardRequest
  ): Promise<LeaderboardServerResponse> {
    const response = await network.post(`${this.url}/${this.teamName}`, args)
    return response.data
  }
}
