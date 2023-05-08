import React, { useState, useEffect } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../services/api";
import "./style.css";
import { useHistory } from "react-router-dom";

const Blog = () => {
  const history = useHistory();

  const [list, setList] = useState("");
  const [deletLoader, setDeletLoader] = useState(false);
  const [deletedBlogId, setDeletedBlogId] = useState("");
  const [currentPage, setCurrentPage] = useState();
  const [totalPage, setTotalPage] = useState();

  // first time Data
  async function fetchData() {
    const res = await api.get("/blogs/getAll/pagination?page1&limit=12");
    if (res.status === 200) {
      if (res && res.data && res.data.data) {
        setList(res.data.data);
        setTotalPage(res.data.totalPages);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreData = async (page) => {
    const posts = await api.get(
      `/blogs/getAll/pagination?page=${page}&limit=12`
    );
    if (posts && posts.data && posts.data.data) {
      const data = await posts.data.data;
      const current = await posts.data.currentPage;
      setList(data);
      setCurrentPage(current);
    }
  };
  useEffect(() => {
    setList(list);
    setCurrentPage(1);
  }, []);

  const listItems = [];
  for (let i = 1; i <= totalPage; i++) {
    listItems.push(
      <a
        onClick={() => loadMoreData(i)}
        className={currentPage === i ? "active" : ""}
      >
        {i}
      </a>
    );
  }

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
      const res = await api.get(
        `/blogs/getAll/pagination?page=${currentPage}&limit=12`
      );
      if (res.status === 200) {
        if (res && res.data && res.data.data) {
          setList(res.data.data);
          setTotalPage(res.data.totalPages);
        }
      }
    }
  };

  return list ? (
    <>
      <div>
        <div className="card-container-blog">
          {list.map((data, id) => (
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
                src={data.image}
                alt="blog"
              />
              <h3>{data.seoTitle[0]}</h3>
              <p>{data.category}</p>
            </div>
          ))}
        </div>

        <div class="center">
          <div class="pagination pagination1 pagination3 pagination4 pagination6">
            {listItems}
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
      <Spinner children={false} color="dark" />
      <h3 style={{ marginLeft: "10px" }}>Loading...</h3>
    </div>
  );
};

export default Blog;
