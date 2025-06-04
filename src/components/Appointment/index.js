// import React, { useEffect, useState, useRef } from "react";
// import api from "../../services/api";
// import { Spinner } from "reactstrap";
// import html2canvas from "html2canvas";

// const Appointment = () => {
//   const divRef = useRef(null);

//   const [data, setData] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       const res = await api.get("/appointment/getAll");
//       if (res.status === 200) {
//         if (res && res.data && res.data.data) setData(res.data.data);
//       }
//     }
//     fetchData();
//   }, []);
//   function handleDownloadClick() {
//     html2canvas(divRef.current).then((canvas) => {
//       const link = document.createElement("a");
//       link.download = "patient-appointments-detail.png";
//       link.href = canvas.toDataURL();
//       link.click();
//     });
//   }
//   return data ? (
//     <>
//       <div className="row">
//         {data.map((data, index) => {
//           const date = new Date(data.createdAt);

//           const formattedDate = date.toLocaleDateString("en-US", {
//             day: "numeric",
//             month: "long",
//             year: "numeric",
//           });

//           const formattedTime = date.toLocaleTimeString("en-US", {
//             hour: "numeric",
//             minute: "numeric",
//             hour12: true,
//           });

//           const formattedDateTime = `${formattedDate}, ${formattedTime}`;
//           return (
//             <div className="col-12" ref={divRef} key={index}>
//               <div class="card mb-3">
//                 <div class="card-body">
//                   <div>{formattedDateTime}</div>
//                   <button
//                     className="btn btn-success"
//                     onClick={handleDownloadClick}
//                   >
//                     Download Details
//                   </button>
//                   <div>
//                     <h5 class="d-inline mr-3">First Name:</h5>
//                     <p class="d-inline">{data.firstName}</p>
//                   </div>
//                   <div>
//                     <h5 class="d-inline mr-3">Last Name:</h5>
//                     <p class="d-inline">{data.lastName}</p>
//                   </div>
//                   <div>
//                     <h5 class="d-inline mr-3">Phone:</h5>
//                     <p class="d-inline">{data.phone}</p>
//                   </div>
//                   <div>
//                     <h5 class="d-inline mr-3">Email:</h5>
//                     <p class="d-inline">{data.email}</p>
//                   </div>
//                   <div>
//                     <h5 class="d-inline mr-3">Patient Type:</h5>
//                     <p class="d-inline">{data.patientType}</p>
//                   </div>

//                   <div>
//                     <h5 class="d-inline mr-3">Message:</h5>
//                     <p class="d-inline">{data.message}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   ) : (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         marginTop: "10%",
//       }}
//     >
//       <Spinner children={false} color="dark" />
//       <h3 style={{ marginLeft: "10px" }}>Loading...</h3>
//     </div>
//   );
// };
// export default Appointment;

//..............................................................................................................................

// import React, { useEffect, useState, useRef } from "react";
// import api from "../../services/api";
// import { Spinner } from "reactstrap";
// import html2canvas from "html2canvas";

// const Appointment = () => {
//   const divRef = useRef(null);

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // States for filtering
//   const [firstNameFilter, setFirstNameFilter] = useState('');
//   const [lastNameFilter, setLastNameFilter] = useState('');
//   const [phoneFilter, setPhoneFilter] = useState('');
//   const [emailFilter, setEmailFilter] = useState('');
//   const [patientTypeFilter, setPatientTypeFilter] = useState('');

//   useEffect(() => {
//     async function fetchData() {
//       const res = await api.get("/appointment/getAll");
//       if (res.status === 200) {
//         setData(res.data.data);
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   const filteredData = data.filter(item => {
//     return item.firstName.toLowerCase().includes(firstNameFilter.toLowerCase()) &&
//            item.lastName.toLowerCase().includes(lastNameFilter.toLowerCase()) &&
//            item.phone.includes(phoneFilter) &&
//            item.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
//            item.patientType.toLowerCase().includes(patientTypeFilter.toLowerCase());
//   });

//   function handleDownloadClick() {
//     html2canvas(divRef.current).then((canvas) => {
//       const link = document.createElement("a");
//       link.download = "patient-appointments-detail.png";
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     });
//   }

