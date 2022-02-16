import Express from "express";

const main = () => {
  console.log("bob");
  const app = Express();

  app.get("/bob", (_, res) => {
    res.send("bob");
  });

  app.listen(4000, () => console.log("server running on "));
};

main();
