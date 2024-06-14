export const getRandomMovies = (movies: any, count: number) => {
  for (let i = movies.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))

    ;[movies[i], movies[j]] = [movies[j], movies[i]]
  }

  return movies.slice(0, count)
}
