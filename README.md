open 2 cmd 
one for https://github.com/Kaepilz/eBay.git
another https://github.com/Kaepilz/ghar-joy.git 

pull code from this https://github.com/Kaepilz/ghar-joy.git  and push to this https://github.com/Kaepilz/eBay.git

when you make any changes push to both repos 


# ShoppingGhar - Nepal's E-Commerce Marketplace

A modern, vibrant e-commerce platform for buying and selling in Nepal. Built with React, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Beautiful UI**: Orange-themed design with smooth animations
- **Gamified Experience**: Spin-to-win promotional wheel
- **Product Browsing**: Category filtering, sorting, and search
- **Shopping Cart**: Full cart management with coupon system
- **Responsive Design**: Mobile-first, works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Seller Hub**: Platform for sellers to list products
- **Service Hub**: Customer support and help center

## 🎨 Design System

- **Primary Color**: Orange (#FF6A00) - vibrant and energetic
- **Theme**: Warm, trustworthy, modern
- **Animations**: Framer Motion for smooth micro-interactions
- **Components**: Built on shadcn/ui with custom variants

## 📦 Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing fast builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **React Router** for navigation
- **shadcn/ui** component library

## 🛠️ Getting Started

**URL**: https://lovable.dev/projects/6c2347bf-e477-44e3-bce5-818a50a5f62b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/6c2347bf-e477-44e3-bce5-818a50a5f62b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## 📱 Pages

- `/` - Homepage with hero, categories, and featured products
- `/products` - Product listing with filters and sorting
- `/product/:id` - Detailed product page
- `/cart` - Shopping cart with checkout
- `/sell` - Seller registration and onboarding
- `/service-hub` - Customer support center
- `/about` - About ShoppingGhar
- `/login` - Authentication (demo UI)

## 🎯 Mock Data

All product data is stored locally in `src/lib/mockData.ts`:
- 12 sample products across multiple categories
- Product properties: id, title, price, condition, images, seller, rating, inventory
- 6 product categories with icons

## 🎨 Key Components

- `Header` - Navigation with search, cart count, theme toggle
- `Footer` - Links, social icons, company info
- `ProductCard` - Animated product tile with add-to-cart
- `GamifiedSpinner` - Promotional spin wheel with rewards
- `SearchBar` - Prominent search functionality
- `ThemeToggle` - Light/dark mode switcher
- `CartContext` - Global cart state with localStorage persistence

## 🔧 Customization

### Design Tokens
Edit `src/index.css` to change:
- Primary/brand colors
- Spacing and radius
- Typography

### Tailwind Config
Modify `tailwind.config.ts` for:
- Breakpoints
- Custom utilities
- Animation timings

## 🚀 Technologies

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Framer Motion

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/6c2347bf-e477-44e3-bce5-818a50a5f62b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
