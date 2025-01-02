import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Spinner } from "reactstrap";
import { faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../BlogList/style.css";

const Appointment = () => {
  const [deletLoader, setDeletLoader] = useState(false); // Loader state for deletion
  const [deletedBlogId, setDeletedBlogId] = useState(""); // ID of the asset being deleted
  const [assets, setAssets] = useState({}); // To hold assets grouped by folder names
  const [loading, setLoading] = useState(false); // Loading state for fetching assets

  // Fetch assets grouped by folder names on component mount
  useEffect(() => {
    async function fetchAssetsGrouped() {
      setLoading(true); // Set loading to true when fetching assets
      try {
        const res = await api.get("/getAssetsGrouped");
        if (res.status === 200 && res.data && res.data.data) {
          const groupedAssets = res.data.data;

          // Group assets by folder name
          let assetsByFolder = {};
          Object.keys(groupedAssets).forEach((folderName) => {
            assetsByFolder[folderName] = groupedAssets[folderName];
          });

          setAssets(assetsByFolder); // Update state with grouped assets
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
        toast("Failed to load assets", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setLoading(false); // Set loading to false after fetching is done
    }

    fetchAssetsGrouped();
  }, []);

  // Handle asset deletion
  const deletBlog = async (id) => {
    try {
      setDeletLoader(true); // Start showing the spinner for the deletion process
      setDeletedBlogId(id); // Set the ID of the asset being deleted

      // Make the API call to delete the asset
      const res = await api.delete("/deleteAsset/" + id);
      debugger;
      if (res.status === 200) {
        toast("Asset deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // Re-fetch the assets after deletion
        const updatedAssets = await api.get("/getAssetsGrouped");
        if (
          updatedAssets.status === 200 &&
          updatedAssets.data &&
          updatedAssets.data.data
        ) {
          setAssets(updatedAssets.data.data); // Update the assets list after deletion
        }
      } else {
        debugger;
        toast("Failed to delete asset", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
      toast("An error occurred while deleting the asset.", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setDeletLoader(false); // Stop the spinner after the deletion operation is complete
    }
  };

  // Handle copying asset URL to clipboard
  const copyToClipboard = (url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Image URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
        alert("Failed to copy URL.");
      });
  };

  return (
    <div className="assets-container">
      {loading ? (
        <div
          className="loading-container"
          style={{
            display: "flex", // Use flexbox for centering
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            height: "100vh", // Full viewport height
            width: "100%", // Full width
          }}
        >
          <Spinner color="dark" />
        </div>
      ) : Object.keys(assets).length > 0 ? (
        Object.keys(assets).map((folderName) => (
          <div key={folderName} className="folder-section">
            <h2>{folderName || "Uncategorized"}</h2>
            <div className="card-container-blog">
              {assets[folderName].map((asset, id) => (
                <div key={id} className="card-blog">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* Copy asset URL to clipboard */}
                    <div style={{ cursor: "pointer", marginBottom: "5%" }}>
                      <FontAwesomeIcon
                        icon={faCopy}
                        onClick={() => copyToClipboard(asset.filePath)}
                      />
                    </div>

                    {/* Delete asset */}
                    <div
                      onClick={() => deletBlog(asset._id)}
                      style={{ cursor: "pointer", marginBottom: "5%" }}
                    >
                      {deletedBlogId === asset._id && deletLoader ? (
                        <Spinner children={false} color="dark" />
                      ) : (
                        <FontAwesomeIcon icon={faTrash} />
                      )}
                    </div>
                  </div>

                  {/* Asset Image */}
                  <img
                    style={{ width: "100px", height: "100px" }}
                    src={asset.filePath}
                    alt={asset.fileName || "asset"}
                  />
                  <h3>{asset.fileName || "No file name"}</h3>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>No assets found</p> // Show a message if no assets are available
      )}
    </div>
  );
};

export default Appointment;
