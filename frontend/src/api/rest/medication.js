import makeRequest from '../makeRequest'

export const listMedications = ({ page, limit }) => makeRequest({
  url: '/medication/list',
  method: 'GET',
  params: {
    page: page - 1,
    limit,
  },
  headers: {
    authorization: true,
  },
})
export const saveDrug = (data) => makeRequest({
  url: '/medication/save',
  method: 'POST',
  data,
  headers: {
    authorization: true,
  },
})
export const deleteDrug = (id) => makeRequest({
  url: `/medication/delete/${id}`,
  method: 'POST',
  headers: {
    authorization: true,
  },
})
export const increment = (id) => makeRequest({
  url: `/medication/increment/${id}`,
  method: 'POST',
  headers: {
    authorization: true,
  },
})
export const decrement = (id) => makeRequest({
  url: `/medication/decrement/${id}`,
  method: 'POST',
  headers: {
    authorization: true,
  },
})
export const edit = (data) => makeRequest({
  url: '/medication/edit/',
  method: 'POST',
  data,
  headers: {
    authorization: true,
  },
})
