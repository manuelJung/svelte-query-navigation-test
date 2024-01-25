

export function setUrlQuery(query:string) {
  const newUrl = location.pathname + query
  const state = history.state
  history.pushState({...state}, '', newUrl)
}