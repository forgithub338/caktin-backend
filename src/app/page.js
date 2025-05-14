"use client";
import { useState, useEffect } from "react";

const getAmount = async () => {
  const res = await fetch("/api/getAmount");
  const data = await res.json();
  console.log(data);
};

export default function Home() {
  useEffect(() => {
    getAmount();
  }, []);
  return <div>Home</div>;
}

