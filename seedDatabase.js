require("dotenv").config();
const { MongoClient } = require("mongodb");

async function seedDatabase() {
  const uri = process.env.MONGODB_URI; // Access MongoDB URI from .env
  if (!uri) {
    console.error("MONGODB_URI is not set in the .env file.");
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("DESaPDB"); // Ensure it matches your database name
    const councils = db.collection("councils");

    const councilData = [
      {
        name: "Kuala Lumpur City Council",
        city: "Kuala Lumpur",
        state: "Federal Territory",
        address: "Jalan Raja Laut, 50350 Kuala Lumpur",
        leaderEmail: "kl_leader@example.com",
      },
      {
        name: "Penang Island City Council",
        city: "George Town",
        state: "Penang",
        address: "Komtar, Jalan Penang, 10000 George Town",
        leaderEmail: "penang_leader@example.com",
      },
      {
        name: "Ipoh City Council",
        city: "Ipoh",
        state: "Perak",
        address: "Jalan Sultan Abdul Jalil, 30450 Ipoh",
        leaderEmail: "ipoh_leader@example.com",
      },
      {
        name: "Johor Bahru City Council",
        city: "Johor Bahru",
        state: "Johor",
        address: "Jalan Dato' Onn, 80000 Johor Bahru",
        leaderEmail: "jb_leader@example.com",
      },
      {
        name: "Malacca City Council",
        city: "Malacca City",
        state: "Malacca",
        address: "Jalan Kota, 75000 Melaka",
        leaderEmail: "melaka_leader@example.com",
      },
      {
        name: "Shah Alam City Council",
        city: "Shah Alam",
        state: "Selangor",
        address: "Persiaran Perbandaran, Seksyen 14, 40000 Shah Alam",
        leaderEmail: "shahalam_leader@example.com",
      },
      {
        name: "Kota Kinabalu City Hall",
        city: "Kota Kinabalu",
        state: "Sabah",
        address: "Jalan Bandaran, 88675 Kota Kinabalu",
        leaderEmail: "kk_leader@example.com",
      },
      {
        name: "Kuching North City Hall",
        city: "Kuching",
        state: "Sarawak",
        address: "Jalan Satok, 93400 Kuching",
        leaderEmail: "kuchingnorth_leader@example.com",
      },
      {
        name: "Kuantan City Council",
        city: "Kuantan",
        state: "Pahang",
        address: "Jalan Tanah Putih, 25100 Kuantan",
        leaderEmail: "kuantan_leader@example.com",
      },
      {
        name: "Alor Setar City Council",
        city: "Alor Setar",
        state: "Kedah",
        address: "Jalan Sultan Badlishah, 05000 Alor Setar",
        leaderEmail: "alorsetar_leader@example.com",
      },
      {
        name: "Seremban City Council",
        city: "Seremban",
        state: "Negeri Sembilan",
        address: "Jalan Yam Tuan, 70000 Seremban",
        leaderEmail: "seremban_leader@example.com",
      },
      {
        name: "Kuala Terengganu City Council",
        city: "Kuala Terengganu",
        state: "Terengganu",
        address: "Jalan Sultan Ismail, 20200 Kuala Terengganu",
        leaderEmail: "kualaterengganu_leader@example.com",
      },
    ];

    const result = await councils.insertMany(councilData);

    console.log("Mock data inserted:", result.insertedCount);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await client.close();
  }
}

seedDatabase().catch(console.error);
