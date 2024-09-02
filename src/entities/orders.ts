import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity({ name: "orders" })
export class OrdersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    @IsString()
    orderNumber: string;

    @Column({ type: "varchar" })
    @IsString()
    customerName: string;

    @Column({ type: "varchar" })
    @IsString()
    status: string;

    @Column({ type: "varchar" })
    @IsString()
    pharmacyName: string;

    @Column({ type: "jsonb",nullable:true })
    products: string[];

    @CreateDateColumn({ type: "timestamp" })
    orderDate: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;
}