import React, { useRef } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
const PublishForm = ({ setAlert }) => {
  const nameRef = useRef();
  const dateRef = useRef();
  const authorTypeRef = useRef();
  const imfRef = useRef();
  const fileRef = useRef();
  const formRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const paperName = nameRef?.current?.value;
    const date = !dateRef.current.value
      ? new Date(Date.now()).toISOString().slice(0,10)
      : new Date(dateRef?.current?.value).toISOString().slice(0, 10);
    const authorType = authorTypeRef?.current?.value;
    const imf = imfRef?.current?.value;
    const myfile = fileRef?.current?.files[0];
    const uploadData = new FormData();
    uploadData.append("myfile", myfile);
    uploadData.append("paperName", paperName);
    uploadData.append("date", date);
    uploadData.append("authorType", authorType);
    uploadData.append("imf", imf);
    console.log(date);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    await axios
      .post("http://localhost:5000/api/paper", uploadData, config)
      .then((res) => {
        setAlert("The file has been successfully uploaded", "success", 3600);
      })
      .catch((error) => {
        console.log(error.message);
      });
    formRef.current.reset();
  };
  return (
    <>
      <h1 className="large text-primary">Publish your Paper</h1>
      <p className="lead">Enter details</p>
      <form
        action="submit"
        ref={formRef}
        onSubmit={handleSubmit}
        className="form"
      >
        <div className="form-group">
          <input type="text" ref={nameRef} placeholder="Enter Name here" />
        </div>
        <div className="form-group">
          <input
            type="number"
            ref={imfRef}
            placeholder="IMF factor"
            step="0.01"
          />
        </div>
        <div className="form-group">
          <select name="AuthorType" id="AuthorType" ref={authorTypeRef}>
            <option value="student">Student</option>
            <option value="professor">Professor</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input type="date" placeholder="date" ref={dateRef} />
        </div>
        <div className="form-group">
          <input type="file" ref={fileRef} />
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
    </>
  );
};

PublishForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(PublishForm);
