import React, { useState, useRef } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import JoditEditor from "jodit-react";
import { TagsInput } from "react-tag-input-component";
import { storage } from "../../firebase";
import api from "../../services/api";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";

const Blog = () => {
  const editor = useRef(null);
  const [metaDes, setMetaDes] = useState("");
  const [foucKW, setFoucKW] = useState("");
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState([]);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState();
  const [seoTitleError, setSeoTitleError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (image == null) return;
    storage
      .ref("/images/" + image.name)
      .put(image)
      .on("state update", () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(async (urls) => {
            let finalData = {
              title: title,
              metaDes: metaDes,
              foucKW: foucKW,
              slug: slug,
              seoTitle: seoTitle,
              category: category,
              image: urls,
            };
            if (seoTitle.toString().length <= 70) {
              setSeoTitleError(false);
              setLoader(true);
              let res = await api.post("/blogs/create", finalData);
              if (res.status === 200) {
                setLoader(false);
                toast("Blog created success", {
                  position: toast.POSITION.TOP_RIGHT,
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            } else {
              setSeoTitleError(true);
            }
          });
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Content Description</Label>
          <JoditEditor
            ref={editor}
            value={title}
            tabIndex={1} // tabIndex of textarea
            onChange={(newContent) => {
              setTitle(newContent);
            }}
          />
        </FormGroup>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="exampleEmail">Focus Key word</Label>
              <Input
                id="foucKW"
                name="foucKW"
                value={foucKW}
                placeholder="fouc key word"
                onChange={(event) => {
                  setFoucKW(event.target.value);
                }}
              />
            </FormGroup>
          </Col>

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
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="exampleEmail">Seo Title</Label>
              <TagsInput
                value={seoTitle}
                onChange={setSeoTitle}
                name="seoTitle"
                placeHolder="enter seo title"
              />
              <small className="text-danger">
                {seoTitleError ? `Max. 70 characters are allowed only.` : ""}
              </small>
            </FormGroup>
          </Col>
          <Col xs="6">
            {" "}
            <FormGroup>
              <Label for="category">category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                <option>select</option>
                <option value={"back-pain"}>Back Pain</option>
                <option value={"leg-pain"}>Leg Pain</option>
                <option value={"neck-pain"}>Neck Pain</option>
                <option value={"knee-pain"}>Knee Pain</option>
                <option value={"joint-pain"}>Joint Pain</option>
                <option value={"shoulder-pain"}>Shoulder Pain</option>
                <option value={"injury-treatments"}>Injury Treatment</option>
                <option value={"health-tips"}>Health Tips</option>
                <option value={"update"}>Update</option>
                <option value={"treatments"}>Treatments</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs="6">
            <FormGroup>
              <Label for="exampleEmail">Meta Description</Label>
              <Input
                id="metaDes"
                name="metaDes"
                value={metaDes}
                placeholder="Meta Description"
                onChange={(event) => {
                  setMetaDes(event.target.value);
                }}
              />
            </FormGroup>
          </Col>
          <Col xs="6">
            <FormGroup>
              <Label for="exampleFile">File</Label>
              <Input
                type="file"
                name="file"
                id="exampleFile"
                onChange={(e) => setImage(e.target.files[0])}
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

export default Blog;
