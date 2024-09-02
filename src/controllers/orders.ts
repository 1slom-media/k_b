import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { OrdersEntity } from "../entities/orders";
import orderid from "order-id";

class OrdersController {
  public async Get(req: Request, res: Response): Promise<void> {
    res.json(await AppDataSource.getRepository(OrdersEntity).find());
  }

  public async GetId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    res.json(
      await AppDataSource.getRepository(OrdersEntity).find({
        where: { id: +id },
      })
    );
  }

  public async Post(req: Request, res: Response) {
    const { customerName, status, pharmacyName, products } = req.body;
    const id = orderid("key").generate();

    const order = new OrdersEntity();
    order.orderNumber = `ORD-${id}`;
    order.customerName = customerName;
    order.status = status;
    order.pharmacyName = pharmacyName;
    order.products = products;
    await AppDataSource.manager.save(order);

    res.json({
      status: 201,
      message: "order created",
      data: order,
    });
  }

  public async Put(req: Request, res: Response) {
    try {
      const {
        customerName, status, pharmacyName, products 
      } = req.body;
      const { id } = req.params;

      const order = await AppDataSource.getRepository(OrdersEntity).findOne({
        where: { id: +id },
      });

      order.customerName = customerName != undefined ? customerName : order.customerName;
      order.status = status != undefined ? status : order.status;
      order.pharmacyName = pharmacyName != undefined ? pharmacyName : order.pharmacyName;
      order.products = products != undefined ? products : order.products;

      await AppDataSource.manager.save(order);
      res.json({
        status: 200,
        message: "order updated",
        data: order,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async Delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const order = await AppDataSource.getRepository(OrdersEntity)
        .createQueryBuilder()
        .delete()
        .from(OrdersEntity)
        .where({ id })
        .returning("*")
        .execute();

      res.json({
        status: 200,
        message: "order deleted",
        data: order.raw[0],
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new OrdersController();
