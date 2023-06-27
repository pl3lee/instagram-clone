import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Create = () => {
  return (
    <div className="flex flex-col">
      <form>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="content">Content</label>
          <textarea name="content" id="content" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="tags">Tags</label>
          <input type="text" name="tags" id="tags" />
        </div>
      </form>
    </div>
  );
};

export default Create;
