import { BeforeCreate, BeforeUpdate, ForeignKey, Column, DataType, Model, Table } from "sequelize-typescript";
import { hashPassword } from "../../utils/Utils";
import { Image } from "../Common/Images";


@Table({ 
    tableName: "LAPEL_USER",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class User extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @Column({ type: DataType.STRING(10), unique : true, field: "customerId" })
    customerId!: string;

    @Column({ type: DataType.STRING(100), field: "fullName" })
    fullName!: string;

    @Column({ type: DataType.STRING(20), field: "mobileNumber", unique: true })
    mobileNumber!: string;

    @Column({ type: DataType.STRING(100), field: "email" })
    email!: string;

    @Column({ type: DataType.STRING(255), field: "password" })
    password!: string;

    @Column({ type: DataType.INTEGER, field: "otp" })
    otp!: number;

    @Column({ type: DataType.BOOLEAN, field: "isMobileVerified" })
    isMobileVerified!: boolean;

    @Column({ type: DataType.BOOLEAN, field: "isActive" })
    isActive!: boolean;

    @ForeignKey(() => Image)
    @Column({ type: DataType.INTEGER, field: "avatar" })
    avatar!: number;

    @Column({ type: DataType.JSON, field: "billing" })
    billing!: { address1 : string, address2 : string, zipCode : string, city : string};

    @Column({ type: DataType.JSON, field: "delivery" })
    delivery!: { address1 : string, address2 : string, zipCode : string, city : string};

    @Column({ type: DataType.BOOLEAN, field: "sameAsBilling" })
    sameAsBilling!: boolean;

    @Column({ type: DataType.INTEGER, field: "userType" })
    userType!: number;

    @BeforeCreate
    @BeforeUpdate
    static async hashPasswordHook(user: User): Promise<void> {
        if (user.changed("password")) {
            const hashedPassword = hashPassword(user.password);
            user.password = hashedPassword;
        }
    }

}


