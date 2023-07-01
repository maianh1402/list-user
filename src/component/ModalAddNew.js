import { Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { useState } from 'react';
import { createUser } from '../sevices/UserSevices'
import { toast } from 'react-toastify';


const ModalAddNew = (props) => {
    const { show, handleClose, handleCreateUser } = props
    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleSaveUser = async () => {
        let res = await createUser(name, job)
        if (res && res.id && name !== '' && job !== '') {
            setName('')
            setJob('')
            toast.success('Tạo thành công!')
            handleCreateUser({ first_name: name, last_name: job, email: `${name}.${job}@gmail.com`, id: res.id })
            handleClose()
        } else {
            toast.error('Thất bại!')
        }
    }

    return (
        <Modal show={show} backdrop='static' keyboard={false}>
            <Modal.Header>
                <Modal.Title>Add new user</Modal.Title>
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
                <Button variant="primary" onClick={handleSaveUser}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalAddNew;