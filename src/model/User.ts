import { BeforeCreate, BeforeUpdate, Column, DataType, Model, Table } from "sequelize-typescript";
import { hashPassword } from "../utils/Utils";


@Table({ tableName: User.User_TABLE_NAME })
export class User extends Model {
    public static User_TABLE_NAME = "LAPEL_USER" as string;
    public static User_ID = "id" as string;
    public static User_FULL_NAME = "fullName" as string;
    public static User_MOBILE_NUMBER = "mobileNumber" as string;
    public static User_EMAIL = "email" as string;
    public static User_PASSWORD = "password" as string;
    public static User_OTP = "otp" as string;
    public static User_IS_MOBILE_VERIFIED = "isMobileVerified" as string;

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: User.User_ID })
    id!: number;

    @Column({ type: DataType.STRING(100), field: User.User_FULL_NAME })
    fullName!: string;

    @Column({ type: DataType.STRING(20), field: User.User_MOBILE_NUMBER, unique: true })
    mobileNumber!: string;

    @Column({ type: DataType.STRING(100), field: User.User_EMAIL, unique: true })
    email!: string;

    @Column({ type: DataType.STRING(255), field: User.User_PASSWORD })
    password!: string;

    @Column({ type: DataType.INTEGER, field: User.User_OTP })
    otp!: number;

    @Column({ type: DataType.BOOLEAN, field: User.User_IS_MOBILE_VERIFIED })
    isMobileVerified!: boolean;

    @BeforeCreate
    @BeforeUpdate
    static hashPasswordHook(user: User): void {
        if (user.changed("password")) {
            const hashedPassword = hashPassword(user.password);
            user.password = hashedPassword;
        }
    }

}
