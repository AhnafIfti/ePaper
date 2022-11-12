import {media} from './emailMediaTypes'

export type Email = {
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