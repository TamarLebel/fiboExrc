import React, { useState, useCallback } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RepoTree from "./components/repoTree";
import Login from "./components/login";
import { Grid, Box, Typography } from "@mui/material";
import { getTree } from "./services/githubService";
import { loginPath, treePath } from "./consts/pathConsts";

function App() {
  const styles = {
    container: {
      marginTop: "2em",
    },
  };

  const [tree, setTree] = useState({});
  const [title, setTitle] = useState("");

  const getRepoTree = useCallback(async (owner, repo) => {
    setTitle(getTitle(owner, repo));
    const treeToGet = await getTree(owner, repo);
    setTree(Object.keys(treeToGet)?.length > 0 ? treeToGet : `No tree to show`);
  }, []);

  const getTitle = (owner, repo) => {
    return (
      <Box>
        <Typography variant="h5">Owner name: {owner}</Typography>
        <Typography variant="h5">Repository name: {repo}</Typography>
      </Box>
    );
  };

  return (
    <Grid
      container
      rowSpacing={2}
      justifyContent="center"
      style={styles.container}
    >
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to={loginPath} replace />} />
          <Route
            exact
            path={loginPath}
            element={<Login onLogin={getRepoTree} treePath={treePath} />}
          ></Route>
          <Route
            path="/tree"
            element={<RepoTree tree={tree} title={title} />}
          ></Route>
        </Routes>
      </Router>
    </Grid>
  );
}

export default App;
