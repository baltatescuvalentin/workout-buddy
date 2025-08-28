import jwt from "jsonwebtoken";

export const generateAuthResponse = (user) => {
  const userFiltered = { ...user._doc };
  delete userFiltered.password;

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return { token, user: userFiltered };
};
