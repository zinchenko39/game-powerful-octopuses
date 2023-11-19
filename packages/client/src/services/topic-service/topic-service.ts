import { network } from '../../api'
import { RequestError } from '../common-interfaces'
import { BASE_API_URL } from '../../globals'

export type TopicType = {
  id: string
  title: string
  userId: string
}

export class TopicService {
  static url = `${BASE_API_URL}/topics`

  static async getTopics(): Promise<TopicType[] | RequestError> {
    const { data } = await network.get<TopicType[] | RequestError>(
      `${this.url}`
    )

    return data
  }

  static async getTopic({
    topicId,
  }: {
    topicId: string
  }): Promise<TopicType | RequestError> {
    const { data } = await network.get<TopicType | RequestError>(
      `${this.url}/${topicId}`
    )

    return data
  }

  static async createTopic({
    title,
    userId,
  }: {
    title: string
    userId: number
  }): Promise<TopicType | RequestError> {
    const { data } = await network.post<TopicType | RequestError>(
      `${this.url}/create`,
      { title, userId }
    )

    return data
  }
}
