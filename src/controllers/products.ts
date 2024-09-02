import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ProductsEntity } from "../entities/products";

class ProductsController {
  public async Get(req: Request, res: Response): Promise<void> {
    res.json(await AppDataSource.getRepository(ProductsEntity).find());
  }

  public async GetId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    res.json(
      await AppDataSource.getRepository(ProductsEntity).find({
        where: { id: +id },
      })
    );
  }

  public async Post(req: Request, res: Response) {
    const {
      name,
      dosageForm,
      strength,
      price,
      quantityInStock,
      yearofmanufacture,
      expiryDate,
      description,
    } = req.body;

    const products = await AppDataSource.getRepository(ProductsEntity)
      .createQueryBuilder()
      .insert()
      .into(ProductsEntity)
      .values({
        name,
        dosageForm,
        strength,
        price,
        quantityInStock,
        yearofmanufacture,
        expiryDate,
        description,
      })
      .returning("*")
      .execute();

    res.json({
      status: 201,
      message: "products created",
      data: products.raw[0],
    });
  }

  public async Put(req: Request, res: Response) {
    try {
      const {
        name,
        dosageForm,
        strength,
        price,
        quantityInStock,
        yearofmanufacture,
        expiryDate,
        description,
      } = req.body;
      const { id } = req.params;

      const products = await AppDataSource.getRepository(
        ProductsEntity
      ).findOne({
        where: { id: +id },
      });

      products.name = name != undefined ? name : products.name;
      products.dosageForm = dosageForm != undefined ? dosageForm : products.dosageForm;
      products.strength = strength != undefined ? strength : products.strength;
      products.price = price != undefined ? price : products.price;
      products.quantityInStock = quantityInStock != undefined ? quantityInStock : products.quantityInStock;
      products.yearofmanufacture = yearofmanufacture != undefined ? yearofmanufacture : products.yearofmanufacture;
      products.expiryDate = expiryDate != undefined ? expiryDate : products.expiryDate;
      products.description = description != undefined ? description : products.description;

      await AppDataSource.manager.save(products);
      res.json({
        status: 200,
        message: "products updated",
        data: products,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async Delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const products = await AppDataSource.getRepository(ProductsEntity)
        .createQueryBuilder()
        .delete()
        .from(ProductsEntity)
        .where({ id })
        .returning("*")
        .execute();

      res.json({
        status: 200,
        message: "products deleted",
        data: products.raw[0],
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new ProductsController();
