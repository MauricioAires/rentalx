import { hash } from "bcrypt";
import createConnection from "../";
import { v4 as uuidV4 } from "uuid";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email,driver_license, password, is_admin)
       VALUES ('${id}', 'admin', 'admin@rentx.com.br','ABC123','${password}', true)`,
  );

  await connection.close();
}

create().then(() => {
  console.log("User admin created successfully");
});
