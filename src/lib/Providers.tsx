"use client"
import { store } from "@/redux/store";
import { NextUIProvider } from "@nextui-org/react";
import * as React from "react";
import { Provider } from "react-redux";

export default function Providers({ children}:{ children: React.ReactNode } ) {
  // 2. Wrap NextUIProvider at the root of your app
  return (
    //   <UserProvider>
    <Provider store={store}>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <NextUIProvider>
          {children}
      </NextUIProvider>
    {/* </PersistGate> */}
  </Provider>
    //    </UserProvider>
  );
}