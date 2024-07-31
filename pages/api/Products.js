import dbConnect from '../../lib/mongodb';
import Product from '../../models/Product';

export default async function handler(req, res) {
  const { method } = req;

  console.log("Handler called");

  try {
    await dbConnect();
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection error:", error);
    return res.status(500).json({ success: false, message: 'Error al conectar a la base de datos' });
  }

  switch (method) {
    // Obtener todos los productos
    case 'GET':
      try {
        const products = await Product.find({});
        res.status(200).json({ success: true, data: products });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    // Crear un nuevo producto
    case 'POST':
      try {
        const product = await Product.create(req.body);
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    // Eliminar un producto por ID
    case 'DELETE':
      try {
        const { id } = req.query; // Obtener el ID del producto de la query
        if (!id) {
          return res.status(400).json({ success: false, message: 'ID is required' });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
          return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: deletedProduct });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method not allowed' });
      break;
  }
}