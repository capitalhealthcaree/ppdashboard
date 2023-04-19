import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { TagsInput } from "react-tag-input-component";
import { EditorState, convertToRaw } from "draft-js";
import { storage } from "../../firebase";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import api from "../../services/api";
import { toast } from "react-toastify";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Blog = () => {
  const [metaDes, setMetaDes] = useState("");
  const [foucKW, setFoucKW] = useState("");
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState([]);
  const [image, setImage] = useState();
  const [seoTitleError, setSeoTitleError] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (image == null) return;
    storage
      .ref("/newsimages/" + image.name)
      .put(image)
      .on("state update", () => {
        storage
          .ref("newsimages")
          .child(image.name)
          .getDownloadURL()
          .then(async (urls) => {

            let finalData = {
              title: draftToHtml(convertToRaw(editorState.getCurrentContent())),
              metaDes: metaDes,
              foucKW: foucKW,
              slug: slug,
              seoTitle: seoTitle,
              image: urls,
            };
            if (seoTitle.toString().length <= 70) {
              setSeoTitleError(false);

              let res = await api.post("/news/create/", finalData);
              if (res.status === 200) {
                toast("News created successfully", {
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
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="exampleEmail">Content Description</Label>
          <Editor
            className="border border-primary"
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
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
        </Row>
        <Row>
          
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

        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default Blog;
