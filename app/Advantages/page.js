import React from "react";
import {
  FaShieldAlt,
  FaLock,
  FaChartLine,
  FaAudible,
  FaLockOpen,
  FaIntercom,
  FaSuitcase,
} from "react-icons/fa";

const advantages = () => {
  return (
    <div className="p-2 rounded-lg shadow-lg max-w-3xl text-center py-2">
      <h1 className=" orange_gradient head_text mb-4 text-center text-2xl sm:text-3xl md:text-4xl lg:text-4xl">
        Advantages of Zr Chain dApp
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg">
          <FaShieldAlt className="text-5xl text-orange-600 mb-4" />
          <p className="text-gray-800 text-lg font-semibold mb-2">
            Immutable Record
          </p>
          <p className="text-black">
            Once a document is minted on the blockchain, it cannot be altered or
            tampered with, providing a secure and trustworthy record.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg">
          <FaLockOpen className="text-5xl text-orange-600 mb-4" />
          <p className="text-gray-800 text-lg font-semibold mb-2">
            Transparency
          </p>
          <p className="text-black">
            All transactions and changes to the documents are visible and
            traceable, enhancing accountability and trust among users.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg">
          <FaAudible className="text-5xl text-orange-600 mb-4" />
          <p className="text-gray-800 text-lg font-semibold mb-2">
            Automation and Efficiency
          </p>
          <p className="text-black">
            The use of smart contracts allows for automatic execution of tasks,
            thereby saving time and reducing human error.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg">
          <FaLock className="text-5xl text-orange-600 mb-4" />
          <p className="text-gray-800 text-lg font-semibold mb-2">Security</p>
          <p className="text-black">
            Blockchain technology is inherently secure. Its cryptographic nature
            and consensus mechanisms make it resistant to fraudulent activities
            and hacking.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg">
          <FaIntercom className="text-5xl text-orange-600 mb-4" />
          <p className="text-gray-800 text-lg font-semibold mb-2">
            Interoperability
          </p>
          <p className="text-black">
            Documents minted on a blockchain could potentially be used across
            different systems, enhancing their accessibility and usability.
          </p>
        </div>
        <div className="flex flex-col items-center p-4 bg-gray-200 rounded-lg">
          <FaSuitcase className="text-5xl text-orange-600 mb-4" />
          <p className="text-gray-800 text-lg font-semibold mb-2">
            Reduction of Fraud
          </p>
          <p className="text-black">
            By making forgery and alteration extremely difficult, blockchain
            could significantly reduce document-related fraud.
          </p>
        </div>
      </div>
    </div>
  );
};

export default advantages;
