import React from "react";

export default function FullDemo() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Full Demo</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">From</h2>
            <p>Zain Geidt</p>
            <p>1280, Clair Street, Massachusetts, New York - 02543</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold">To</h2>
            <p>Albert Ward</p>
            <p>355, Shobe Lane, Colorado, Fort Collins - 80543</p>
          </div>
        </div>
        <div className="mb-4">
          <p><strong>Issued On:</strong> 11 March, 2027</p>
          <p><strong>Due On:</strong> 16 March, 2027</p>
        </div>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Product</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Unit Cost</th>
              <th className="border p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-2">TailGrids</td>
              <td className="border p-2">1</td>
              <td className="border p-2">$48</td>
              <td className="border p-2">$48</td>
            </tr>
            <tr>
              <td className="border p-2">GrayGrids</td>
              <td className="border p-2">4</td>
              <td className="border p-2">$300</td>
              <td className="border p-2">$1200</td>
            </tr>
            <tr>
              <td className="border p-2">Uideck</td>
              <td className="border p-2">2</td>
              <td className="border p-2">$800</td>
              <td className="border p-2">$1600</td>
            </tr>
            <tr>
              <td className="border p-2">FormBold</td>
              <td className="border p-2">2</td>
              <td className="border p-2">$125</td>
              <td className="border p-2">$250</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <p><strong>Sub Total amount:</strong> $3,098</p>
          <p><strong>Vat (10%):</strong> $312</p>
          <p><strong>Total:</strong> $3,410</p>
        </div>
        <div className="mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Proceed to payment</button>
          <button className="ml-2 bg-gray-500 text-white px-4 py-2 rounded">Print</button>
        </div>
      </div>
    </div>
  );
} 