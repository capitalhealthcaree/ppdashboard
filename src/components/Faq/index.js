import React, { useState, useRef } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import JoditEditor from "jodit-react";
import { TagsInput } from "react-tag-input-component";
import api from "../../services/api";
import { toast } from "react-toastify";
import { Spinner } from "reactstrap";

const Faq = () => {
  const editor = useRef(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [metaDes, setMetaDes] = useState("");
  const [foucKW, setFoucKW] = useState("");
  const [slug, setSlug] = useState("");
  const [seoTitle, setSeoTitle] = useState([]);
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
    if (seoTitle.toString().length <= 70) {
      setSeoTitleError(false);
      setLoader(true);
      let res = await api.post("/faq/create", finalData);
      if (res.status === 200) {
        setLoader(false);
        toast("Faq created success", {
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
          <Label for="exampleEmail">Answer</Label>
          <JoditEditor
            ref={editor}
            value={answer}
            tabIndex={1} // tabIndex of textarea
            onChange={(newContent) => {
              setAnswer(newContent);
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

export default Faq;
