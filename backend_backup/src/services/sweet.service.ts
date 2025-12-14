import { Sweet } from "../models/sweet.model";

export class SweetService {
  async createSweet(data: any) {
    return Sweet.create(data);
  }

  async getAllSweets() {
    return Sweet.find();
  }

  async purchaseSweet(sweetId: string, qty: number) {
    const sweet = await Sweet.findById(sweetId);

    if (!sweet || sweet.quantity < qty) {
      throw new Error("Out of stock");
    }

    sweet.quantity -= qty;
    return sweet.save();
  }

  async restockSweet(sweetId: string, qty: number) {
    const sweet = await Sweet.findById(sweetId);
    if (!sweet) throw new Error("Sweet not found");

    sweet.quantity += qty;
    return sweet.save();
  }

 

async searchSweets(query: any) {
  const filter: any = {};

  if (query.name) {
    filter.name = { $regex: query.name, $options: "i" };
  }

  if (query.category) {
    filter.category = { $regex: query.category, $options: "i" };
  }

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  return Sweet.find(filter);
}

async updateSweet(id: string, updates: any) {
  const sweet = await Sweet.findById(id);
  if (!sweet) {
    throw new Error("Sweet not found");
  }

  if (updates.name !== undefined) sweet.name = updates.name;
  if (updates.category !== undefined) sweet.category = updates.category;
  if (updates.price !== undefined) sweet.price = updates.price;
  if (updates.quantity !== undefined) sweet.quantity = updates.quantity;

  await sweet.save();
  return sweet;
}


async deleteSweet(id: string) {
  const sweet = await Sweet.findByIdAndDelete(id);
  if (!sweet) {
    throw new Error("Sweet not found");
  }
  return sweet;
}

}
