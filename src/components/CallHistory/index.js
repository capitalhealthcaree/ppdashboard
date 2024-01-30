import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Spinner } from "reactstrap";

const Appointment = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/countersDateWise");
      if (res.status === 200) {
        if (res && res.data && res.data.data) setData(res.data.data);
      }
    }
    fetchData();
  }, []);
  return data ? (
    <>
      <div className="row">
        {data.map((data, index) => {
          return (
            <div className="col-4" key={index}>
              <div class="card mb-3">
                <div class="card-body">
                  <div>
                    <u>{data.date}</u>
                  </div>
                  <div>
                    <u>
                      <h5 class="d-inline mr-3">Over All Total Count:</h5>
                      <p class="d-inline">{data.overallTotalCount}</p>
                    </u>
                  </div>
                  {data.totalCounts.map((countItem, countIndex) => (
                    <div key={countIndex}>
                      <div>
                        <b class="d-inline mr-3">Call History:</b>
                        <p class="d-inline">
                          {countItem.totalCount} <small>from</small>{" "}
                          <b>{countItem.kw}</b>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
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
export default Appointment;
