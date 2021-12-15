import React, { useState, useEffect } from "react";
import { BarGraph, PublishForm, PaperTable, QueryForm } from "../../components";
import Spinner from "./Spinner";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { getMyPapers } from "../../actions/paper";
import { connect } from "react-redux";
const Dashboard = ({ getMyPapers, paper: { myPapers } }) => {
  useEffect(() => {
    getMyPapers();
    console.log("Triggered");
  }, []);
  const [choice, setChoice] = useState("My Papers");
  const choices = [
    { id: 1, val: "My Papers" },
    { id: 2, val: "Publish Paper" },
    { id: 3, val: "Query Papers" },
  ];
  const handleChange = (e, newChoice) => setChoice(newChoice);
  return myPapers === null ? (
    <Spinner />
  ) : (
    <>
      <ToggleButtonGroup
        value={choice}
        onChange={handleChange}
        exclusive
        sx={{ marginBottom: 5, marginTop: 5 }}
      >
        {choices.map((c) => (
          <ToggleButton key={c.id} value={c.val}>
            {c.val}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {choice === "Publish Paper" && <PublishForm />}
      {choice === "My Papers" && <PaperTable displayPapers={myPapers} />}
      {choice === "Query Papers" && <QueryForm />}

      <BarGraph />
    </>
  );
};

const mapStatesToProp = (state) => ({
  paper: state.paper,
});

export default connect(mapStatesToProp, { getMyPapers })(Dashboard);
