# Portfolio Dashboard

A React-based portfolio management dashboard that displays financial statistics and charts from Excel data.

## Features

- **Home Page**: Blog posts and company information
- **Portfolio Page**: Financial dashboard with charts and statistics
- **Excel Data Import**: Upload NAV data to generate charts
- **Professional UI**: Clean, modern design matching financial dashboards

## How to Run

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to `http://localhost:3000`

## Usage

### Home Page
- View blog posts and company information
- Navigate using the sidebar menu

### Portfolio Page
1. Click "Portfolio" in the sidebar
2. Upload your Excel file with NAV data
   - File should have columns: "NAV Date" and "NAV value in Rs."
3. View generated charts and statistics:
   - Trailing Returns table
   - Equity Curve chart
   - Drawdown chart

## Excel File Format

Your Excel file should contain:
- **Column 1**: NAV Date (in any date format)
- **Column 2**: NAV value in Rs. (numeric values)

## Technologies Used

- React 18
- React Router DOM
- Recharts (for charts)
- XLSX (for Excel parsing)

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (not recommended)

## Project Structure

```
portfolio-dashboard/
├── public/
├── src/
│   ├── App.js          # Main application component
│   ├── App.css         # Application styles
│   └── index.js        # Application entry point
├── package.json
└── README.md
```
