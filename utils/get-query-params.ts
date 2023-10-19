import queryString from 'query-string'

export const getQueryParams = (
  baseUrl: string,
  params?: { [key: string]: string }
) => {
  if (!params) {
    return baseUrl
  }

  return `${baseUrl}?${queryString.stringify(params)}`
}
