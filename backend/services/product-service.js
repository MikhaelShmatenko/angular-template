let MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
let url = "mongodb://mongoadmin:secret@localhost:27017";

class ProductServices {
  static async addProduct(product) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const dbo = client.db("ExampleDB");
      await dbo.collection("products").insertOne(product);
      return product;
    } catch (err) {
      throw err;
    } finally {
      await client.close();
    }
  }
  static async getProducts() {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const dbo = client.db("ExampleDB");
      const products = await dbo.collection("products").find({}).toArray();
      return products;
    } catch (err) {
      throw err;
    } finally {
      await client.close();
    }
  }
  static async getProductsById(id) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const dbo = client.db("ExampleDB");
      const product = await dbo
        .collection("products")
        .find({
          _id: new ObjectId(id),
        })
        .toArray();
      return product;
    } catch (err) {
      throw err;
    } finally {
      await client.close();
    }
  }
  static async deleteProductsById(id) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const dbo = client.db("ExampleDB");
      await dbo.collection("products").deleteMany({
        _id: new ObjectId(id),
      });
    } catch (err) {
      throw err;
    } finally {
      await client.close();
    }
  }
  static async modifyProduct(product, id) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const dbo = client.db("ExampleDB");
      await dbo.collection("products").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: {
            name: product.name,
            type: product.type,
            price: product.price,
            exclusive: product.exclusive,
          },
        },
      );
    } catch (err) {
      throw err;
    } finally {
      await client.close();
    }
  }
}

module.exports = ProductServices;
