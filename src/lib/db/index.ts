import { Client } from 'pg'

export default async function DB() {
  try {
    const config = {
      host: "cluster1-instance-1.clu2884iw8bc.eu-central-1.rds.amazonaws.com",
      database: "tft_tierlist_db",
      port: 5432,
      password: "vVioOve4cGAwTeOFsIWD",
      user: "cluster1-instance-1",
    }

    const client = new Client(config)
    console.log("going to call connect");
    await client.connect();
    console.log("connected succesfully, going to return it");
    return client
  } catch (err) {
    console.log("could not connect")
    console.log(err)
  }
}
