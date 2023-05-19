"use client";

import React, { useState } from "react";

import DocMinter from "../DocMinter.json";

import Loading from "react-loading";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import QRCode from "react-qr-code";

import { ethers } from "ethers";

const verify = () => {
  const [clientFileId, setClientFileId] = useState("");
  const [clientId, setClientId] = useState("");

  const [fileExist, setFileExist] = useState(false);

  const [matchClientId, setMatchClientId] = useState(false);
  const [fileType, setFileType] = useState("");
  const [clientFile, setClientFile] = useState("");
  const [clientGender, setClientGender] = useState("");
  const [mintDate, setMintDate] = useState("");
  const [fileMinter, setFileMinter] = useState("");

  const [verification, setVerification] = useState(false);

  function handleClientFileId(e) {
    console.log(e.target.value);
    setClientFileId(e.target.value);
  }

  function handleClientId(e) {
    console.log(e.target.value);
    setClientId(e.target.value);
  }

  async function verifyDocument(e) {
    e.preventDefault();
    setVerification(true);
    try {
      const provider = new ethers.providers.AlchemyProvider(
        "maticmum",
        "mrvXire3FFkkoWo_HFHsBmRpJDRh1snd"
      );
      const signer = new ethers.Wallet(
        "794544ea59d049cc26fd0607233516895afec782c05f13cf30c9c025b7f8591e",
        provider
      );

      let contract = new ethers.Contract(
        DocMinter.address,
        DocMinter.abi,
        signer
      );

      // verfiying the existence of the file
      let response = await contract.exist(clientFileId);
      console.log(response);

      if (response) {
        setFileExist(response);
        let fileDetails = await contract.getTokenInfo(clientFileId);
        console.log(fileDetails);
        if (clientId === fileDetails._userCIN) {
          setMatchClientId(response);
          setFileType(fileDetails._fileDocName);
          setClientFile(fileDetails._fileURL);
          setMintDate(fileDetails._mintDate);
          setClientGender(fileDetails._gender);
          setFileMinter(fileDetails._ownerOfNft);
          toast("File exists on blockchain!", { type: "success" });
        } else {
          toast("Please check your Id", { type: "warning" });
        }
      } else {
        setFileStatus("File not minted into blockchain");
        toast("File does not exist in blockchain!", { type: "error" });
      }
    } catch (error) {
      console.log(error);
    }
    setVerification(false);
  }

  return (
    <section>
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Document Verification
        </h2>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="clientID"
          >
            Client Id Number
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter client Id"
            type="text"
            id="clientID"
            name="clientID"
            onChange={handleClientId}
            required
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="documentId"
          >
            Document Id
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter document Id"
            type="text"
            id="documentId"
            name="documentId"
            onChange={handleClientFileId}
            required
          />
        </div>
        <div>
          <button
            onClick={verifyDocument}
            className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition-colors duration-200"
          >
            Verify Document
          </button>
        </div>
      </div>

      {verification && (
        <div className="mt-2 flex justify-center">
          <Loading type="spin" color="black" height={30} width={30} />
        </div>
      )}

      {fileExist && matchClientId ? (
        <div className="w-full mt-4 flex flex-col justify-center align-center max-w-md bg-white p-8 rounded-xl shadow-lg">
          <span>
            <p>
              {fileType} with id {clientFileId} exists in blockchain
            </p>
            <p>
              The minter of the document with Id {clientFileId} is {fileMinter}
            </p>

            <p>
              {" "}
              File with Id {clientFileId} is minted in blockchain for this
              client with Id number {clientId} who is a {clientGender}
            </p>
            <p>Minted on : {mintDate} </p>
            <a href={clientFile} target="_blank">
              Click here to download the file
            </a>

            <p>
              Or scan the QR code
              <div>
                {" "}
                <QRCode value={clientFile} size={100} />
              </div>
            </p>
          </span>
        </div>
      ) : (
        <span></span>
      )}
    </section>
  );
};

export default verify;
