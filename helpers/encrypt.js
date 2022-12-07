import bcryptjs from "bcryptjs";

const cryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync();
  const hash = bcryptjs.hashSync(password, salt);

  return hash;
};

const comparePassword = (password, hashPassword) => {
  return bcryptjs.compareSync(password, hashPassword);
};

export default { cryptPassword, comparePassword };
