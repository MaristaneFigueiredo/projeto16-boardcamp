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

export async function getRentals(req, res) {
  const customerId = req.query.customerId;
  const gameId = req.query.gameId;
  //   console.log("customerId", customerId);
  //   console.log("gameId", gameId);
  let rental = [];
  try {
    if (customerId === undefined && gameId === undefined) {
      rental = await connection.query(`              
              SELECT rentals.*, 
              customers.id as "customerID", customers.name as "customerName", games.id as "gameId", games.name as "gameName", games."categoryId", 
              categories.name as "categoryName" 
              FROM rentals INNER JOIN customers ON rentals."customerId" = customers.id 
                   INNER JOIN games ON rentals."gameId" = games.id 
                   INNER JOIN categories ON games."categoryId" = categories.id 
          `);
    } else if (customerId !== undefined) {
      rental = await connection.query(
        `              
              SELECT rentals.*, 
              customers.id as "customerID", customers.name as "customerName", games.id as "gameId", games.name as "gameName", games."categoryId", 
              categories.name as "categoryName" 
              FROM rentals INNER JOIN customers ON rentals."customerId" = customers.id 
                   INNER JOIN games ON rentals."gameId" = games.id 
                   INNER JOIN categories ON games."categoryId" = categories.id 
                   WHERE rentals."customerId" = $1
          `,
        [customerId]
      );
    } else {
      rental = await connection.query(
        `              
                  SELECT rentals.*, 
                  customers.id as "customerID", customers.name as "customerName", games.id as "gameId", games.name as "gameName", games."categoryId", 
                  categories.name as "categoryName" 
                  FROM rentals INNER JOIN customers ON rentals."customerId" = customers.id 
                       INNER JOIN games ON rentals."gameId" = games.id 
                       INNER JOIN categories ON games."categoryId" = categories.id 
                       WHERE rentals."gameId" = $1
              `,
        [gameId]
      );
    }

    const rows = rental.rows;
    //console.log("rows", rows);

    const result = rows.map((e) => {
      return {
        id: e.id,
        customerId: e.customerId,
        gameId: e.gameId,
        rentDate: dayjs(e.rentDate).format("YYYY-MM-DD"),
        daysRented: e.daysRented,
        returnDate: dayjs(e.returnDate).format("YYYY-MM-DD"),
        originalPrice: e.originalPrice,
        delayFee: e.delayFee,
        customer: {
          id: e.customerId,
          name: e.customerName,
        },
        game: {
          id: e.gameId,
          name: e.gameName,
          categoryId: e.categoryId,
          categoryName: e.categoryName,
        },
      };
    });
    // console.log("entrei aqui result", result);
    res.send(result);
    //res.send(rental.rows);
  } catch (error) {
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

export async function endRental(req, res) {
  try {
    const { id } = req.params;

    const rentalInOpen = await connection.query(
      `
        SELECT * FROM rentals WHERE id = $1
        `,
      [id]
    );

    if (rentalInOpen.rows[0].returnDate !== null) {
      return res.status(400).send({ message: "Aluguel já finalizado!" });
    }
    const gameId = rentalInOpen.rows[0].gameId;
    const game = await gameById(gameId);

    const returnDate = dayjs();
    //console.log("returnDate - dayjs()", returnDate);
    const dateRent = dayjs(rentalInOpen.rows[0].rentDate);
    //console.log("dateRent - dayjs()", dateRent);
    const daysDelay = returnDate.diff(dateRent, "day", false);
    //console.log("daysDelay - dayjs()", daysDelay);

    const delayFee = daysDelay > 0 ? game.pricePerDay * daysDelay : 0;
    const rental = await connection.query(
      `
          UPDATE rentals SET "returnDate" = $2,
           "delayFee" = $3 WHERE id = $1
      `,
      [id, returnDate, delayFee]
    );

    res.send(rental.rows);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}

export async function deleteRental(req, res) {
  try {
    const { id } = req.params;

    const rentalInOpen = await connection.query(
      `
        SELECT * FROM rentals WHERE id = $1
        `,
      [id]
    );

    if (rentalInOpen.rows[0].returnDate === null) {
      return res
        .status(400)
        .send({ message: "O jogo ainda não foi devolvido!" });
    }

    const rental = await connection.query(
      `
        DELETE FROM rentals WHERE id = $1
        `,
      [id]
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Erro inesperado no servidor!" });
  }
}
