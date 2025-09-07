const express = require("express");
const { Liquid } = require("liquidjs");
const path = require("path");
const fs = require("fs");

const app = express();

const engine = new Liquid({
  root: [
    path.resolve(__dirname, "templates"),
    path.resolve(__dirname, "sections"),
    path.resolve(__dirname, "snippets"),
  ],
  extname: ".liquid",
});

// Agregar filtro asset_url personalizado
engine.registerFilter("asset_url", (str) => {
  // Si la ruta comienza con 'sections/', servirla desde la carpeta sections
  if (str.startsWith("sections/")) {
    return `/${str}`;
  }
  // Si la ruta comienza con 'snippets/', servirla desde la carpeta snippets
  if (str.startsWith("snippets/")) {
    return `/${str}`;
  }
  // Si no, servirla desde assets
  return `/assets/${str}`;
});

app.engine("liquid", engine.express());
app.set("views", path.resolve(__dirname, "templates"));
app.set("view engine", "liquid");

app.use(express.static("public"));
app.use("/assets", express.static("assets"));
app.use("/assets", express.static("templates/styles")); // Para servir CSS desde templates/styles
app.use("/sections", express.static("sections"));
app.use("/templates", express.static("templates"));
app.use("/snippets", express.static("snippets")); // Para servir archivos desde snippets

const products = require("./data/products.json");
const collections = require("./data/collections.json");
const settings = JSON.parse(
  fs.readFileSync("./config/settings_data.json", "utf-8")
);

app.get("/", (req, res) => {
  // Crear estructura de colecciones que incluya los productos completos
  const processedCollections = {};

  // Crear una colección featured-products con todos los productos ordenados por importancia
  const sortedProducts = products.sort((a, b) => a.importance - b.importance);
  processedCollections["featured-products"] = {
    products: sortedProducts,
  };

  // Procesar otras colecciones existentes
  collections.forEach((collection) => {
    const collectionProducts = collection.products
      .map((productId) => products.find((product) => product.id === productId))
      .filter((product) => product !== undefined);

    processedCollections[collection.title.toLowerCase().replace(/\s+/g, "-")] =
      {
        ...collection,
        products: collectionProducts,
      };
  });

  res.render("index", {
    products,
    collections: processedCollections,
    settings: settings.sections,
    current_path: req.path,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
