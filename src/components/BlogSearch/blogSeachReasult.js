import React, { useState, useEffect } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { List, Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../services/api";
import "./style.css";
import { useHistory } from "react-router-dom";
const Blog = ({ list }) => {
  const history = useHistory();

  const [data, setData] = useState({});
  const [deletLoader, setDeletLoader] = useState(false);
  const [deletedBlogId, setDeletedBlogId] = useState("");

  const deletBlog = async (blogId) => {
    setDeletLoader(true);
    setDeletedBlogId(blogId);
    const res = await api.delete("/blogs/" + blogId);
    if (res.status === 200) {
      toast("Blog deleted success", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDeletLoader(false);
      setData({});
    }
  };
  useEffect(() => {
    setData(list);
  }, [list]);
  return Object.keys(data).length > 0 ? (
    <>
      <div>
        <div className="card-container-blog">
          <div className="card-blog">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ cursor: "pointer", marginBottom: "5%" }}>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => {
                    history.push({
                      pathname: "/blogedit",
                      state: { blogData: data },
                    });
                    setDeletedBlogId(data._id);
                  }}
                />
              </div>
              <div
                onClick={() => deletBlog(data._id)}
                style={{ cursor: "pointer", marginBottom: "5%" }}
              >
                {deletedBlogId === data._id && deletLoader ? (
                  <Spinner children={false} color="dark" />
                ) : (
                  <FontAwesomeIcon icon={faTrash} />
                )}
              </div>
            </div>
            <img
              style={{ maxwidth: "500px", maxHeight: "500px" }}
              src={data ? data.image : ""}
              alt="blog"
            />
            <h3>{data ? data.seoTitle : ""}</h3>
            <p>{data ? data.category : ""}</p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "10%",
      }}
    >
      <h3 style={{ marginLeft: "10px" }}>No Data </h3>
    </div>
  );
};

export default Blog;
