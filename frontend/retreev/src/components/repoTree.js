import React, { useCallback } from "react";
import { TreeView, TreeItem } from "@mui/lab";
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { Grid, Box } from "@mui/material";

const RepoTree = ({ tree, title }) => {
  const buildTree = useCallback((treeToMap, level) => {
    const fileNames = Object.keys(treeToMap);

    if (fileNames.length > 0)
      return fileNames.map((fileName, index) => {
        if (treeToMap[fileName] !== null) {
          return (
            <Grid item xs={6} md={8} key={level.toString() + index.toString()}>
              <TreeItem
                nodeId={level.toString() + index.toString()}
                label={fileName}
              >
                {buildTree(treeToMap[fileName], level + 1)}
              </TreeItem>
            </Grid>
          );
        } else {
          return (
            <Grid item xs={6} md={8} key={level.toString() + index.toString()}>
              <TreeItem
                nodeId={level.toString() + index.toString()}
                label={fileName}
              ></TreeItem>
            </Grid>
          );
        }
      });
  }, []);

  return (
    <Grid container rowSpacing={8} justifyContent="center">
      <Grid item>{title}</Grid>
      <Grid item container rowSpacing={3} justifyContent="center">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          {buildTree(tree, 0)}
        </TreeView>
      </Grid>
    </Grid>
  );
};

export default RepoTree;
