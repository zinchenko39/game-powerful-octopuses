export interface Comment {
  id: number
  user: {
    username: string
    text: string
  }
}

export interface TopicCommentSectionProps {
  comments: Comment[]
}
