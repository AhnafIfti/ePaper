import { media } from './viewedMediaTypes'

export type Viewed = {
  id: number,
  title: string,
  published_date: string,
  updated: string,
  section: string,
  type: string,
  byline: string,
  abstract: string,
  media: media[]
}