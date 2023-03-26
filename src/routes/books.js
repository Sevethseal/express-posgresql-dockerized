const { Router } = require("express");
const router = Router();
const pool = require("../db");

router.get("/books", async (request, response) => {
  const { order } = request.query;
  const bookList = await pool.query("SELECT * FROM book");

  if (order) {
    if (order === "ASC") {
      console.log("A");
      response.send(bookList.sort((a, b) => a.id - b.id));
    }
    if (order === "DEC") {
      console.log("B");
      response.send(bookList.sort((a, b) => b.id - a.id));
    }
    response.status(404).send("Invalid query");
  } else {
    response.send(bookList.rows);
  }
});

router.post("/books", async (req, res) => {
  const { body } = req;
  const { author, name } = body;
  const newBook = await pool.query(
    "INSERT INTO book (author,name) VALUES ($1,$2) RETURNING *",
    [author, name]
  );
  res.status(201).send(newBook);
});

router.get("/books/:bookId/:item", (req, res) => {
  const { bookId, item } = req.params;
  res.send({ bookId, item });
});

router.get("/login", (req, res) => {
  console.log(req.cookies);
  res.cookie("isActive", true, {
    maxAge: 60000,
  });

  res.send("Cookie added");
});

router.get("/carts", (req, res) => {
  const { cart } = req.session;
  if (!cart) {
    res.send("NO cart Data");
  }
  res.send(cart);
});
router.post("/carts/item", (req, res) => {
  console.log("hiii");
  const { item, quantity } = req.body;
  const cartItem = { item, quantity };
  const { cart } = req.session;
  if (cart) {
    req.session.cart.items.push(cartItem);
  } else {
    req.session.cart = {
      items: [cartItem],
    };
  }
  res.send(201);
});

router.patch("/update/book/:id", async (req, res) => {
  console.log(req.body);
  const { id } = req.params;
  const { body } = req;
  const { author, name } = body;
  if (author && name && id) {
    const updateBook = await pool.query(
      "UPDATE book SET author=$1 ,name=$2 WHERE id=$3",
      [author, name, id]
    );
    updateBook;
    res.status(201).send(updateBook);
  } else {
    res.send("Invalid params");
  }
});

router.delete("/delete/book/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    const deleteBook = await pool.query("DELETE FROM book WHERE id=$1", [id]);
    res.status(200).send(deleteBook.rows);
  } else {
    res.send("Invalid params");
  }
});
module.exports = router;
