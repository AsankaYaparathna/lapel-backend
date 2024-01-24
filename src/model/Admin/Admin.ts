import { BeforeCreate, BeforeUpdate, Column, DataType, Model, Table } from "sequelize-typescript";
import { hashPassword } from "../../utils/Utils";


@Table({ tableName: "LAPEL_ADMIN",
    timestamps: true,
    updatedAt: 'updatedAt',
    createdAt: 'createdAt'
})

export class Admin extends Model {

    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: "id" })
    id!: number;

    @Column({ type: DataType.STRING(100), field: "userName" })
    userName!: string;

    @Column({ type: DataType.STRING(255), field: "password" })
    password!: string;

    @Column({ type: DataType.BOOLEAN, field: "isActive" })
    isActive!: boolean;

    @BeforeCreate
    @BeforeUpdate
    static async hashPasswordHook(model: Admin): Promise<void> {
        if (model.changed("password")) {
            const hashedPassword = hashPassword(model.password);
            model.password = hashedPassword;
        }
    }

}


