import { Router } from "express";
import products from "../controllers/products";
import orders from "../controllers/orders";

const router = Router();

router.get("/products", products.Get);
router.get("/products/:id", products.GetId);
router.put("/products/:id", products.Put);
router.delete("/products/:id", products.Delete);
router.post("/products", products.Post);

router.get("/orders", orders.Get);
router.get("/orders/:id", orders.GetId);
router.put("/orders/:id", orders.Put);
router.delete("/orders/:id", orders.Delete);
router.post("/orders", orders.Post);

export default router;
