const bcrypt = require("bcryptjs");

async function run() {
  const plainPassword = "123456";
  const hash = await bcrypt.hash(plainPassword, 10);
  console.log(hash);
}

run();