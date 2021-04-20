import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import "./styles.scss";
import firebase from "firebase/app";
import { getFirestore } from "../../firebase";
import "firebase/firestore";
//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export const cartView = () => {
  //estados
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [setIdOrden] = useState(null);
  //contexto
  const { cart, removeItem, clear } = useContext(CartContext);

  const guardarOrden = () => {
    const comprador = { name, phone, email };
    console.log(comprador);

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

    console.log(items);
    ordersCollection
      .add({ buyer: comprador, items, date, total: cart.totalPrice })
      .then((doc) => {
        setIdOrden(doc.id);
      });

    const itemsCollection = db.collection("items").where(
      firebase.firestore.FieldPath.documentId(),
      "in",
      cart.map((e) => e.item.id)
    );

    itemsCollection.get().then((result) => {
      const batch = db.batch();

      for (const documento of result) {
        const stockActual = documento.data().stock;

        const itemDelCart = cart.find(
          (cartItem) => cartItem.item.id === documento.id
        );

        const cantidadComprado = itemDelCart.quantity;

        const nuevoStock = stockActual - cantidadComprado;

        batch.update(documento.ref, { stock: nuevoStock });
        //update
      }

      batch.commit().then(() => {
        toast.success("Tu compra fue exitosa!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
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

  return cart.length <= 0 ? (
    noItemComp
  ) : (
    <div className="cart__view">
      <div>
        <form action="" onSubmit={guardarOrden}>
          <input
            placeholder="Nombre"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="(0223)6078311"
            type="text"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="email"
            placeholder="Mail@mail.com"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <button type="submit" className="confirmar">
            Generar orden
          </button>
        </form>
      </div>
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
      <span className="total">Total: ${cart?.totalPrice}</span>
      <p>
        <button className="borrartodo" onClick={clear}>
          Borrar todo
        </button>
      </p>
      <ToastContainer />
    </div>
  );
};

export default cartView;
