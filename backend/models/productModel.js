import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    brand: {type: String, required: true},
    rating: {type: Number, default: 5, required: true},
    numReviews: {type: Number, default: 0, required: true},
    stock: {type: Number, default: 0, required: true},
    desc:{type: String, default: "No se proporcionó una descripción.", required: true}
});

const Product = mongoose.model('Product', productSchema);
export default Product;