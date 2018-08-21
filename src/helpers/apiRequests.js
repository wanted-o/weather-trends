
export const sendRequest = url => fetch(url, {
  method: 'GET',
})
  .then(response => response)
  .then(responseData => responseData.text())
  .catch((error) => {
    throw error;
  });

export default sendRequest;
