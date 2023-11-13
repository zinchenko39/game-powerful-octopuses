import { network } from '../../api'
import { RequestError } from '../common-interfaces'
// import {
//   PostLeaderboardData,
//   GetLeaderboardRequest,
//   LeaderboardServerResponse,
// } from './interfaces'

export class ForumService {
  static url = 'http://localhost:3001/forum/v1'

  //   static async postScore(args: any): Promise<string | RequestError> {
  //     const response = await network.post(`${this.url}`, {
  //       ...args,
  //       teamName: this.teamName,
  //       ratingFieldName: this.ratingFieldName,
  //     })
  //     return response.data
  //   }

  static async getAllTopics(): Promise<any> {
    const response = await network.get(`${this.url}/topics`)
    return response.data
  }

  //   static async getTeamLeaderboard(
  //     args: any
  //   ): Promise<any> {
  //     const response = await network.post(`${this.url}/${this.teamName}`, {
  //       ...args,
  //       ratingFieldName: this.ratingFieldName,
  //     })
  //     return response.data
  //   }
}
