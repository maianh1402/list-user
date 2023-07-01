import { Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { updateUser } from '../sevices/UserSevices'
import { toast } from 'react-toastify';


const ModalEditUser = (props) => {
    const { show, dataUserEdit, handleClose, handleEditNewUser } = props
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleEditUser = async () => {
        let res = await updateUser(name, job)

        if (res && res.updatedAt) {
            handleEditNewUser({
                first_name: name,
                last_name: job,
                id: dataUserEdit.id
            })
            handleClose()
            toast.success('Sửa thành công!')
        }
    }

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name)
            setJob(dataUserEdit.last_name)
        }
    }, [dataUserEdit])
    return (
        <Modal show={show} backdrop='static' keyboard={false}>
            <Modal.Header>
                <Modal.Title>Edit user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Firstname"
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <Form.Control
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        placeholder="Lastname"
                    />
                </InputGroup>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditUser}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditUser;