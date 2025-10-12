const { createClient } = require('@supabase/supabase-js')

const createNewOrder = async (req, res) => {
    const { userId, total, paymentType, deliveryFee, totalAmount, items } = req.body;

    const supabaseUrl = "https://jakxpiuwyghcgbhtzdku.supabase.co";
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = await createClient(supabaseUrl, supabaseKey);

    try {
        const { data: orderData, error: orderError } = await supabase
            .from("orders")
            .insert({
                user_id: userId,
                amount: total,
                payment_type: paymentType,
                delivery_fee: deliveryFee,
                total_amount: totalAmount,
            })
            .select("id")
            .single();

        if (orderError) throw orderError;
        const orderId = orderData.id;
        console.log("Novo pedido criado com ID:", orderId);

        const itemsToInsert = items.map((item) => ({
            order_id: orderId,
            user_id: userId,
            name: item.name,
            amount: item.quantity,
            price: item.price,
        }));

        const { error: itemsError } = await supabase.from("orders_items").insert(itemsToInsert);
        if (itemsError) throw itemsError;

        res.status(200).send({
            message: "Pedido e itens criados com sucesso!",
            orderId,
        });
    } catch (err) {
        console.error("Erro ao criar pedido:", err);
        res.status(400).send(err);
    }
};




const getProducts = async (req, res) => {
    const supabaseUrl = 'https://jakxpiuwyghcgbhtzdku.supabase.co'
    const supabaseKey = process.env.SUPABASE_KEY
    const supabase = await createClient(supabaseUrl, supabaseKey)
    try {
        console.log("Procurando produtos")
        const { data, error } = await supabase
            .from('items')
            .select()
        console.log(data)
        res.send({ products: data })
    } catch (err) {
        console.log(err)
    }
}

module.exports = { createNewOrder, getProducts }

