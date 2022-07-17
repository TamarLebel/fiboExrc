const express = require("express");
const { fetchData } = require("../utils/apiUtils");
const { buildTree } = require("../services/gitHubLogic");

const router = express.Router();
const githubApi = "https://api.github.com";
const repoUrl = `${githubApi}/repos`;

router.get("/getRepo", async (req, res) => {
  const { owner, repo } = req.query;

  const branches = await fetchData(`${repoUrl}/${owner}/${repo}/branches`);

  if (!branches) return res.status(500).send("error: coulden't get branches");

  const branch = branches.find((b) => b.name === "master" || b.name === "main");

  if (!branch)
    return res.status(500).send("error: coulden't find master or main branch");

  const branchData = await fetchData(
    `${repoUrl}/${owner}/${repo}/branches/${branch.name}`
  );

  if (!branchData)
    return res.status(500).send("error: coulden't get branch data");

  const treeData = await fetchData(
    `${repoUrl}/${owner}/${repo}/git/trees/${branchData.commit.sha}`
  );

  if (!treeData) return res.status(500).send("error: coulden't get tree");

  const result = await buildTree(
    treeData.tree,
    `${repoUrl}/${owner}/${repo}/git/trees`
  );

  res.send(result);
  console.log(result);
});

module.exports = router;
