export type mediaMetadata = {
    url: string
}

export type media = {
    caption: string,
    // "media-metadata": 'media-metadata'[],
    "media-metadata": mediaMetadata[],
    url: string,
}