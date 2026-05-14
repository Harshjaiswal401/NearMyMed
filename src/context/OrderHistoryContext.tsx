import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
} from "firebase/firestore";
import {
  useFirebase
} from "./FirebaseContext";
import {
  getGuestId
} from "../utils/guest";

export interface OrderItem {
  id?: string;
  name: string;
  brand: string;
  price: number;
  priceDisplay: string;
  quantity: number;
  type: string;
}

export interface Order {
  id: string;
  guestId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  deliveryAddress: {
    fullName: string;
    phone: string;
    email: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    pinCode: string;
  };
  createdAt: string;
  estimatedDelivery: string;
}

interface OrderHistoryContextType {
  orders: Order[];
  addOrder: (
  order: Omit<
      Order,
      'id'
      | 'createdAt'
      | 'estimatedDelivery'
      | 'status'
      | 'guestId'
    >
  ) => Promise<string>;
  searchOrders: (
    phone?: string,
    email?: string
  ) => Promise<void>;
  getOrder: (id: string) => Order | undefined;
  cancelOrder: (id: string) => void;
  clearHistory: () => void;
}

const OrderHistoryContext = createContext<OrderHistoryContextType>({
  orders: [],
  addOrder: async () => '',
  getOrder: () => undefined,
  searchOrders: async () => {},
  cancelOrder: () => {},
  clearHistory: () => {},
});

export function OrderHistoryProvider({ children }: { children: React.ReactNode }) {
const { db } = useFirebase();

  const [orders, setOrders] =
  useState<Order[]>([]);

  //Fetch order from firestrore
    useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const guestId =
        getGuestId();

      const q = query(
        collection(db, "orders"),

        where(
          "guestId",
          "==",
          guestId
        )
      );

      const snapshot =
        await getDocs(q);

      const data =
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];

      setOrders(data);

    } catch (error) {

      console.log(error);
    }
  };
  const searchOrders =
      async (
        phone?: string,
        email?: string
      ) => {

        try {

          let q;

          // SEARCH BY PHONE
          if (phone) {

            q = query(
              collection(db, "orders"),

              where(
                "deliveryAddress.phone",
                "==",
                phone
              )
            );
          }

          // SEARCH BY EMAIL
          else if (email) {

            q = query(
              collection(db, "orders"),

              where(
                "deliveryAddress.email",
                "==",
                email
              )
            );
          }

          else {

            return;
          }

          const snapshot =
            await getDocs(q);

          const data =
            snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })) as Order[];

          setOrders(data);

        } catch (error) {

          console.log(error);
        }
    };

    const addOrder = useCallback(async (
    orderData:
      Omit<
        Order,
        'id'
        | 'createdAt'
        | 'estimatedDelivery'
        | 'status'
        | 'guestId'
      >
  ) => {

    const now =
      new Date();

    const delivery =
      new Date(
        now.getTime()
        + 4 * 60 * 60 * 1000
      );

    const newOrder = {

      ...orderData,

      guestId:
        getGuestId(),

      status:
        "confirmed",

      createdAt:
        now.toISOString(),

      estimatedDelivery:
        delivery.toISOString(),
    };

    // SAVE TO FIRESTORE
    const docRef =
      await addDoc(
        collection(db, "orders"),
        newOrder
      );

    // UPDATE UI
    setOrders(prev => [

      {
        id: docRef.id,
        ...newOrder,
      } as Order,

      ...prev
    ]);

    return docRef.id;

  }, [db]);

  const getOrder = useCallback((id: string) => {
    return orders.find(o => o.id === id);
  }, [orders]);

    const cancelOrder =
    useCallback(async (
      id: string
    ) => {

      try {

        await updateDoc(
          doc(db, "orders", id),
          {
            status:
              "cancelled"
          }
        );

        setOrders(prev =>
          prev.map(o =>
            o.id === id
              ? {
                  ...o,
                  status:
                    "cancelled"
                }
              : o
          )
        );

      } catch (error) {

        console.log(error);
      }

  }, [db]);

    const clearHistory =
    useCallback(() => {

      setOrders([]);

  }, []);

  return (
    <OrderHistoryContext.Provider value={{ orders, 
                                          addOrder, 
                                          getOrder, 
                                          cancelOrder, 
                                          clearHistory,
                                          searchOrders }}>
      {children}
    </OrderHistoryContext.Provider>
  );
}

export function useOrderHistory() {
  return useContext(OrderHistoryContext);
}
