import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import api from "../../services/api";
import "./newOrder.css";
import pixLogo from "../../assets/pix.png";

export default function NewOrder() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    const [userStepDone, setUserStepDone] = useState(false);
    const [loadingUser, setLoadingUser] = useState(false);
    const [userNotFound, setUserNotFound] = useState(false);

    const [userName, setUserName] = useState("");
    const [userData, setUserData] = useState(null);

    const [paymentType, setPaymentType] = useState("");
    const [orderId, setOrderId] = useState(null);
    const [orderTotal, setOrderTotal] = useState(0);
    const [orderDeliveryFee, setOrderDeliveryFee] = useState(0);
    const [orderFinalAmount, setOrderFinalAmount] = useState(0);
    const [orderSent, setOrderSent] = useState(false);
    const deliveryFee = 5;



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/getProducts");
                if (response.data && response.data.products) {
                    setProducts(response.data.products);
                } else {
                    console.warn("Nenhum produto encontrado");
                }
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProducts();
    }, []);


    useEffect(() => {
        const totalPrice = cart.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setTotal(totalPrice);
    }, [cart]);

    const addToCart = (product) => {
        const existing = cart.find((item) => item.id === product.id);
        if (existing) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const removeFromCart = (id) => {
        const updated = cart
            .map((item) =>
                item.id === id ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0);
        setCart(updated);
    };

    const handleContinueUser = async () => {
        if (!userName) {
            alert("Por favor, insira o nome de usuário.");
            return;
        }
        setLoadingUser(true);
        setUserNotFound(false);
        try {
            const response = await api.post("/getUserInfo", { username: userName });
            setUserData(response.data);
            setUserStepDone(true);
        } catch (error) {
            console.error("Erro ao buscar usuário:", error);
            setUserNotFound(true);
        } finally {
            setLoadingUser(false);
        }
    };

    const handleConfirmOrder = async () => {
        if (cart.length === 0) {
            alert("Seu carrinho está vazio!");
            return;
        }
        if (!paymentType) {
            alert("Escolha uma forma de pagamento.");
            return;
        }

        const deliveryFee = 5;
        const totalAmount = total + deliveryFee;

        const payload = {
            userId: userData.id,
            total,
            paymentType,
            deliveryFee,
            totalAmount,
            items: cart.map((item) => ({
                name: item.name,
                amount: item.quantity,
                price: item.price,
            })),
        };

        try {
            const response = await api.post("/newOrder", payload);

            console.log("Pedido criado:", response.data);
            setOrderId(response.data.orderId);
            setOrderTotal(total);
            setOrderDeliveryFee(deliveryFee);
            setOrderFinalAmount(totalAmount);
            setOrderSent(true);
            setCart([]);
        } catch (error) {
            console.error("Erro ao enviar pedido:", error);
        }
    };



    return (
        <div className="newOrderContainer">
            <Header />
            <div className="newOrderBody">
                {orderSent ? (
                    <div className="successScreen">
                        <h2>Pedido realizado com sucesso!</h2>
                        <p>Seu pedido está sendo preparado 🍞</p>

                        {orderId && (
                            <div className="orderSummaryBox">
                                <p className="orderIdText">
                                    <strong>ID do Pedido:</strong> #{orderId}
                                </p>
                                <p>
                                    <strong>Subtotal:</strong> R$ {orderTotal.toFixed(2)}
                                </p>
                                <p>
                                    <strong>Frete:</strong> R$ {orderDeliveryFee.toFixed(2)}
                                </p>
                                <p className="totalFinalText">
                                    <strong>Total Final:</strong> R$ {orderFinalAmount.toFixed(2)}
                                </p>
                            </div>
                        )}

                        <p>Guarde esse número para acompanhamento!</p>
                    </div>
                ) : (
                    <>
                        <h2>Faça seu pedido</h2>

                        <div className="productsContainer">
                            {products.map((product) => (
                                <div key={product.id} className="productCard">
                                    <img src={product.image} alt={product.name} />
                                    <h3>{product.name}</h3>
                                    <p>R$ {product.price.toFixed(2)}</p>
                                    <button onClick={() => addToCart(product)}>
                                        Adicionar
                                    </button>
                                </div>
                            ))}
                        </div>


                        <div className="cartContainer">
                            <h3>Carrinho</h3>
                            {cart.length === 0 ? (
                                <p>Seu carrinho está vazio</p>
                            ) : (
                                <ul>
                                    {cart.map((item) => (
                                        <li key={item.id}>
                                            {item.name} x {item.quantity} - R${" "}
                                            {(item.price * item.quantity).toFixed(2)}
                                            <button
                                                className="removeBtn"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                -
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <div className="totalBox">
                                <div className="totalBox">
                                    <p><strong>Pedido:</strong> R$ {total.toFixed(2)}</p>
                                    <p><strong>Frete:</strong> R$ {deliveryFee.toFixed(2)}</p>
                                    <p>
                                        <strong>Total:</strong> R$ {(total + deliveryFee).toFixed(2)}
                                    </p>
                                </div>

                            </div>

                            {!userStepDone && (
                                <div className="userStep">
                                    <h4>Identifique-se</h4>
                                    <input
                                        type="text"
                                        placeholder="Nome de usuário"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                    <button
                                        className="continueBtn"
                                        onClick={handleContinueUser}
                                        disabled={loadingUser}
                                    >
                                        {loadingUser ? "Buscando..." : "Continuar"}
                                    </button>

                                    {userNotFound && (
                                        <p className="errorText">Usuário não encontrado.</p>
                                    )}
                                </div>
                            )}

                            {userStepDone && userData && (
                                <div className="userInfoBox">
                                    <h4>Informações do Usuário</h4>
                                    <p>
                                        <strong>Nome:</strong> {userData.first_name}{" "}
                                        {userData.surname}
                                    </p>
                                    <p>
                                        <strong>Endereço:</strong> {userData.address},{" "}
                                        {userData.address_number}
                                    </p>
                                    <p>
                                        <strong>CEP:</strong> {userData.zip_code}
                                    </p>
                                    <p>
                                        <strong>Usuário:</strong> {userData.username}
                                    </p>
                                </div>
                            )}

                            {userStepDone && (
                                <div className="paymentSection">
                                    <h4>Forma de Pagamento</h4>
                                    <div className="paymentOptions">
                                        <button
                                            className={`paymentBtn ${paymentType === "pix" ? "selected" : ""
                                                }`}
                                            onClick={() => setPaymentType("pix")}
                                        >
                                            <img className="pixLogo" src={pixLogo} alt="Pix" />
                                            Pix
                                        </button>

                                        <button
                                            className={`paymentBtn ${paymentType === "entrega" ? "selected" : ""
                                                }`}
                                            onClick={() => setPaymentType("entrega")}
                                        >
                                            💵 Pagar na entrega
                                        </button>
                                    </div>

                                    {paymentType === "pix" && (
                                        <div className="pixBox">
                                            <p>Escaneie o QR Code abaixo para pagar:</p>
                                            <img
                                                src={`https://api.qrserver.com/v1/create-qr-code/?data=Padaria%20Sabor%20da%20Casa%20-%20Pedido%20R$%20${total.toFixed(
                                                    2
                                                )}&size=180x180`}
                                                alt="QR Code Pix"
                                                className="pixQr"
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {userStepDone && (
                                <button className="confirmBtn" onClick={handleConfirmOrder}>
                                    Confirmar Pedido
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}
