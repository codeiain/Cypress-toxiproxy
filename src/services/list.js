export function getList() {
    return fetch('http://g1d7e.mocklab.io/list')
      .then(data => data.json())
  }