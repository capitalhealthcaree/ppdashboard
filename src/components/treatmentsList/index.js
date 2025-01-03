import React, { useState, useEffect } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../services/api";
import "../FaqList/style.css";
import { useHistory } from "react-router-dom";

const Faq = () => {
  const history = useHistory();
  const [list, setList] = useState("");
  const [deletLoader, setDeletLoader] = useState(false);
  const [deletedFAQId, setDeletedFAQId] = useState("");

  // first time Data
  async function fetchData() {
    const res = await api.get("/treatments/getAll");
    if (res.status === 200) {
      if (res && res.data && res.data.data) {
        setList(res.data.data);
      }
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setList(list);
  }, []);

  const deletFAQBlog = async (treatmentsId) => {
    setDeletLoader(true);
    setDeletedFAQId(treatmentsId);
    const res = await api.delete("/treatments/" + treatmentsId);
    if (res.status === 200) {
      toast("Treatments specific page content deleted successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setDeletLoader(false);
      const res = await api.get(`/treatments/getAll/`);
      if (res.status === 200) {
        if (res && res.data && res.data.data) {
          setList(res.data.data);
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
                        pathname: "/treatments-edit",
                        state: { treatmentsData: data },
                      });
                      setDeletedFAQId(data._id);
                    }}
                  />
                </div>
                <div
                  onClick={() => deletFAQBlog(data._id)}
                  style={{ cursor: "pointer", marginBottom: "5%" }}
                >
                  {deletedFAQId === data._id && deletLoader ? (
                    <Spinner children={false} color="dark" />
                  ) : (
                    <FontAwesomeIcon icon={faTrash} />
                  )}
                </div>
              </div>
              <h5>Q:{data.slug}</h5>
              __________________________________
              <div
                dangerouslySetInnerHTML={{
                  __html: data ? data.content : "",
                }}
              />
            </div>
          ))}
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

export default Faq;
