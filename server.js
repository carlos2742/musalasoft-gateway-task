import 'dotenv/config';
import app, {initialize} from "./api/app.js";

const startServer = () => {
  const server = app.listen(process.env.PORT,() =>{
    const port = server.address().port;
    console.log(`Example app listening on port ${port}!`)
  });
};

initialize(startServer);

