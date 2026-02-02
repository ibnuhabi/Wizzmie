import bcrypt from "bcrypt";

const password = "sadmin123";

const run = async () => {
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
};

run();
