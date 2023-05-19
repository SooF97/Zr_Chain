"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import Link from "next/link";

import DocMinter from "../DocMinter.json";

import { create as ipfsHttpClient } from "ipfs-http-client";

import Loading from "react-loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import connectWallet from "../../app/utils/connectWallet";
import connectedWallets from "../../app/utils/connectedWallets";

const projectId = "2MyNroGl6iLE7zAs4P4RNLzSAES";
const projectSecret = "72901dfa73bf4a41fe20077f44f2aa0b";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const adminAccess = () => {
  const [fileIsUploading, setFileIsUploading] = useState(false);
  const [fileMinted, setFileMinted] = useState(false);
  const [uploading, setUploading] = useState();
  const [connectButton, setConnectButton] = useState(false);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  const current = new Date();
  const currentDate = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()}:${current.getSeconds()}`;
  console.log(currentDate);

  const [fileType, setFileType] = useState("");
  const [clientId, setClientId] = useState("");
  const [clientGender, setClientGender] = useState("");
  const [clientFile, setClientFile] = useState("");
  const [clientFileMetadata, setClientFileMetadata] = useState("");
  const [clientFileId, setClientFileId] = useState("");

  function handleFileType(e) {
    console.log(e.target.value);
    setFileType(e.target.value);
  }

  function handleClientId(e) {
    console.log(e.target.value);
    setClientId(e.target.value);
  }

  function handleClientGender(e) {
    console.log(e.target.value);
    setClientGender(e.target.value);
  }

  // This function uploads files to IPFS
  async function uploadFileToIpfs(e) {
    setFileIsUploading(true);
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://sfnmarket.infura-ipfs.io/ipfs/${added.path}`;
      console.log(url);
      setClientFile(url);
      toast("File uploaded to IPFS!", { type: "success" });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
    setFileIsUploading(false);
  }

  // This function uploads the metadata to IPFS
  async function uploadMetadataToIpfs() {
    const fileMetadata = {
      fileType: "",
      clientFile: "",
      clientId: "",
      clientGender: "",
      mintDate: "",
    };
    // make sure that none of the fields are empty
    if (!fileType || !clientFile || !clientId || !clientGender || !currentDate)
      return;
    fileMetadata.fileType = fileType;
    fileMetadata.clientFile = clientFile;
    fileMetadata.clientId = clientId;
    fileMetadata.clientGender = clientGender;
    fileMetadata.mintDate = currentDate;

    try {
      // upload metadata to IPFS
      const data = JSON.stringify(fileMetadata);
      const added = await client.add(data, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const uri = `https://sfnmarket.infura-ipfs.io/ipfs/${added.path}`;
      console.log(uri);
      setClientFileMetadata(uri);
      return uri;
    } catch (error) {
      console.log("error uploading JSON metadata:", error);
    }
  }

  async function mintDoc() {
    setFileMinted(true);
    try {
      const documentUri = await uploadMetadataToIpfs();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(
        DocMinter.address,
        DocMinter.abi,
        signer
      );
      let transaction = await contract.createToken(
        documentUri,
        fileType,
        clientId,
        clientFile,
        clientGender,
        currentDate
      );
      await transaction.wait();
      console.log(transaction);
      let fileId = await contract.getTokenId();

      let FileId = fileId.toString();
      console.log("Document minted successfully to the blockchain!");
      toast("Congrats! Document minted successfully!", { type: "success" });
      console.log(fileId.toString());
      setClientFileId(FileId);
    } catch (error) {
      console.log(error);
    }
    setFileMinted(false);
  }

  async function connectWalletPressed() {
    setConnectButton(true);
    const response = await connectWallet();
    setAddress(response.address);
    setStatus(response.status);
    setConnectButton(false);
    if (response.address.length > 0) {
      toast("Connected successfully!", { type: "success" });
      filesMinted();
    } else {
      toast("Please install Metamask!", { type: "warning" });
    }
  }

  function walletListener() {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          filesMinted();
        } else {
          setAddress("");
        }
      });
    } else {
      return <div>Install metamask</div>;
    }
  }

  useEffect(() => {
    async function fetchData() {
      const response = await connectedWallets();
      setAddress(response);
    }

    fetchData();
    walletListener();
  }, []);

  return (
    <section className="w-full flex flex-col items-center px-4 md:px-8 lg:px-16 py-4 gap-5">
      <ToastContainer />
      <button className="outline_btn" onClick={connectWalletPressed}>
        {address.length > 0 ? (
          "Connected: " +
          String(address).substring(0, 6) +
          "..." +
          String(address).substring(38)
        ) : (
          <span>Connect wallet</span>
        )}
      </button>

      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Document Legalization (Mint)
        </h2>
        {clientFileId && (
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            File Id : {clientFileId} (Please save it)
          </h2>
        )}

        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="type"
          >
            Document type
          </label>
          <select
            id="type"
            name="type"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={handleFileType}
            required
          >
            <option value="Choose your document type">
              Choose your document type...
            </option>
            <option value="Birth certificate">Birth certificate</option>
            <option value="Real Estate certificate">
              Real Estate certificate
            </option>
            <option value="University Certificate">
              University Certificate
            </option>
            <option value="Baccalaureat">Baccalaureat</option>
            <option value="Mariage Certificate">Mariage Certificate</option>
            <option value="Rent Contract">Rent Contract</option>
            <option value="ID Card">ID Card</option>
            <option value="Driver Licence">Driver Licence</option>
            <option value="Passeport">Passeport</option>
          </select>
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700 mb-2"
            htmlFor="clientID"
          >
            Client ID Number
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter client ID"
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
            htmlFor="gender"
          >
            Client Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            onChange={handleClientGender}
            required
          >
            <option value="Choose your document type">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-2">Date :</p>{" "}
          {currentDate}
        </div>
        <div>
          <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Upload a File
            </h2>
            <div className="flex items-center justify-between border border-gray-300 px-4 py-2 rounded-md">
              <label className="bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-500 transition-colors duration-200">
                {clientFile ? <p>Uploaded</p> : <span>Choose File</span>}
                <input
                  type="file"
                  className="hidden"
                  onChange={uploadFileToIpfs}
                />
              </label>
              {fileIsUploading && (
                <div className="mt-2 flex justify-center">
                  <Loading type="spin" color="black" height={30} width={30} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {clientFile && (
            <button className="w-1/2 mt-4  bg-indigo-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-500 transition-colors duration-200">
              <Link href={clientFile} target="_blank">
                Visit Document
              </Link>
            </button>
          )}
        </div>
        <div>
          <button
            onClick={mintDoc}
            className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-500 transition-colors duration-200"
          >
            Mint Document
          </button>
          {fileMinted && (
            <div className="mt-2 flex justify-center">
              <Loading type="spin" color="black" height={50} width={50} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default adminAccess;
