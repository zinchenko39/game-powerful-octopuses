interface UserComment {
  username: string
  text: string
}
export interface Comment {
  id: number
  user: UserComment
}

export interface TopicCommentSectionProps {
  comments: Comment[]
}
