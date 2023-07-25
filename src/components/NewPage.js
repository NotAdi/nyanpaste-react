import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import ReactTextareaAutosize from "react-textarea-autosize";

const NewPage = () => {
//   const [code, setCode] = useState("");
  const [value, setValue] = useState("");
  const [customName, setCustomName] = useState("");
  const navigate = useNavigate();
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleCustomNameChange = (event) => {
    setCustomName(event.target.value);
  };
  useEffect(() => {
    const savedCode = localStorage.getItem("code");
    if (savedCode) {
      setValue(savedCode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("code", value);
  }, [value]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/save", {
        value,
        customNameInput: customName,
      });
      const id = res.data.insertedId;
      if (customName) {
        navigate(`/${customName}`);
      } else {
        navigate(`/${id}`);
      }
    } catch (e) {
      console.log("Error saving: ", e);
    }
  };
  return (
    <form
      onSubmit={handleSave}
      method="POST"
    >
      <Header
        canSave
        handleSave={handleSave}
        handleCustomNameChange={handleCustomNameChange}
      />
      <div className="container">
        <div className="lineNo">&gt;</div>
        <ReactTextareaAutosize
          autoFocus
          name="value"
          value={value}
          onChange={handleChange}
          placeholder="Start typing here..."
        />
      </div>
    </form>
  );
};

export default NewPage;
