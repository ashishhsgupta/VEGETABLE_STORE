import React from 'react'
import { SnackbarProvider } from "notistack"
import { Outlet } from 'react-router-dom'
import Header from "./Header";
import Footer from './../Footer/Footer';
import GlobalContextProvider from './../Router/GlobalContextProvider';



export default function DefaultLayout () {
  return (
    <>
      <SnackbarProvider hideIconVariant autoHideVariant={2000}>
        <GlobalContextProvider>
        <Header />
        <Outlet />
        <Footer />
        </GlobalContextProvider>
      </SnackbarProvider>
    </>
  )
}

