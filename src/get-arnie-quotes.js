const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  const httpGetPromises = urls.map(url => httpGet(url));

  const responses = await Promise.all(httpGetPromises);

	const results = responses.map(response => {
    const responseBodyObject = JSON.parse(response.body)
    if (response.status === 200) return { 'Arnie Quote': responseBodyObject.message };
    if (response.status === 500) return { 'FAILURE': responseBodyObject.message };
  })
  
  return results;

};

module.exports = {
  getArnieQuotes,
};
