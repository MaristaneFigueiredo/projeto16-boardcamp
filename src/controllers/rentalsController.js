import dayjs from "dayjs";
import connection from "../database/db.js";
import { gameById } from "../middleswares/gamesMiddleware.js";

export async function postRental(req, res) {
  const { customerId, gameId, daysRented } = req.body;

  const rentDate = dayjs().format("YYYY-MM-DD");

  const game = await gameById(gameId);
  //   console.log("game", game);

  const originalPrice = daysRented * game.pricePerDay;
  //   console.log("originalPrice", originalPrice);

  try {
    const rental = await connection.query(
      `
          INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented",  "originalPrice") 
          VALUES($1, $2, $3, $4, $5)
      `,
      [customerId, gameId, rentDate, daysRented, originalPrice]
    );
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

export async function alterRental(req, res) {
  //   try {
  //     const { name, phone, cpf, birthday } = req.body;
  //     const { id } = req.params;
  //     const customer = await connection.query(
  //       `
  //           UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5
  //       `,
  //       [name, phone, cpf, birthday, id]
  //     );
  //     res.sendStatus(200);
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(500).send({ message: "Erro inesperado no servidor!" });
  //   }
}

export async function getRentals(req, res) {
  //   const cpf = req.query.cpf;
  //   let customer = [];
  //   try {
  //     if (cpf === undefined) {
  //       customer = await connection.query(`
  //             SELECT * FROM customers
  //         `);
  //     } else {
  //       customer = await connection.query(
  //         `
  //             SELECT * FROM customers WHERE cpf LIKE ($1)
  //         `,
  //         [cpf + "%"]
  //       );
  //     }
  //     res.send(customer.rows);
  //   } catch (error) {
  //     return res.status(500).send({ message: "Erro inesperado no servidor!" });
  //   }
}

// export async function getIdCustomer(req, res) {
//   try {
//     const { id } = req.params;

//     const customer = await connection.query(
//       `
//         SELECT * FROM customers WHERE id = $1
//         `,
//       [id]
//     );

//     res.send(customer.rows);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({ message: "Erro inesperado no servidor!" });
//   }
// }
