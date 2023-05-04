import React, { useState, useEffect } from "react";
import { Pagination } from "react-pagination-bar";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../services/api";
import "./style.css";
import "react-pagination-bar/dist/index.css";
import { useHistory } from "react-router-dom";

const News = () => {
  const history = useHistory();

  const [list, setList] = useState("");
  const [deletLoader, setDeletLoader] = useState(false);
  const [deletedBlogId, setDeletedBlogId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pagePostsLimit = 12;

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/news/getAll");
      if (res.status === 200) {
        if (res && res.data && res.data.data) setList(res.data.data);
      }
    }
    fetchData();
  }, []);

  const deletBlog = async (blogId) => {
    setDeletLoader(true);
    setDeletedBlogId(blogId);
    const res = await api.delete("/news/" + blogId);
    if (res.status === 200) {
      toast("News deleted success", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDeletLoader(false);
      const res = await api.get("/news/getAll");
      if (res.status === 200) {
        if (res && res.data && res.data.data) setList(res.data.data);
      }
    }
  };

  return list ? (
    <>
      <div>
        <div className="card-container-blog">
          {list
            .slice(
              (currentPage - 1) * pagePostsLimit,
              currentPage * pagePostsLimit
            )
            .map((data, id) => (
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
                      icon={faEdit}
                      onClick={() => {
                        history.push({
                          pathname: "/newsedit",
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
                  src={data.image}
                  alt="blog"
                />
                <h3>{data.seoTitle[0]}</h3>
                <p>{data.category}</p>
              </div>
            ))}
        </div>
        <div
          style={{ paddingBottom: "5%", textAlign: "right" }}
          className="mb-5"
        >
          <Pagination
            currentPage={currentPage}
            itemsPerPage={pagePostsLimit}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
            totalItems={list.length}
            pageNeighbours={2}
          />
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
      <Spinner children={false} color="dark" />
      <h3 style={{ marginLeft: "10px" }}>Loading...</h3>
    </div>
  );
};

export default News;
