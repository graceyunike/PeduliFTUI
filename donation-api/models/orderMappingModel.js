import mongoose from 'mongoose';

const orderMappingSchema = new mongoose.Schema({
    order_id: { type: String, required: true, unique: true },
    user_id: { type: String },
    campaign_id: { type: String },
    amount: { type: Number },
}, { timestamps: true });

const OrderMapping = mongoose.model('OrderMapping', orderMappingSchema);
export default OrderMapping;