//   return (
//     <>
//       <div className="filter-container">
//         <input
//           type="text"
//           placeholder="Filter by First Name"
//           value={firstNameFilter}
//           onChange={(e) => setFirstNameFilter(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Filter by Last Name"
//           value={lastNameFilter}
//           onChange={(e) => setLastNameFilter(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Filter by Phone"
//           value={phoneFilter}
//           onChange={(e) => setPhoneFilter(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Filter by Email"
//           value={emailFilter}
//           onChange={(e) => setEmailFilter(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Filter by Patient Type"
//           value={patientTypeFilter}
//           onChange={(e) => setPatientTypeFilter(e.target.value)}
//         />
//       </div>
//       {!loading ? (
//         <div className="row">
//           {filteredData.map((item, index) => (
//             <div className="col-12" key={index} ref={index === 0 ? divRef : undefined}>
//               <div className="card mb-3">
//                 <div className="card-body">
//                   <div>{new Date(item.createdAt).toLocaleString()}</div>
//                   <button className="btn btn-success" onClick={handleDownloadClick}>
//                     Download Details
//                   </button>
//                   <div><h5 className="d-inline mr-3">First Name:</h5><p className="d-inline">{item.firstName}</p></div>
//                   <div><h5 className="d-inline mr-3">Last Name:</h5><p className="d-inline">{item.lastName}</p></div>
//                   <div><h5 className="d-inline mr-3">Phone:</h5><p className="d-inline">{item.phone}</p></div>
//                   <div><h5 className="d-inline mr-3">Email:</h5><p className="d-inline">{item.email}</p></div>
//                   <div><h5 className="d-inline mr-3">Patient Type:</h5><p className="d-inline">{item.patientType}</p></div>
//                   <div><h5 className="d-inline mr-3">Message:</h5><p className="d-inline">{item.message}</p></div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div style={{ display: "flex", justifyContent: "center", marginTop: "10%" }}>
//           <Spinner color="dark" />
//           <h3 style={{ marginLeft: "10px" }}>Loading...</h3>
//         </div>
//       )}
//     </>
//   );
// };

// export default Appointment;

//...........................................................................................................................

// import React, { useEffect, useState, useRef } from "react";
// import api from "../../services/api";
// import { Spinner } from "reactstrap";
// import html2canvas from "html2canvas";

// const Appointment = () => {
//   const divRef = useRef(null);

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // States for filtering
//   const [firstNameFilter, setFirstNameFilter] = useState("");
//   const [lastNameFilter, setLastNameFilter] = useState("");
//   const [phoneFilter, setPhoneFilter] = useState("");
//   const [emailFilter, setEmailFilter] = useState("");
//   const [patientTypeFilter, setPatientTypeFilter] = useState("");
//   const [startDateFilter, setStartDateFilter] = useState("");
//   const [endDateFilter, setEndDateFilter] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const res = await api.get("/appointment/getAll");
//         if (res.status === 200) {
//           setData(res.data.data);
//           setLoading(false);
//         }
//       } catch (error) {
//         console.error("Failed to fetch appointments:", error);
//         setLoading(false);
//       }
//     }
//     fetchData();
//   }, []);

//   const filteredData = data.filter((item) => {
//     const itemDate = new Date(item.createdAt);
//     const startDate = startDateFilter ? new Date(startDateFilter) : null;
//     const endDate = endDateFilter ? new Date(endDateFilter) : null;

//     return (
//       item.firstName.toLowerCase().includes(firstNameFilter.toLowerCase()) &&
//       item.lastName.toLowerCase().includes(lastNameFilter.toLowerCase()) &&
//       item.phone.includes(phoneFilter) &&
//       item.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
//       item.patientType
//         .toLowerCase()
//         .includes(patientTypeFilter.toLowerCase()) &&
//       (!startDate || itemDate >= startDate) &&
//       (!endDate || itemDate <= endDate)
//     );
//   });

//   function handleDownloadClick() {
//     html2canvas(divRef.current).then((canvas) => {
//       const link = document.createElement("a");
//       link.download = "patient-appointments-detail.png";
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     });
//   }

//   return (
//     <>
//       <div className="filter-container">
//         filteredData count:{filteredData.length}
//         <input
//           type="text"
//           placeholder="Filter by First Name"
//           value={firstNameFilter}
//           onChange={(e) => setFirstNameFilter(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Filter by Last Name"
//           value={lastNameFilter}
//           onChange={(e) => setLastNameFilter(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Filter by Phone"
//           value={phoneFilter}
//           onChange={(e) => setPhoneFilter(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Filter by Email"
//           value={emailFilter}
//           onChange={(e) => setEmailFilter(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Filter by Patient Type"
//           value={patientTypeFilter}
//           onChange={(e) => setPatientTypeFilter(e.target.value)}
//         />
//         <input
//           type="date"
//           placeholder="Start Date"
//           value={startDateFilter}
//           onChange={(e) => setStartDateFilter(e.target.value)}
//         />
//         <input
//           type="date"
//           placeholder="End Date"
//           value={endDateFilter}
//           onChange={(e) => setEndDateFilter(e.target.value)}
//         />
//       </div>
//       {!loading ? (
//         <div className="row">
//           {filteredData.map((item, index) => (
//             <div className="col-12" key={index} ref={divRef}>
//               <div className="card mb-3">
//                 <div className="card-body">
//                   <div>
//                     {new Date(item.createdAt).toLocaleString("en-US", {
//                       day: "numeric",
//                       month: "long",
//                       year: "numeric",
//                       hour: "2-digit",
//                       minute: "2-digit",
//                       hour12: true,
//                     })}
//                   </div>
//                   <button
//                     className="btn btn-success"
//                     onClick={handleDownloadClick}
//                   >
//                     Download Details
//                   </button>
//                   <div>
//                     <h5 className="d-inline mr-3">First Name:</h5>
//                     <p className="d-inline">{item.firstName}</p>
//                   </div>
//                   <div>
//                     <h5 className="d-inline mr-3">Last Name:</h5>
//                     <p className="d-inline">{item.lastName}</p>
//                   </div>
//                   <div>
//                     <h5 className="d-inline mr-3">Phone:</h5>
//                     <p className="d-inline">{item.phone}</p>
//                   </div>
//                   <div>
//                     <h5 className="d-inline mr-3">Email:</h5>
//                     <p className="d-inline">{item.email}</p>
//                   </div>
//                   <div>
//                     <h5 className="d-inline mr-3">Patient Type:</h5>
//                     <p className="d-inline">{item.patientType}</p>
//                   </div>
//                   <div>
//                     <h5 className="d-inline mr-3">Message:</h5>
//                     <p className="d-inline">{item.message}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             marginTop: "10%",
//           }}
//         >
//           <Spinner color="dark" />
//           <h3 style={{ marginLeft: "10px" }}>Loading...</h3>
//         </div>
//       )}
//     </>
//   );
// };

