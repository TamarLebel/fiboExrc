import React, { useState, useCallback } from "react";
import { Grid, FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin, treePath }) => {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClick = useCallback(async () => {
    setLoading(true);
    await onLogin(owner, repo);
    navigate(treePath, { replace: true });
  }, [navigate, onLogin, owner, repo, treePath]);

  return (
    <Grid container rowSpacing={2} justifyContent="center">
      <Grid item xs={6} md={8}>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Owner name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Name"
            value={owner}
            onChange={(e) => {
              setOwner(e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6} md={8}>
        <FormControl>
          <InputLabel htmlFor="component-outlined">Repository name</InputLabel>
          <OutlinedInput
            id="component-outlined"
            label="Name"
            value={repo}
            onChange={(e) => {
              setRepo(e.target.value);
            }}
          />
        </FormControl>
      </Grid>
      <Grid item xs={6} md={8}>
        <FormControl>
          <LoadingButton
            variant="contained"
            loading={loading}
            disabled={owner === "" || repo === ""}
            onClick={handleClick}
          >
            Get repo tree
          </LoadingButton>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Login;
