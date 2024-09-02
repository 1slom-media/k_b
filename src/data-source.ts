import "reflect-metadata"
import { DataSource } from "typeorm"
import { ProductsEntity } from "./entities/products"
import { OrdersEntity } from "./entities/orders"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "john.db.elephantsql.com",
    port: 5432,
    username: "vkhiyhix",
    password: "Tbj9svDThPDg4SVNG7RUXJaHCu02p6gr",
    database: "vkhiyhix",
    synchronize: true,
    logging: false,
    entities: [ProductsEntity,OrdersEntity],
    migrations: [],
    subscribers: [],
})
