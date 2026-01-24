import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// POST /cart
export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    // validate product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // check if already in cart
    const existingItem = await Cart.findOne({ product: productId });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      const updated = await existingItem.save();
      await updated.populate("product")
      return res.json(updated);
    }

    const cartItem = new Cart({
      product: productId,
      quantity: quantity || 1,
    });

    const savedItem = await cartItem.save();
    await savedItem.populate("product")
    console.log(savedItem);
    
    res.status(201).json(savedItem);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: error.message });
  }
};

// PUT /cart/:id
export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be at least 1" });
    }

    item.quantity = quantity;
    const updatedItem = await item.save();
    await updatedItem.populate("product")
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Invalid cart item ID" });
  }
};

// DELETE /cart/:id
export const removeFromCart = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    await item.deleteOne();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Invalid cart item ID" });
  }
};
