import { Button, Modal } from 'react-bootstrap';
import { deleteUser } from '../sevices/UserSevices'
import { toast } from 'react-toastify';

const ModalConfirm = (props) => {
    const { show, dataUserDelete, handleClose, handleDeleteUser } = props

    const confirmDelete = async () => {
        let res = await deleteUser(dataUserDelete.id)

        if (res && +res.statusCode === 204) {
            toast.success('Xóa thành công!')
            handleClose()
            handleDeleteUser(dataUserDelete)
        } else {
            toast.error('Thất bại!')
        }
    }
    return (
        <Modal show={show} backdrop='static' keyboard={false}>
            <Modal.Header>
                <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn sẽ không thể khôi phục người dùng! Bạn chắn chắn xóa? <b>FirstName : {dataUserDelete.first_name}</b> </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => confirmDelete()}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalConfirm;