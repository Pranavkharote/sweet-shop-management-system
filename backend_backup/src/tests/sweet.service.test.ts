import { SweetService } from "../services/sweet.service";
import { Sweet } from "../models/sweet.model";

jest.mock("../models/sweet.model", () => ({
  Sweet: {
    create: jest.fn(),
    find: jest.fn(),
    findById: jest.fn(),
    findByIdAndDelete: jest.fn(),
  },
}));

describe("SweetService", () => {
  let service: SweetService;

  beforeEach(() => {
    service = new SweetService();
    jest.clearAllMocks();
  });

  it("should create a sweet", async () => {
    const mockSweet = { name: "Ladoo", price: 10 };
    (Sweet.create as jest.Mock).mockResolvedValue(mockSweet);

    const result = await service.createSweet(mockSweet);

    expect(Sweet.create).toHaveBeenCalledWith(mockSweet);
    expect(result).toEqual(mockSweet);
  });

  it("should return all sweets", async () => {
    const sweets = [{ name: "Barfi" }, { name: "Jalebi" }];
    (Sweet.find as jest.Mock).mockResolvedValue(sweets);

    const result = await service.getAllSweets();

    expect(Sweet.find).toHaveBeenCalled();
    expect(result).toEqual(sweets);
  });

  it("should reduce quantity when purchasing sweet", async () => {
    const mockSweet: any = {
      quantity: 10,
      save: jest.fn().mockResolvedValue(true),
    };

    (Sweet.findById as jest.Mock).mockResolvedValue(mockSweet);

    await service.purchaseSweet("sweetId", 3);

    expect(mockSweet.quantity).toBe(7);
    expect(mockSweet.save).toHaveBeenCalled();
  });

  it("should throw error if sweet is out of stock", async () => {
    (Sweet.findById as jest.Mock).mockResolvedValue({
      quantity: 2,
    });

    await expect(
      service.purchaseSweet("sweetId", 5)
    ).rejects.toThrow("Out of stock");
  });

  it("should increase quantity when restocking", async () => {
    const mockSweet: any = {
      quantity: 5,
      save: jest.fn().mockResolvedValue(true),
    };

    (Sweet.findById as jest.Mock).mockResolvedValue(mockSweet);

    await service.restockSweet("sweetId", 10);

    expect(mockSweet.quantity).toBe(15);
    expect(mockSweet.save).toHaveBeenCalled();
  });

  it("should search sweets using filters", async () => {
    const sweets = [{ name: "Rasgulla" }];
    (Sweet.find as jest.Mock).mockResolvedValue(sweets);

    const result = await service.searchSweets({ name: "ras" });

    expect(Sweet.find).toHaveBeenCalledWith({
      name: { $regex: "ras", $options: "i" },
    });
    expect(result).toEqual(sweets);
  });

  it("should update sweet fields", async () => {
    const mockSweet: any = {
      name: "Old",
      price: 10,
      save: jest.fn().mockResolvedValue(true),
    };

    (Sweet.findById as jest.Mock).mockResolvedValue(mockSweet);

    const result = await service.updateSweet("id", {
      name: "New",
      price: 20,
    });

    expect(mockSweet.name).toBe("New");
    expect(mockSweet.price).toBe(20);
    expect(mockSweet.save).toHaveBeenCalled();
    expect(result).toBe(mockSweet);
  });

  it("should delete sweet", async () => {
    const sweet = { name: "Deleted sweet" };
    (Sweet.findByIdAndDelete as jest.Mock).mockResolvedValue(sweet);

    const result = await service.deleteSweet("id");

    expect(Sweet.findByIdAndDelete).toHaveBeenCalledWith("id");
    expect(result).toEqual(sweet);
  });
});
