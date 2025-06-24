import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';


function App() {
  let [formData, setFormData] = useState(
    {
      uname: '',
      uemail: '',
      uphone: '',
      umessage: '',
      index: ''
    }
  )

  let [userData, setUserData] = useState([])

  let getValue = (event) => {
    let oldData = { ...formData }
    let inputName = event.target.name;
    let inputValue = event.target.value;

    oldData[inputName] = inputValue;
    setFormData(oldData)

  }

  let handleSubmit = (event) => {
    let currentUserFormData = {
      uname: formData.uname,
      uemail: formData.uemail,
      uphone: formData.uphone,
      umessage: formData.umessage
    }

    if (formData.index === "") {
      let checkFilterUser = userData.filter((v) => v.uemail === formData.uemail || v.uphone === formData.uphone)

      if (checkFilterUser.length >= 1) {
        toast.error("Email or Phone already exists....")
      }
      else {
        let oldUserData = [...userData, currentUserFormData]
        setUserData(oldUserData)
        console.log(userData)
        setFormData(
          {
            uname: '',
            uemail: '',
            uphone: '',
            umessage: '',
            index: ''
          }
        )
      }
    }

    else {
      let editIndex = formData.index;
      let oldData = userData;

      let checkFilterUser = userData.filter((v, i) => (v.uemail === formData.uemail || v.uphone === formData.uphone)
        && i !== editIndex)

      if (checkFilterUser.length === 0) {
        oldData[editIndex]['uname'] = formData.uname
        oldData[editIndex]['uemail'] = formData.uemail
        oldData[editIndex]['uphone'] = formData.uphone
        oldData[editIndex]['umessage'] = formData.umessage

        setUserData(oldData)
        toast.success("Data updated successfully....")
        setFormData(
          {
            uname: '',
            uemail: '',
            uphone: '',
            umessage: '',
            index: ''
          }
        )

      }

      else {
        toast.error("Email or Phone already exists....")
      }
    }



    event.preventDefault();
  }

  let deleteRow = (indexNumber) => {
    let filterDataafterDelete = userData.filter((v, i) => i !== indexNumber)
    toast.success("Data successfully deleted....")
    setUserData(filterDataafterDelete)

  }

  let editRow = (indexNumber) => {
    let editData = userData.filter((v, i) => i === indexNumber)[0]
    editData['index'] = indexNumber;
    setFormData(editData)
  }
  return (

    <Container fluid>
      <ToastContainer />

      <Container>
        <Row className="mb-4">
          <Col className="text-center">
            <h1 className="fw-bold text-primary border-bottom pb-2 d-inline-block">
              📩 Enquiry Now
            </h1>
          </Col>
        </Row>

        <Row>
          <Col lg={5}>
            <div className="card shadow p-4 border-0">
              <h4 className="text-primary mb-3">Fill Enquiry Form</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" onChange={getValue} value={formData.uname} name="uname" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" onChange={getValue} value={formData.uemail} name="uemail" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" onChange={getValue} value={formData.uphone} name="uphone" placeholder="Enter your phone number" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={3} onChange={getValue} value={formData.umessage} name="umessage" placeholder="Type your message here..." />
                </Form.Group>
                <div className="text-end">
                  <button className="btn btn-primary px-4">
                    {formData.index !== "" ? 'Update' : 'Save'}
                  </button>
                </div>
              </Form>
            </div>
          </Col>


          <Col lg={7} className="mt-4 mt-lg-0">
            <div className="card shadow p-4 border-0">
              <h4 className="text-success mb-3">Submitted Enquiries</h4>
              <Table striped bordered hover responsive>
                <thead className="table-light">
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.length >= 1 ? (
                    userData.map((v, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{v.uname}</td>
                        <td>{v.uemail}</td>
                        <td>{v.uphone}</td>
                        <td>{v.umessage}</td>
                        <td>
                          <button className="btn btn-sm btn-danger me-2" onClick={() => deleteRow(i)}>Delete</button>
                          <button className="btn btn-sm btn-warning" onClick={() => editRow(i)}>Edit</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">No Data Found</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default App;
