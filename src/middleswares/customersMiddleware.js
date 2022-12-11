import connection from "../database/db.js";
import customerModel from "../models/customerModel.js";

export function customerValidation(req, res, next) {
  const customer = req.body;

  const { error } = customerModel.validate(customer, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).send({ message: errors });
    // return res.status(400).send({message: error.details.map( (e) => e.message)})
  }

  next();
}

// export async function customerExists(req, res, next) {
//   try {
//     const cpfCustomer = req.body.cpf;
//     const customer = await connection.query(
//       `    SELECT * FROM customers WHERE cpf = $1
//       `,
//       [cpfCustomer]
//     );
//     if (customer.rows.length > 0) {
//       return res.status(409).send({ message: "Este cpf já existe!" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: "Erro inesperado no servidor!" });
//   }
//   next();
// }

export async function cpfExists(req, res, next) {
  try {
    const cpfCustomer = req.body.cpf;
    let { id } = req.params;

    if (id === undefined) {
      id = 0;
    }

    const customer = await connection.query(
      `    SELECT * FROM customers WHERE cpf = $1 and id <> $2
      `,
      [cpfCustomer, id]
    );
    if (customer.rows.length > 0) {
      return res.status(409).send({ message: "CPF já cadastrado!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
  next();
}

export async function customerIdExists(req, res, next) {
  try {
    let { id } = req.params;
    let status = 404;

    if (!id) {
      id = req.body.customerId;
      status = 400;
    }

    const customer = await connection.query(
      `
          SELECT * FROM customers WHERE id = $1
          `,
      [id]
    );
    if (customer.rows.length === 0) {
      return res.status(status).send({ message: "O Cliente não existe!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }

  next();
}
