import React, { useState } from "react";
import api from "../../services/api";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { Spinner } from "reactstrap";

const Appointment = () => {
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [filePath, setFilePath] = useState(""); // Initialize as an empty string
  const [loader, setLoader] = useState(false);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show loader while uploading
    setLoader(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "premierpainassets");
    formData.append("cloud_name", "dngmflrpx");
    formData.append("folder", folderName);

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dngmflrpx/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const imageUrl = await res.json();

      if (imageUrl.url) {
        setFilePath(imageUrl.url); // Set the file path once upload completes
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error state or show an error message
    } finally {
      setLoader(false); // Stop loader after upload finishes
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Ensure filePath is available before submitting
    if (!filePath) {
      alert("Please upload a file.");
      return;
    }

    const finalData = {
      folderName,
      fileName,
      filePath, // Include the filePath parameter
    };

    setLoader(true);
    try {
      let res = await api.post("/createAssets", finalData);
      if (res.status === 200) {
        setFolderName("");
        setFileName("");
        setFilePath(""); // Clear the filePath after successful upload
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error state or show an error message
    } finally {
      setLoader(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col xs="6">
          <FormGroup>
            <Label for="folderName">Folder Name</Label>
            <Input
              id="folderName"
              name="folderName"
              value={folderName}
              placeholder="Folder Name"
              onChange={(event) => {
                setFolderName(event.target.value);
              }}
            />
          </FormGroup>
        </Col>

        <Col xs="6">
          <FormGroup>
            <Label for="fileName">File Name</Label>
            <Input
              id="fileName"
              name="fileName"
              value={fileName}
              placeholder="File Name"
              onChange={(event) => {
                setFileName(event.target.value);
              }}
            />
          </FormGroup>
        </Col>

        <Col xs="6">
          <FormGroup>
            <Label for="exampleFile">Upload File</Label>
            <Input
              type="file"
              name="file"
              id="exampleFile"
              onChange={handleFileUpload}
              disabled={loader} // Disable file upload while uploading
            />
          </FormGroup>
        </Col>
      </Row>

      <Button
        type="submit"
        disabled={loader || !filePath} // Disable submit if loader is true or filePath is missing
        style={{ maxWidth: "150px" }}
      >
        {loader ? <Spinner children={false} color="dark" /> : "Submit"}
      </Button>
    </Form>
  );
};

export default Appointment;
