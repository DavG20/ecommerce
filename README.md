# Modern E-commerce React Application

A beautiful, responsive e-commerce website built with React, Vite, and Tailwind CSS. This application showcases modern web development practices with a focus on user experience and performance.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Product Catalog**: Browse products with filtering and sorting options
- **Product Details**: Comprehensive product pages with image galleries and reviews
- **Shopping Cart**: Full cart functionality with quantity management
- **Responsive Design**: Mobile-first approach that works on all devices
- **Fast Performance**: Built with Vite for optimal development and build times
- **Routing**: Client-side routing with React Router
- **Icons**: Beautiful icons from Heroicons

## 🛠️ Tech Stack

- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Heroicons** - Beautiful SVG icons
- **Headless UI** - Accessible UI components

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/DavG20/ecommerce.git
   cd ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation bar
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── Products.tsx    # Product listing
│   ├── ProductDetail.tsx # Individual product page
│   └── Cart.tsx        # Shopping cart
├── App.tsx             # Main application component
├── index.css           # Global styles with Tailwind
├── data/
│   └── products.ts     # Product data and helpers
└── main.tsx           # Application entry point
```

## 🎨 Pages & Features

### Home Page (`/`)
- Hero section with call-to-action
- Featured products showcase
- Category browsing
- Newsletter subscription

### Products Page (`/products`)
- Product grid/list view toggle
- Category filtering
- Price and rating sorting
- Pagination

### Product Detail Page (`/product/:id`)
- Product image gallery
- Detailed product information
- Customer reviews
- Related products
- Add to cart functionality

### Shopping Cart (`/cart`)
- Cart item management
- Quantity controls
- Price calculations
- Checkout process

