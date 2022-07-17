import axios from "axios";

const reqHttp = "http://localhost:3001/github/getRepo";

export const getTree = async (owner, repo) => {
  const res = await axios.get(`${reqHttp}?owner=${owner}&repo=${repo}`);

  return res?.data;
};
