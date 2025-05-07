# Smokers Haven Inventory

A responsive inventory management system tailored for Smokers Haven, designed to streamline product tracking, monitor expiry dates, and provide stock level alerts.

## Features

* **Product Tracking**: Maintain detailed records of all products.
* **Expiry Date Monitoring**: Keep track of product expiration to ensure freshness.
* **Stock Level Alerts**: Receive notifications when stock levels fall below predefined thresholds.

## Live Demo

Experience the application live at: [sh-stock-tracking.vercel.app](https://sh-stock-tracking.vercel.app)

## Project Structure

```
sh-stock-tracking/
├── public/                 # Static assets (images, icons, etc.)
├── src/                    # Source code
│   ├── components/         # Reusable React components
│   ├── pages/              # Next.js pages
│   ├── styles/             # CSS/SCSS stylesheets
│   └── utils/              # Utility functions and helpers
├── .gitignore              # Specifies files to ignore in Git
├── README.md               # Project documentation
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript compiler configuration
└── vercel.json             # Vercel deployment configuration
```

## Technologies Used

* **Next.js**: React framework for server-side rendering and static site generation.
* **TypeScript**: Typed superset of JavaScript for enhanced code quality.
* **CSS**: Styling of components and layouts.

## Getting Started

To set up the project locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rob2rhyme/sh-stock-tracking.git
   cd sh-stock-tracking
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Importing Categories via JSON

You can add new product categories and their items by uploading a properly formatted JSON file using the **Import JSON** button on the main page (next to the **Clear** button). Only files matching the format below will be accepted.

### Required JSON Shape

```json
{
  "name": "My New Category",
  "products": [
    {
      "flavor": "Vanilla Dream",
      "store": 12,
      "home": 4,
      "expiryDate": "2025-07-15"
    },
    {
      "flavor": "Mint Blast",
      "store": 8,
      "home": 2,
      "expiryDate": "2025-08-01"
    }
    // …more products…
  ]
}
```

* **`name`** (string): the category label.
* **`products`** (array): list of product objects, each with:

  * **`flavor`** (string)
  * **`store`** (number)
  * **`home`** (number)
  * **`expiryDate`** (string in `YYYY-MM-DD` format)

Invalid files (wrong types, missing fields, or extra keys) will be rejected with an error message.

## Suggested Additional Features

To enhance the functionality and user experience of the inventory system, consider implementing the following features:

* **User Authentication**: Secure login system to manage access control.
* **Role-Based Access Control (RBAC)**: Differentiate permissions between admins, managers, and staff.
* **Barcode Scanning Integration**: Facilitate quick product entry and retrieval using barcode scanners.
* **Inventory Reports**: Generate downloadable reports (PDF/CSV) for stock analysis.
* **Real-Time Notifications**: Implement alerts for low stock or upcoming expirations via email or in-app notifications.
* **Audit Logs**: Track changes made to inventory for accountability.
* **Mobile Responsiveness**: Optimize the application for mobile devices to allow on-the-go access.
* **Search and Filter Functionality**: Enhance product lookup with advanced search and filtering options.
* **Integration with Suppliers**: Automate restocking by connecting with supplier APIs.
* **Dashboard Analytics**: Visual representations of inventory trends and statistics.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
