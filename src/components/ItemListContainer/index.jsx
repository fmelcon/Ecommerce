import React, { useEffect, useState } from "react";
import { ItemList } from "../ItemList";
import { useParams } from "react-router-dom";
import "./styles.scss";
import { getFirestore } from "../../firebase";
import Loading from "../Loading";

export default function ItemListContainer() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  const cambiarEstado = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    const db = getFirestore();
    const itemsCollection = db.collection("items");
    const filtrado = itemsCollection

      .where("categoria", "==", categoryId)
      .limit(10);
    const prom = filtrado.get();

    prom.then((snaptshot) => {
      cambiarEstado();
      if (snaptshot.size > 0) {
        setItems(
          snaptshot.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          })
        );
      }
    });
  }, [categoryId]);

  return (
    <div className="containeritems">
      {loading && <Loading />}

      {!loading && (
        <>
          <h2 className="titulo">Nuestros {categoryId}</h2>
          <ItemList items={items} />
        </>
      )}
    </div>
  );
}
