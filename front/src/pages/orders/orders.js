import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import api from "../../services/api";
import "./orders.css";

export default function Orders() {
    const { state } = useLocation();
    const user = state?.user;
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const [confirmCancel, setConfirmCancel] = useState(null);
    useEffect(() => {
        if (!user) return;
        fetchOrders();
    }, [user]);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await api.post("/getOrders", { userId: user.id });
            setOrders(res.data.orders || []);
        } catch (err) {
            console.error("Erro ao buscar pedidos:", err);
            showMessage("Erro ao carregar pedidos.", "error");
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);
        setTimeout(() => {
            setMessage("");
            setMessageType("");
        }, 3000);
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await api.post("/cancelOrder", { orderId });
            showMessage("Pedido cancelado com sucesso!", "success");
            setConfirmCancel(null);
            fetchOrders();
        } catch (err) {
            console.error("Erro ao cancelar pedido:", err);
            showMessage("Erro ao cancelar o pedido.", "error");
        }
    };

    return (
        <div className="ordersContainer">
            <Header />

            <div className="ordersBody">
                <h2>Pedidos de {user?.first_name}</h2>

                {message && (
                    <div className={`feedbackMessage ${messageType}`}>
                        {message}
                    </div>
                )}

                {loading ? (
                    <p>Carregando pedidos...</p>
                ) : orders.length === 0 ? (
                    <p>Nenhum pedido encontrado.</p>
                ) : (
                    <ul className="ordersList">
                        {orders.map((o) => (
                            <li
                                key={o.id}
                                className={`orderItem ${o.status === "cancelled" ? "cancelled" : ""}`}
                                onClick={() =>
                                    setSelectedOrder(selectedOrder === o.id ? null : o.id)
                                }
                            >
                                <div className="orderHeader">
                                    <strong>Pedido #{o.id}</strong> —{" "}
                                    {new Date(o.created_at).toLocaleString("pt-BR")} —{" "}
                                    <span>R$ {o.total_amount.toFixed(2)}</span>
                                </div>

                                {o.status === "cancelled" && (
                                    <p className="cancelledTag">Cancelado</p>
                                )}

                                {selectedOrder === o.id && (
                                    <ul className="orderDetails" onClick={(e) => e.stopPropagation()}>
                                        {o.items && o.items.length > 0 ? (
                                            o.items.map((item, idx) => (
                                                <li key={idx}>
                                                    {item.amount}x {item.name} — R${" "}
                                                    {item.price.toFixed(2)}
                                                </li>
                                            ))
                                        ) : (
                                            <li>(Nenhum item cadastrado)</li>
                                        )}
                                        <li>
                                            <strong>Pagamento:</strong> {o.payment_type}
                                        </li>
                                        <li>
                                            <strong>Frete:</strong> R$ {o.delivery_fee.toFixed(2)}
                                        </li>
                                        <li>
                                            <strong>Total:</strong> R$ {o.total_amount.toFixed(2)}
                                        </li>

                                        {o.status !== "cancelled" && (
                                            confirmCancel === o.id ? (
                                                <div className="cancelConfirmBox">
                                                    <p>Tem certeza que deseja cancelar?</p>
                                                    <div className="cancelBtnsRow">
                                                        <button
                                                            className="confirmBtn"
                                                            onClick={() => handleCancelOrder(o.id)}
                                                        >
                                                            Sim, cancelar
                                                        </button>
                                                        <button
                                                            className="cancelBtnOutline"
                                                            onClick={() => setConfirmCancel(null)}
                                                        >
                                                            Voltar
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <button
                                                    className="cancelBtn"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setConfirmCancel(o.id);
                                                    }}
                                                >
                                                    Cancelar Pedido
                                                </button>
                                            )
                                        )}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <Footer />
        </div>
    );
}
