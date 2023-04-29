import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Spinner,
  Col,
} from "reactstrap";

import { TagsInput } from "react-tag-input-component";

import { storage } from "../../firebase";
// import { htmlToDraft, draftToHtml } from "draftjs-to-html";
// import { htmlToDraft } from "draftjs-to-html";
// import { EditorState,  } from 'draft-js';
// import { Editor } from "react-draft-wysiwyg";
import api from "../../services/api";
import { toast } from "react-toastify";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
function BlogEdit({ show, close, data, callApi }) {
  const [metaDes, setMetaDes] = useState(data.metaDes);
  const [foucKW, setFoucKW] = useState(data.foucKW);
  const [slug, setSlug] = useState(data.slug);
  const [seoTitle, setSeoTitle] = useState(data.seoTitle);
  const [category, setCategory] = useState(data.category);
  const [image, setImage] = useState(data.image);
  const [seoTitleError, setSeoTitleError] = useState(false);
  // const [editorState, setEditorState] = useState();
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState(data.title);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   if (image == null) return;
  //   storage
  //     .ref("/images/" + image.name)
  //     .put(image)
  //     .on("state update", () => {
  //       storage
  //         .ref("images")
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then(async (urls) => {
  //           let finalData = {
  //             title: draftToHtml(convertToRaw(editorState.getCurrentContent())),
  //             metaDes: metaDes,
  //             foucKW: foucKW,
  //             slug: slug,
  //             seoTitle: seoTitle,
  //             category: category,
  //             image: urls,
  //           };
  //           if (seoTitle.toString().length <= 70) {
  //             setSeoTitleError(false);
  //             debugger;
  //             let res = await api.patch("/blogs/create", finalData);
  //             if (res.status === 200) {
  //               toast("Blog created success", {
  //                 position: toast.POSITION.TOP_RIGHT,
  //                 autoClose: 3000,
  //                 hideProgressBar: false,
  //                 closeOnClick: true,
  //                 pauseOnHover: true,
  //                 draggable: true,
  //                 progress: undefined,
  //               });
  //             }
  //           } else {
  //             setSeoTitleError(true);
  //           }
  //         });
  //     });
  // };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let finalData = {
      // title: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      metaDes: metaDes,
      foucKW: foucKW,
      slug: slug,
      seoTitle: seoTitle,
      category: category,
      // image: urls,
    };
    setLoader(true);
    let res = await api.patch("/blogs/update/" + data._id, finalData);
    if (res.status === 200) {
      await callApi();
      close();
      toast("Blog update successfully", {
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
  // const onEditorStateChange = (newEditorState) => {
  // 	setEditorState(newEditorState);
  // };

  return (
    <div>
      <Modal isOpen={show} size="lg">
        <ModalHeader>{data.seoTitle[0]}</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Content Description</Label>
              <CKEditor
                editor={ClassicEditor}
                data={title}
                onChange={async (event, editor) => {
                  const data = await editor.getData();
                  setTitle(data);
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
                    {seoTitleError
                      ? `Max. 70 characters are allowed only.`
                      : ""}
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
                    <option value={"injury-treatments"}>
                      Injury Treatment
                    </option>
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
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            onClick={close}
            disabled={!loader ? false : true}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default BlogEdit;
