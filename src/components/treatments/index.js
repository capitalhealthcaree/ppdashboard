import React, { useState, useRef } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import JoditEditor from "jodit-react";
import api from "../../services/api";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";

const Treatments = () => {
  const editor = useRef(null);
  const [treatmentsContent, setTreatmentsContent] = useState("");

  const [slug, setSlug] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let finalData = {
      content: treatmentsContent,
      slug: slug,
    };

    setLoader(true);
    let res = await api.post("/treatments/create", finalData);
    if (res.status === 200) {
      setLoader(false);
      toast("treatments content page created success", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Content Description</Label>
          <JoditEditor
            ref={editor}
            value={treatmentsContent}
            tabIndex={1} // tabIndex of textarea
            onChange={(newContent) => {
              setTreatmentsContent(newContent);
            }}
          />
        </FormGroup>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="exampleEmail">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={slug}
                placeholder="slug"
                onChange={(event) => {
                  setSlug(event.target.value);
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button
          type="submit"
          disabled={loader ? true : false}
          style={{ maxWidth: "150px" }}
        >
          {loader ? <Spinner children={false} color="dark" /> : "Submit"}
        </Button>
      </Form>
    </div>
  );
};

export default Treatments;
