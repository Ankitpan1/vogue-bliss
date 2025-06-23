import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Instagram, Facebook } from "lucide-react";

export default function VogueBliss() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTQpXqFVmKEXAMPLE12345/pub?output=csv"
    )
      .then((res) => res.text())
      .then((data) => {
        const rows = data.split("\n").slice(1);
        const parsed = rows.map((row, index) => {
          const [name, description, price, imageUrl] = row.split(",");
          return {
            id: index + 1,
            name,
            description,
            price: parseFloat(price),
            imageUrl: imageUrl?.trim(),
          };
        });
        setProducts(parsed);
      });
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Vogue Bliss Logo" className="h-10 w-10" />
          <h1 className="text-2xl font-bold">Vogue Bliss</h1>
        </div>
        <nav className="space-x-4 hidden md:block">
          <a href="#home" className="hover:text-pink-400">Home</a>
          <a href="#shop" className="hover:text-pink-400">Shop</a>
          <a href="#about" className="hover:text-pink-400">About</a>
          <a href="#contact" className="hover:text-pink-400">Contact</a>
        </nav>
        <div className="relative cursor-pointer hover:text-pink-400">
          <ShoppingCart />
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1">
            {cart.length}
          </span>
        </div>
      </header>

      {/* Hero Section with Banner */}
      <section id="home" className="text-center">
        <img
          src="/hero-banner.jpg"
          alt="Vogue Bliss Banner"
          className="w-full h-64 object-cover md:h-96"
        />
        <div className="p-6 md:p-10">
          <h2 className="text-4xl font-bold mb-4">Welcome to Vogue Bliss</h2>
          <p className="text-lg">Luxury & Modern Fashion for Men & Women</p>
          <Button className="mt-6 bg-black text-white hover:bg-gray-800">Explore Collection</Button>
        </div>
      </section>

      {/* Shop Section with Images */}
      <section id="shop" className="p-6 md:p-10 bg-gray-50">
        <h3 className="text-3xl font-semibold mb-6 text-center">New Arrivals</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="rounded-2xl shadow-md">
              <CardContent className="p-4">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-48 w-full object-cover rounded mb-4"
                  />
                ) : (
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                )}
                <h4 className="text-xl font-medium">{product.name}</h4>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-lg font-semibold text-pink-600">₹{product.price}</p>
                <Button
                  className="mt-4 bg-pink-500 hover:bg-pink-600 w-full text-white"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Cart Summary */}
      {cart.length > 0 && (
        <section className="p-6 bg-white border-t border-gray-200">
          <h3 className="text-2xl font-semibold mb-4">🛒 Your Cart</h3>
          <ul className="space-y-2">
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between">
                <span>{item.name}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right text-xl font-bold">Total: ₹{getTotal()}</div>
          <a
            href="https://rzp.io/l/demo-payment"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
              Proceed to Payment
            </Button>
          </a>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="p-6 md:p-10 bg-white">
        <h3 className="text-3xl font-semibold mb-4">About Us</h3>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Vogue Bliss ek modern aur luxurious clothing brand hai jahan fashion milta hai elegance se.
          Humare designs specially curated hain men aur women dono ke liye jo chahte hain stylish aur premium look.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="p-6 md:p-10 bg-gray-50">
        <h3 className="text-3xl font-semibold mb-4">Get in Touch</h3>
        <div className="flex justify-center space-x-6">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Instagram className="w-6 h-6 text-pink-500" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Facebook className="w-6 h-6 text-blue-600" />
          </a>
        </div>
        <p className="text-center mt-4">आप हमें Instagram और Facebook पर फॉलो कर सकते हैं।</p>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white p-4 text-center">
        <p>&copy; 2025 Vogue Bliss. All rights reserved.</p>
      </footer>
    </div>
  );
}
