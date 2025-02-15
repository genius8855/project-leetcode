"use client"; // Ensure it's a Client Component

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider() {
  return <ToastContainer position="top-right" autoClose={5000} />;
}
