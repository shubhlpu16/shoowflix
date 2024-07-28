export const generateMetaData = (movie: any) => {
  const metaData = {
    title: `${movie?.title} - Shoowflix`,
    description: movie?.descriptionFull,
    keywords: movie?.genres.join(', '),
    ogImage: movie?.largeCoverImage,
    ogTitle: movie?.title,
    ogDescription: movie?.descriptionFull,
    twitterCard: 'summary_large_image',
    twitterTitle: movie?.title,
    twitterDescription: movie?.descriptionFull,
    twitterImage: movie?.largeCoverImage
  }

  return metaData
}
