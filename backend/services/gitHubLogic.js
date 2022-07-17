const { fetchData } = require("../utils/apiUtils");

const buildTree = async (tree, url) => {
  let result = {};

  for (let i = 0; i < tree.length; i++) {
    let item = {};

    if (tree[i].type === "tree") {
      let treeData = await fetchData(`${url}/${tree[i].sha}`);
      item[tree[i].path] = await buildTree(treeData.tree, url);
    } else item[tree[i].path] = null;

    Object.assign(result, item);
  }

  return result;
};

module.exports = { buildTree };
