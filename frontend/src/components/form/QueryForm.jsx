import React, { useRef } from "react";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { connect } from "react-redux";
import { queryPapers } from "../../actions/paper";
import PropTypes from "prop-types";
import PaperTable from "../layout/PaperTable";
const QueryForm = ({ setAlert, queryPapers, papers: { queriedPapers } }) => {
  const imfRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const authorTypeRef = useRef();
  const formRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const imf = !imfRef.current.value ? 0 : imfRef.current.value;
    const from = !fromRef.current.value
      ? new Date("01-01-1999").toISOString().slice(0, 10)
      : fromRef.current.value;
    const to = !toRef.current.value
      ? new Date(Date.now()).toISOString().slice(0, 10)
      : toRef.current.value;
    const authorType = authorTypeRef.current.value;
    if (from > to) {
      setAlert("Please select a valid time frame (FROM > TO)", "danger", 3600);
    } else {
      await queryPapers(imf, from, to, authorType);
      console.log(JSON.stringify(queriedPapers));
      console.log(from, to, authorType, imf);
    }
    formRef.current.reset();
  };
  return (
    <>
      <h1 className="large text-primary">Query Research Papers</h1>
      <p className="lead">Enter Parameters</p>
      <form action="" className="form" onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group">
          <input type="number" placeholder="IMF" step="0.01" ref={imfRef} />
        </div>
        <div className="form-group">
          <input type="date" placeholder="from" ref={fromRef} />
        </div>
        <div className="form-group">
          <input type="date" placeholder="to" ref={toRef} />
        </div>
        <div className="form-group">
          <select name="AuthorType" id="AuthorType" ref={authorTypeRef}>
            <option value="student">Student</option>
            <option value="professor">Professor</option>
            <option value="other">Other</option>
          </select>
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
      {queriedPapers && <PaperTable displayPapers={queriedPapers} />}
    </>
  );
};

// QueryForm.propTypes = {
//   papers: PropTypes.object.isRequired,
// }

const mapStatesToProp = (state) => ({
  papers: state.paper,
});

export default connect(mapStatesToProp, { setAlert, queryPapers })(QueryForm);
