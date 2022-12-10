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

export async function customerExists(req, res, next) {
  try {
    const cpfCustomer = req.body.cpf;
    const customer = await connection.query(
      `    SELECT * FROM customers WHERE cpf = $1
      `,
      [cpfCustomer]
    );
    if (customer.rows.length > 0) {
      return res.status(409).send({ message: "Este cpf já existe!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
  next();
}

export async function idCustomerExists(req, res, next) {
  try {
    const { id } = req.params;

    const customer = await connection.query(
      `
          SELECT * FROM customers WHERE id = $1
          `,
      [id]
    );
    if (customer.rows.length === 0) {
      return res.status(404).send({ message: "O Cliente não existe!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }

  next();
}
