const axios = require("axios");

const fetchData = async (url) => {
  const res = await axios.get(url);

  return res?.data;
};

module.exports = { fetchData };
