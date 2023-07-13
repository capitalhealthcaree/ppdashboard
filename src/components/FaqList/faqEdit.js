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

const FaqEdit = () => {
  const location = useLocation();
  const editor = useRef(null);

  let data = location.state.faqData;

  const [question, setQuestion] = useState(data.question);
  const [answer, setAnswer] = useState(data.answer);
  const [metaDes, setMetaDes] = useState(data.metaDes);
  const [foucKW, setFoucKW] = useState(data.foucKW);
  const [slug, setSlug] = useState(data.slug);
  const [seoTitle, setSeoTitle] = useState(data.seoTitle);

  const [seoTitleError, setSeoTitleError] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let finalData = {
      question: question,
      answer: answer,
      metaDes: metaDes,
      foucKW: foucKW,
      slug: slug,
      seoTitle: seoTitle,
    };
    setLoader(true);
    let res = await api.patch("/faq/update/" + data._id, finalData);
    if (res.status === 200) {
      toast("FAQ update successfully", {
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
        <Row>
          <Col xs="12">
            <FormGroup>
              <Label for="question">Question</Label>
              <Input
                id="question"
                name="question"
                value={question}
                placeholder="Enter Question"
                onChange={(event) => {
                  setQuestion(event.target.value);
                }}
              />
            </FormGroup>
          </Col>
        </Row>
        <FormGroup>
          <Label for="exampleEmail">Content Description</Label>
          <JoditEditor
            ref={editor}
            value={answer}
            tabIndex={1} // tabIndex of textarea
            onChange={(newContent) => {
              setAnswer(newContent);
              console.log("dr sahib", newContent);
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

export default FaqEdit;
