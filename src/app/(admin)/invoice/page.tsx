import React from "react";

export default function Invoice() {
  return (
    <div className="p-6 dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Invoice</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6 dark:bg-gray-700">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold dark:text-white">From</h2>
            <p className="dark:text-gray-300">Zain Geidt</p>
            <p className="dark:text-gray-300">1280, Clair Street, Massachusetts, New York - 02543</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold dark:text-white">To</h2>
            <p className="dark:text-gray-300">Albert Ward</p>
            <p className="dark:text-gray-300">355, Shobe Lane, Colorado, Fort Collins - 80543</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="dark:text-gray-300"><strong>Issued On:</strong> 11 March, 2027</p>
          <p className="dark:text-gray-300"><strong>Due On:</strong> 16 March, 2027</p>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2 dark:border-gray-600 dark:text-white">Product</th>
              <th className="border p-2 dark:border-gray-600 dark:text-white">Quantity</th>
              <th className="border p-2 dark:border-gray-600 dark:text-white">Unit Cost</th>
              <th className="border p-2 dark:border-gray-600 dark:text-white">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">TailGrids</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">1</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">$48</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">$48</td>
            </tr>
            <tr>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">GrayGrids</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">4</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">$300</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">$1200</td>
            </tr>
            <tr>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">Uideck</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">2</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">$800</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">$1600</td>
            </tr>
            <tr>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">FormBold</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">2</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">$125</td>
              <td className="border p-2 dark:border-gray-600 dark:text-gray-300">$250</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <p className="dark:text-gray-300"><strong>Sub Total amount:</strong> $3,098</p>
          <p className="dark:text-gray-300"><strong>Vat (10%):</strong> $312</p>
          <p className="dark:text-gray-300"><strong>Total:</strong> $3,410</p>
        </div>
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded dark:bg-blue-600">Proceed to payment</button>
          <button className="ml-2 bg-gray-500 text-white px-4 py-2 rounded dark:bg-gray-600">Print</button>
        </div>
      </div>
    </div>
  );
} 