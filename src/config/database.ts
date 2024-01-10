import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { Not } from "sequelize-typescript";
import { User } from "../model/User";
import { Auth } from "../model/Auth";

dotenv.config()

export default class Database{
    public sequelize: Sequelize | undefined;
    //private static instance: Database;

    private PG_DB = process.env.PGDB as string
    private PG_HOST = process.env.PGHOST as string
    private PG_PORT = process.env.PGPORT as unknown as number
    private PG_USERNAME = process.env.PGUSERNAME as unknown as string
    private PG_PASSWORD = process.env.PGPASSWORD as unknown as string

    constructor(){
        this.ConnectToPostgreSQL();
    }

    

    private async ConnectToPostgreSQL(){
        this.sequelize = new Sequelize({
            database:this.PG_DB,
            username:this.PG_USERNAME,
            password:this.PG_PASSWORD,
            host:this.PG_HOST,
            port:this.PG_PORT,
            dialect: "postgres",
            models: [User, Auth]
        });

        this.sequelize
        .authenticate()
        .then(() => {
            console.log(" ✅ PostgreSQL connection has been established successfully. ✅ ");
        })
        .catch((err) =>{
            console.log(" ❌ Unable to connect to the postgreSQL database. ❌ ", err);
        })
    }



}