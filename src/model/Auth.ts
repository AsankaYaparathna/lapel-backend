import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({ tableName: Auth.TABLE_NAME })
export class Auth extends Model {
    public static TABLE_NAME = "LAPEL_AUTH" as string;
    public static Auth_ID = "id" as string;
    public static Auth_Cid = "clientid" as string;
    public static Auth_Cs = "clientsecret" as string;
    public static Auth_Url = "clienturl" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: Auth.Auth_ID })
    id!: number;

    @Column({ type: DataType.STRING(255), field: Auth.Auth_Cid , unique: true })
    clientid!: string;

    @Column({ type: DataType.STRING(255), field: Auth.Auth_Cs, })
    clientsecret!: string;

    @Column({ type: DataType.STRING(255), field: Auth.Auth_Url})
    clienturl!: string;
}
