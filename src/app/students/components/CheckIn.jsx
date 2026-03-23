import React, { useState } from 'react';
import { BsQrCodeScan } from 'react-icons/bs';
import QrScanner from './QrScanner.jsx';

// Student page to scan the QR token provided by the teacher and mark attendance.
const StudentCheckIn = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Check In</h1>
        <p className="text-gray-600">
          Use your teacher's QR code to mark attendance. Keep your token inside the scanner frame
          for a moment.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
        <h2 className="font-semibold text-gray-900 mb-2">How it works</h2>
        <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
          <li>Open the QR scanner.</li>
          <li>Point the camera at the QR displayed by your teacher.</li>
          <li>Wait for the confirmation message.</li>
        </ol>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setIsScannerOpen(true)}
          className="flex-1 bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm hover:shadow"
        >
          <BsQrCodeScan className="text-xl" />
          Start QR Scanner
        </button>
      </div>

      <QrScanner isOpen={isScannerOpen} onClose={() => setIsScannerOpen(false)} />
    </div>
  );
};

export default StudentCheckIn;

