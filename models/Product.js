import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide an data'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide an data.'],
  },
  price: {
    type: String,
    required: [true, 'Please provide an data.'],
  },
  size: {
    type: String,
    required: [true, 'Please provide an data.'],
  },
  stock: {
    type: Number,
    required: [true, 'Please provide an data.'],
  },
  price: {
    type: String,
    required: [true, 'Please provide an data.'],
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);