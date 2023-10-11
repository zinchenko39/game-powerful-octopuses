import { Comment } from '../../constants/forum-interface'
export const topics: Record<string, string | number>[] = [
  {
    id: 1,
    title: 'Кто дальше проехал?',
    autor: 'Necko',
    comment: 5,
    description: 'Расскажите как вы доехали до жизни такой',
  },
  {
    id: 2,
    title: 'Почему игра называется Powerful Octopuses?',
    autor: 'Cockie',
    comment: 3,
    description:
      'Может придумаем название для игры что бы писать ее название на главной странице и тд?',
  },
  {
    id: 3,
    title: 'Горят сроки, а они не успели',
    autor: 'Lucky',
    comment: 1,
    description: 'Не забывайте про дедушек которые подходят к линии',
  },
  {
    id: 4,
    title: 'Я устал, я ухожу',
    autor: 'WhatNext',
    comment: 2,
    description: 'Галя, у нас отмена!',
  },
]

export const comments: Comment[] = [
  { id: 1, user: { username: 'Автор 1', text: 'Комментарий 1' } },
  { id: 2, user: { username: 'Автор 2', text: 'Комментарий 2' } },
  { id: 3, user: { username: 'Автор 3', text: 'Комментарий 3' } },
  { id: 4, user: { username: 'Автор 4', text: 'Комментарий 4' } },
  { id: 5, user: { username: 'Автор 5', text: 'Комментарий 5' } },
]
