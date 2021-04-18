import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./styles.scss";
import { getFirestore } from "../../firebase";
import firebase from "firebase/app";
import "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const cartView = () => {
  const { cart, removeItem, clear } = useContext(CartContext);

  const generarOrden = () => {
    const db = getFirestore();
    const odrdersCol = db.collection("orders");

    let orden = {};
    orden.date = firebase.firestore.Timestamp.fromDate(new Date());
    orden.buyer = { name: "juan", email: "mail@mail.com", telefono: "4643030" };
    orden.total = cart.totalPrice;
    orden.items = cart.map((cartItem) => {
      const id = cartItem.item.id;
      const title = cartItem.item.title;
      const price = cartItem.item.price * cartItem.quantity;
      return { id, title, price };
    });

    odrdersCol
      .add(orden)
      .then((idDocumento) => {
        console.log(idDocumento.id); //salio bien
      })
      .catch((err) => {
        console.log(err);
        toast.error("Ocurrio un error!!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      })
      .finally(() => {
        console.log("soy un spinner , termino la promesa");
      });

    const batch = db.batch();
    // por cada item restar del stock la cantidad de el carrito
    for (const cartItem of cart) {
      const docRef = db.collection("items").doc(cartItem.item.id);
      batch.update(docRef, {
        stock: cartItem.item.stock - cartItem.quantity,
      });
    }
    batch.commit().then((res) => {
      console.log("resultado batch:", res);
    });
    toast.success("Tu compra fue exitosa!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const noItemComp = (
    <div className="contcart">
      <h2 className="titulo">
        No hay Items en el carrito
        <Link className="gotohome" to="/">
          Ir al home
        </Link>
      </h2>
    </div>
  );

  return cart.length <= 0 ? (
    noItemComp
  ) : (
    <div className="cartview">
      {cart?.map((cartItem) => {
        return (
          <div key={cartItem?.item.id}>
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
        <button className="confirmar" onClick={generarOrden}>
          Finalizar Compra
        </button>
        <button className="borrartodo" onClick={clear}>
          Borrar todo
        </button>
      </p>
      <ToastContainer />
    </div>
  );
};

export default cartView;
