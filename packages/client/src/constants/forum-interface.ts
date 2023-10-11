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

export interface TopicDetailsProps {
  topicId: number
  title: string
  description: string
}

export interface NewCommentProps {
  commentId: number
  newComment: string
  author: string
}
