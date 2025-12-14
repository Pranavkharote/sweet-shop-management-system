import { Router } from "express";
import { SweetService } from "../services/sweet.service";
import { authenticate, requireAdmin } from "../middlewares/auth.middleware";

const router = Router();
const sweetService = new SweetService();

router.post("/", authenticate, async (req, res) => {
  try {
    const sweet = await sweetService.createSweet(req.body);
    res.status(201).json(sweet);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.get("/", authenticate, async (_req, res) => {
  const sweets = await sweetService.getAllSweets();
  res.json(sweets);
});

router.get("/search", authenticate, async (req, res) => {
  try {
    const sweets = await sweetService.searchSweets(req.query);
    res.json(sweets);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});


router.put("/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    const sweet = await sweetService.updateSweet(req.params.id, req.body);
    res.json(sweet);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});



router.post("/:id/purchase", authenticate, async (req, res) => {
  try {
    const rawQty = req.body.qty;

    console.log("RAW QTY:", rawQty, typeof rawQty); // TEMP DEBUG

    const qty = Number(rawQty);

    if (Number.isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const sweet = await sweetService.purchaseSweet(req.params.id, qty);
    res.json(sweet);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});


router.post("/:id/restock", authenticate, requireAdmin, async (req, res) => {
  try {
    const sweet = await sweetService.restockSweet(
      req.params.id,
      req.body.qty
    );
    res.json(sweet);
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});

router.delete("/:id", authenticate, requireAdmin, async (req, res) => {
  try {
    await sweetService.deleteSweet(req.params.id);
    res.json({ message: "Sweet deleted successfully" });
  } catch (e: any) {
    res.status(400).json({ message: e.message });
  }
});


export default router;
