import React, { useState, useRef } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Spinner,
  Col,
} from "reactstrap";
import { TagsInput } from "react-tag-input-component";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import JoditEditor from "jodit-react";

const BlogEdit = () => {
  const location = useLocation();
  const editor = useRef(null);

  let data = location.state.blogData;
  const [metaDes, setMetaDes] = useState(data.metaDes);
  const [foucKW, setFoucKW] = useState(data.foucKW);
  const [slug, setSlug] = useState(data.slug);
  const [seoTitle, setSeoTitle] = useState(data.seoTitle);
  const [category, setCategory] = useState(data.category);
  const [image, setImage] = useState(data.image);
  const [seoTitleError, setSeoTitleError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState(data.title);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let finalData = {
      title,
      metaDes: metaDes,
      foucKW: foucKW,
      slug: slug,
      seoTitle: seoTitle,
      category: category,
      // image: urls,
    };
    setLoader(true);
    let res = await api.patch("/news/update/" + data._id, finalData);
    if (res.status === 200) {
      toast("News update successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoader(false);
    }
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
                <option value={"treatments"}>Treatments</option>
                <option value={"health-tips"}>Health Tips</option>
                <option value={"update"}>Update</option>
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

        <Button type="submit" style={{ maxWidth: "75px" }}>
          {loader ? (
            <Spinner size={"md"} children={false} color="dark" />
          ) : (
            "Submit"
          )}
        </Button>
      </Form>
    </div>
  );
};

export default BlogEdit;
