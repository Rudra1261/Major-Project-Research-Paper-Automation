import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
const PaperTable = ({ displayPapers }) => {
  return (
    <>
      <h1 className="large my-2 text-primary">
        <b>Papers</b>
      </h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title of Paper</th>
            <th className="hide-sm">Impact Factor</th>
            <th className="hide-sm">Date Published</th>
            <th className="hide-sm">File Name</th>
          </tr>
        </thead>
        <tbody>
          {displayPapers.map((paper) => (
            <tr key={paper._id}>
              <td>{paper.paperName}</td>
              <td>{paper.imf}</td>
              <td>
                <Moment format="YYYY/MM/DD">{paper.date}</Moment>
              </td>
              <td>
                <a>{paper?.file_data?.originalname}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default PaperTable;
