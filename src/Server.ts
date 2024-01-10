import express, { Application, Request, Response} from "express";
import Database from "./config/database";
import UserRouts from "./router/UserRouter";
import AuthRouts from "./router/AuthRouter";

class App{
    public app: Application;

    constructor(){
        this.app = express();
        this.DatabaseSync();
        this.plugins();
        this.routes();
    }

    protected plugins(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : true}));
    }

    protected DatabaseSync():void{
        const db = new Database();
        db.sequelize?.sync()
        
    }

    protected routes():void{
        this.app.route("/").get((req: Request, res: Response) =>{ res.send("Welcome Home"); });
        this.app.use("/api/v1/user",UserRouts);
        this.app.use("/api/v1/auth",AuthRouts);

    }
}

const port:number = 8000
const app = new App().app

app.listen(port,()=>{
    console.log(`Server started at port : ${port}`)
})