import { media } from './sharedMediaTypes'

export type Shared = {
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