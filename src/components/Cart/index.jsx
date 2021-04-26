import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import "./styles.scss";
//firebase
import firebase from "firebase/app";
import { getFirestore } from "../../firebase";
import "firebase/firestore";
//toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export const CartView = () => {
  const [user, setUser] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [idOrden, setIdOrden] = useState(null);
  //contexto
  const { cart, removeItem, clear } = useContext(CartContext);

  const guardarOrden = (e) => {
    e.preventDefault();
    const db = getFirestore();
    const ordersCollection = db.collection("orders");

    const date = firebase.firestore.Timestamp.fromDate(new Date());
    const items = cart.map((cartItem) => {
      return {
        id: cartItem.item.id,
        title: cartItem.item.title,
        price: cartItem.item.price,
      };
    });

    ordersCollection
      .add({ buyer: user, items, date, total: cart.totalPrice })
      .then((doc) => {
        setIdOrden(doc.id);
      });

    //Actualiza Stock
    cart.forEach((element) => {
      db.collection("items")
        .doc(element.item.id)
        .update({ stock: element.item.stock - element.quantity });
    });

    toast.success("Tu compra fue exitosa!", {
      position: "bottom-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const noItemComp = (
    <div className="contcart">
      <div className="conttext">
        <h2 className="titulo">
          No hay Items en el carrito
          <p></p>
          <Link className="gotohome" to="/">
            Ir al home
          </Link>
        </h2>
      </div>
    </div>
  );
  const handleUser = (e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  };
  return cart.length <= 0 ? (
    noItemComp
  ) : (
    <div className="cart__view">
      <div>
        {cart?.map((cartItem) => {
          return (
            <div key={cartItem?.item.id} className="cart__container">
              <table className="tabla">
                <thead>
                  <tr>
                    <th className="tabla__title">Imagen</th>
                    <th className="tabla__title">Nombre</th>
                    <th className="tabla__title">Precio</th>
                    <th className="tabla__title">Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        className="tabla__img"
                        alt="producto"
                        src={cartItem?.item?.pictureUrl}
                      />
                    </td>
                    <td className="tabla__info">{cartItem?.item?.title}</td>
                    <td className="tabla__info">${cartItem?.item?.price}</td>
                    <td className="tabla__info">{cartItem?.quantity}</td>
                    <td>
                      <button
                        className="borrar"
                        onClick={() => removeItem(cartItem.item.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
      <div>
        {idOrden && (
          <h2>
            Orden generada:
            <span className="orden__exitosa"> {idOrden}</span>
          </h2>
        )}
        <h2>Formulario</h2>
        <form action="" onSubmit={guardarOrden}>
          <label>Nombre:</label>
          <input
            placeholder="Nombre"
            type="text"
            value={user.name}
            required
            name="name"
            onChange={handleUser}
          />
          <label>Telefono:</label>
          <input
            placeholder="(0223)6078311"
            type="text"
            value={user.phone}
            required
            name="phone"
            onChange={handleUser}
          />
          <label>Email:</label>
          <input
            type="email"
            placeholder="Mail@mail.com"
            value={user.email}
            required
            name="email"
            onChange={handleUser}
          />

          <div className="buttons">
            <p>
              <button type="submit" className="confirmar">
                Generar orden
              </button>
            </p>
            <p>
              <button className="borrartodo" onClick={clear}>
                Borrar todo
              </button>
            </p>
          </div>
        </form>
        <span className="total">Total: ${cart?.totalPrice}</span>
      </div>
    </div>
  );
};

export default CartView;
