import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import httpError from "http-errors";
import 'dotenv/config';
import path from "path";

import routes from "./routes/index.js"
import schema from "./models/index.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

const distDir = path.dirname("") + "/dist";

// app.set('views', distDir);
app.use(express.static(distDir));


app.use("/api/gateways", routes.gateway);
app.use("/api/devices", routes.device);

app.use((req, res, next)=>{
  next(httpError(404));
});
//
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

export const initialize = (callback, resetDatabase = true) =>{
  schema.db.connect(process.env.DATABASE_URL).then(async () => {
    if(resetDatabase){
      await schema.db.clean();
      await schema.db.populate();
    }
    callback();
  });
};


export default app

