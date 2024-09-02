import { IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

@Entity({ name: "products" })
export class ProductsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    @IsString()
    name: string;

    @Column({ type: "varchar" })
    @IsString()
    dosageForm: string;

    @Column({ type: "varchar" })
    @IsString()
    strength: string;

    @Column({ type: "varchar" })
    @IsString()
    price: string;

    @Column({ type: "varchar" })
    @IsString()
    quantityInStock: string;

    @Column({ type: "timestamp" })
    yearofmanufacture: string;
    
    @Column({ type: "timestamp" })
    expiryDate: string;

    @Column({ type: "varchar" })
    @IsString()
    description: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updateAt: Date;
}