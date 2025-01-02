import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Spinner } from "reactstrap";
import { faTrash, faCopy } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../BlogList/style.css";

const Appointment = () => {
  const [deletLoader, setDeletLoader] = useState(false);
  const [deletedBlogId, setDeletedBlogId] = useState("");
  const [assetsWithEmptyFolderName, setAssetsWithEmptyFolderName] = useState(
    []
  );
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    async function fetchAssetsWithEmptyFolderName() {
      setLoading(true); // Set loading to true before making the API call
      const res = await api.get("/getAssetsWithEmptyFolderName");
      if (res.status === 200) {
        if (res && res.data && res.data.data)
          setAssetsWithEmptyFolderName(res.data.data);
      }
      setLoading(false); // Set loading to false once the data is fetched
    }
    fetchAssetsWithEmptyFolderName();
  }, []);

  const deletBlog = async (id) => {
    setDeletLoader(true);
    setDeletedBlogId(id);
    const res = await api.delete("/deleteAsset/" + id);
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
      setDeletLoader(false);
      // Refetch assets after deletion
      setLoading(true);
      const res = await api.get(`/getAssetsWithEmptyFolderName`);
      if (res.status === 200) {
        if (res && res.data && res.data.data)
          setAssetsWithEmptyFolderName(res.data.data);
      }
      setLoading(false);
    }
  };

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
    <>
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
      ) : assetsWithEmptyFolderName.length > 0 ? (
        <div className="card-container-blog">
          {assetsWithEmptyFolderName.map((asset, id) => (
            <div key={id} className="card-blog">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ cursor: "pointer", marginBottom: "5%" }}>
                  <FontAwesomeIcon
                    icon={faCopy}
                    onClick={() => copyToClipboard(asset.filePath)}
                  />
                </div>
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
              <img
                style={{ width: "100px", height: "100px" }}
                src={asset.filePath}
                alt="asset"
              />
              <h3>{asset.fileName}</h3>
            </div>
          ))}
        </div>
      ) : (
        <p>No assets found</p>
      )}
    </>
  );
};

export default Appointment;
