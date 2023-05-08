import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { Spinner } from "reactstrap";

const Appointment = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await api.get("/appointment/getAll");
      if (res.status === 200) {
        if (res && res.data && res.data.data) setData(res.data.data);
      }
    }
    fetchData();
  }, []);

  return data ? (
    <>
      <div className="row">
        {data.map((data, index) => (
          <div className="col-12">
            <div class="card mb-3">
              <div class="card-body">
                <div>
                  <h5 class="d-inline mr-3">First Name:</h5>
                  <p class="d-inline">{data.firstName}</p>
                </div>
                <div>
                  <h5 class="d-inline mr-3">Last Name:</h5>
                  <p class="d-inline">{data.lastName}</p>
                </div>
                <div>
                  <h5 class="d-inline mr-3">Phone:</h5>
                  <p class="d-inline">{data.phone}</p>
                </div>
                <div>
                  <h5 class="d-inline mr-3">Email:</h5>
                  <p class="d-inline">{data.email}</p>
                </div>
                <h5 class="d-inline mr-3">Patient Type:</h5>
                <p class="d-inline">{data.patientType}</p>
                <div></div>
                <h5 class="d-inline mr-3">Message:</h5>
                <p class="d-inline">{data.message}</p>
              </div>
            </div>
          </div>
        ))}
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