// export default Appointment;

//..........................................................................................................................

import React, { useEffect, useState, useRef } from "react";
import api from "../../services/api";
import { Spinner } from "reactstrap";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx"; // Import the xlsx library

const Appointment = () => {
  const divRef = useRef(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for filtering
  const [firstNameFilter, setFirstNameFilter] = useState("");
  const [lastNameFilter, setLastNameFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [patientTypeFilter, setPatientTypeFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await api.get("/appointment/getAll");
        if (res.status === 200) {
          setData(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredData = data.filter((item) => {
    const itemDate = new Date(item.createdAt);
    const startDate = startDateFilter ? new Date(startDateFilter) : null;
    const endDate = endDateFilter ? new Date(endDateFilter) : null;

    return (
      item.firstName.toLowerCase().includes(firstNameFilter.toLowerCase()) &&
      item.lastName.toLowerCase().includes(lastNameFilter.toLowerCase()) &&
      item.phone.includes(phoneFilter) &&
      item.email.toLowerCase().includes(emailFilter.toLowerCase()) &&
      item.patientType
        .toLowerCase()
        .includes(patientTypeFilter.toLowerCase()) &&
      (!startDate || itemDate >= startDate) &&
      (!endDate || itemDate <= endDate)
    );
  });

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Appointments");
    XLSX.writeFile(wb, "FilteredAppointments.xlsx");
  };

  return (
    <>
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filter by First Name"
          value={firstNameFilter}
          onChange={(e) => setFirstNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Last Name"
          value={lastNameFilter}
          onChange={(e) => setLastNameFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Phone"
          value={phoneFilter}
          onChange={(e) => setPhoneFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Email"
          value={emailFilter}
          onChange={(e) => setEmailFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by Patient Type"
          value={patientTypeFilter}
          onChange={(e) => setPatientTypeFilter(e.target.value)}
        />
        <input
          type="date"
          placeholder="Start Date"
          value={startDateFilter}
          onChange={(e) => setStartDateFilter(e.target.value)}
        />
        <input
          type="date"
          placeholder="End Date"
          value={endDateFilter}
          onChange={(e) => setEndDateFilter(e.target.value)}
        />
        <button className="btn btn-primary" onClick={exportToExcel}>
          Export to Excel
        </button>
      </div>
      <b>filteredData count:{filteredData.length}</b>
      {!loading ? (
        <div className="row">
          {filteredData.map((item, index) => (
            <div className="col-12" key={index} ref={divRef}>
              <div className="card mb-3">
                <div className="card-body">
                  <div>
                    {new Date(item.createdAt).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </div>
                  <div>
                    <h5 className="d-inline mr-3">Full Name:</h5>
                    <p className="d-inline">{item.firstName}</p>
                  </div>
                  {/* <div>
                    <h5 className="d-inline mr-3">Last Name:</h5>
                    <p className="d-inline">{item.lastName}</p>
                  </div> */}
                  <div>
                    <h5 className="d-inline mr-3">Phone:</h5>
                    <p className="d-inline">{item.phone}</p>
                  </div>
                  <div>
                    <h5 className="d-inline mr-3">Email:</h5>
                    <p className="d-inline">{item.email}</p>
                  </div>
                  <div>
                    <h5 className="d-inline mr-3">Patient Type:</h5>
                    <p className="d-inline">{item.patientType}</p>
                  </div>
                  <div>
                    <h5 className="d-inline mr-3">Location:</h5>
                    <p className="d-inline">{item.location}</p>
                  </div>
                  <div>
                    <h5 className="d-inline mr-3">Message:</h5>
                    <p className="d-inline">{item.message}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <Spinner color="dark" />
          <h3 style={{ marginLeft: "10px" }}>Loading...</h3>
        </div>
      )}
    </>
  );
};

export default Appointment;
