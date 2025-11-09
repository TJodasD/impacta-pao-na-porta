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

const getOrdersByUserId = async (req, res) => {
    const { userId } = req.body;

    const supabaseUrl = "https://jakxpiuwyghcgbhtzdku.supabase.co";
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = await createClient(supabaseUrl, supabaseKey);

    try {
        console.log(`Buscando pedidos do usuário ID: ${userId}`);

        const { data: ordersData, error: ordersError } = await supabase
            .from("orders")
            .select("id, created_at, amount, payment_type, delivery_fee, total_amount, status")
            .eq("user_id", userId)
            .order("created_at", { ascending: false });

        if (ordersError) throw ordersError;

        if (!ordersData || ordersData.length === 0) {
            console.log("Nenhum pedido encontrado para o usuário.");
            return res.status(200).send({ orders: [] });
        }

        const orderIds = ordersData.map((o) => o.id);
        const { data: itemsData, error: itemsError } = await supabase
            .from("orders_items")
            .select("order_id, name, amount, price")
            .in("order_id", orderIds);

        if (itemsError) throw itemsError;

        const ordersWithItems = ordersData.map((order) => {
            const items = itemsData.filter((item) => item.order_id === order.id);
            return { ...order, items };
        });

        console.log(`${ordersWithItems.length} pedido(s) retornado(s).`);
        console.log(ordersWithItems)
        res.status(200).send({ orders: ordersWithItems });
    } catch (err) {
        console.error("Erro ao buscar pedidos:", err);
        res.status(400).send(err);
    }
};

const cancelOrder = async (req, res) => {
    const { orderId } = req.body;

    const supabaseUrl = "https://jakxpiuwyghcgbhtzdku.supabase.co";
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabase = await createClient(supabaseUrl, supabaseKey);
    try {
        console.log(`Cancelando pedido ID: ${orderId}`);

        const { data, error } = await supabase
            .from("orders")
            .update({ status: "cancelled" })
            .eq("id", orderId)
            .select("id, status")
            .single();

        if (error) throw error;

        res.status(200).send({
            message: "Pedido cancelado com sucesso!",
            order: data,
        });
    } catch (err) {
        console.error("Erro ao cancelar pedido:", err);
        res.status(400).send({ message: "Erro ao cancelar pedido", error: err });
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

module.exports = { createNewOrder, getProducts, getOrdersByUserId, cancelOrder }

