function jsonPost(url, data) {
  return fetch(url, {
    body: JSON.stringify(data),
    headers: {'content-type': 'application/json'},
    method: 'POST'
  }).then(function(response) {
    if (response.ok) {
      console.log(response);
    } else {
      throw new Error(`Call failed Error code ${response.status} returned with msg ${response.statusText}`);
    }
  });
}

function jsonGet(url, headers) {
  return fetch(url, {
    headers: headers || {'content-type': 'application/json'},
    method: 'GET'
  }).then(function(response) {
    if (response.ok) {
      return response.json();
    }
    // console.log(`Call failed Error code ${response.status} returned with msg ${response.statusText}`);
    throw new Error(`Call failed Error code ${response.status} returned with msg ${response.statusText}`);
  });
}
export {jsonPost, jsonGet};
