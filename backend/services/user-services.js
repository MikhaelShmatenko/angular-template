let MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
let url = "mongodb://mongoadmin:secret@localhost:27017";

class UserServices {
  static async getUsers() {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const dbo = client.db("ExampleDB");
      const users = await dbo.collection("users").find({}).toArray();
      return users;
    } catch (err) {
      throw err;
    } finally {
      await client.close();
    }
  }
  static async getUsersById(id) {
    const client = new MongoClient(url);
    try {
      await client.connect();
      const dbo = client.db("ExampleDB");
      const user = await dbo
        .collection("users")
        .find({
          _id: new ObjectId(id),
        })
        .toArray();
      return user;
    } catch (err) {
      throw err;
    } finally {
      await client.close();
    }
  }
}

module.exports = UserServices;
