# Personal Wallet UI Design

This project is a front-end implementation of a personal finance wallet application dashboard, built with Next.js, React, and Tailwind CSS, utilizing shadcn/ui components. It provides a user-friendly interface to view financial status, manage transactions, and simulate fund transfers and card management.

## ✨ Features

*   **Dashboard Overview**:
    *   Clearly displays current total account balance with a visibility toggle.
    *   Visual representation of income vs. expenses for a recent period.
    *   Spending breakdown by common categories with progress bars.
    *   Quick actions for "Send Money" and "Request Money".
*   **Transactions History**:
    *   Lists recent transactions with Date, Description/Recipient, Category, Amount, and Status.
    *   Includes basic filtering by search term and category.
*   **Fund Transfer Flow**:
    *   Multi-step process for transferring funds to another account.
    *   Recipient selection (mock contacts, ability to add new recipient).
    *   Amount input and confirmation screen.
    *   Success/failure feedback.
*   **Add Money Modal**:
    *   Simulates adding funds via Debit/Credit Card, Bank Transfer, or Mobile Payment.
    *   Displays processing fees and times.
*   **Add Card Modal**:
    *   Simulates adding new debit/credit cards with live preview.
    *   Includes card type detection and input formatting.
    *   Option to set as default card.
*   **Card Management**:
    *   Dedicated tab to view and manage all saved payment cards.
    *   Options to set default card and remove cards.
*   **Responsive Design**: Adapts to various screen sizes, from mobile to desktop.

## 🚀 How to Run Locally

To get this project up and running on your local machine, follow these steps:

### 1. Download the Project

The easiest way to get the complete project is to use the **"Download Code"** button provided in the v0 interface. This will set up a new Next.js project with all the necessary files and configurations.

Alternatively, if you have access to the project files directly:

```bash
# If you downloaded a zip file, extract it first
unzip personal-wallet-ui.zip
cd personal-wallet-ui
```

### 2. Install Dependencies

Navigate into the project directory and install the required Node.js dependencies using npm or yarn:

```bash
cd personal-wallet-ui # If you're not already in the directory
npm install
# or
yarn install
```

### 3. Run the Development Server

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
# or
yarn dev
```

### 4. Open in Your Browser

After the development server starts, open your web browser and visit:

```
http://localhost:3000
```

You should now see the Personal Wallet UI dashboard running locally!

## 🛠️ Technologies Used

*   **Next.js 14**: React framework for building full-stack web applications.
*   **React**: JavaScript library for building user interfaces.
*   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
*   **shadcn/ui**: Reusable UI components built with Radix UI and Tailwind CSS.
*   **Lucide React**: Beautifully crafted open-source icons.

## 💡 Design Philosophy

The design adheres to a "Confident Clarity" theme, emphasizing a clean, minimalist aesthetic with a focus on user trust and intuitive interaction. Blue gradients are used to convey security, while clear typography and card-based layouts ensure information is easily digestible. Responsive design principles are applied throughout to provide a seamless experience across devices.
```

