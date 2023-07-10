import mongoose from "mongoose";
export const checkIdValid = (...ids) => {
  for (const id of ids) {
    if (id === undefined || id === "" || !mongoose.Types.ObjectId.isValid(id)) {
      return false;
    }
  }

  return true;
};
