import { useEffect, useState } from 'react';
import { Table, Container } from 'react-bootstrap';
import { fetchAllUser } from '../sevices/UserSevices';
import ReactPaginate from 'react-paginate';
import ModalAddNew from '../component/ModalAddNew'
import ModalEditUser from '../component/ModalEditUser'
import ModalConfirm from '../component/ModalConfirm'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { IoIosAddCircle } from 'react-icons/io'
import { BiExport, BiImport } from 'react-icons/bi'
import _, { debounce } from 'lodash'
import { CSVLink } from "react-csv";
import Papa from 'papaparse'
import { toast } from 'react-toastify'



const TableUser = () => {
    const [listUser, setListUser] = useState([])
    const [totalUsers, setTotalUsers] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [showModalAddNew, setShowModalAddNew] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');

    const [exportData, setExportData] = useState([]);

    useEffect(() => {
        getUsers(1)
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page)

        if (res && res.data) {
            setTotalUsers(res.total)
            setListUser(res.data)
            setTotalPages(res.total_pages)
        }
    }
    const handleClose = () => {
        setShowModalAddNew(false)
        setShowModalEdit(false)
        setShowModalDelete(false)
    };
    const handleShow = () => setShowModalAddNew(true)
    const handlePageClick = (event) => {
        getUsers(+event.selected + 1)
    };
    const handleCreateUser = (user) => {
        setListUser([user, ...listUser])
    }
    const handleEditUserModal = (user) => {
        setDataUserEdit(user)
        setShowModalEdit(true)
    }
    const handleDeleteUserModal = (user) => {
        setShowModalDelete(true)
        setDataUserDelete(user)
    }
    const handleDeleteUser = (user) => {
        let copyListUser = _.cloneDeep(listUser)
        copyListUser = copyListUser.filter(item => item.id !== user.id)
        setListUser(copyListUser)
    }
    const handleEditNewUser = (user) => {
        let copyListUser = _.cloneDeep(listUser)
        let index = listUser.findIndex(item => item.id === user.id)
        copyListUser[index].first_name = user.first_name
        copyListUser[index].last_name = user.last_name
        setListUser(copyListUser)
    }
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy); setSortField(sortField)

        let copyListUser = _.cloneDeep(listUser)
        copyListUser = _.orderBy(copyListUser, [sortField], [sortBy])
        setListUser(copyListUser)

    }
    const handleSearch = debounce((e) => {
        let result = e.target.value;
        if (result) {
            let copyListUser = _.cloneDeep(listUser)
            copyListUser = copyListUser.filter(item => item.first_name.toLowerCase().includes(result))
            setListUser(copyListUser)
        } else {
            getUsers(1)
        }
    }, 500)
    const getUsersExport = (e, done) => {
        let result = []
        if (listUser && listUser.length > 0) {
            result.push(['Id', 'Email', 'First name', 'Last name'])
            listUser.map((item) => {
                let arr = []
                arr[0] = item.id
                arr[1] = item.email
                arr[2] = item.first_name
                arr[3] = item.last_name
                result.push(arr)
            })

            setExportData(result)
            done()
        }
    }
    const handleImportCSV = (e) => {
        if (e.target && e.target.files && e.target.files[0]) {
            let file = e.target.files[0]

            if (file.type !== 'text/csv') {
                toast.error('Chỉ chấp nhận file CSV')
                return;
            }

            Papa.parse(file, {
                // header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (rawCSV[0][0] !== 'email'
                                || rawCSV[0][1] !== 'first_name'
                                || rawCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('Sai định dạng Header CSV!')
                            } else {
                                let result = [];
                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0]
                                        obj.first_name = item[1]
                                        obj.last_name = item[2]
                                        result.push(obj);
                                    }
                                })
                                setListUser(result)
                            }
                        } else {
                            toast.error('Sai định dạng CSV!')
                        }
                    } else {
                        toast.error('Không có dữ liệu!')
                    }
                }
            });
        }

    }
    return (
        <Container>
            <div className='my-3 d-flex justify-content-between'>
                <b>List Users:</b>
                <div className='d-flex gap-2'>
                    <label htmlFor='import' className='btn btn-secondary'>Import <BiImport /></label>
                    <input
                        id='import'
                        type='file'
                        hidden
                        onChange={(e) => handleImportCSV(e)}
                    />

                    <CSVLink
                        data={exportData}
                        asyncOnClick={true}
                        onClick={getUsersExport}
                        filename={"users.csv"}
                        className="btn btn-dark"
                    >Export <BiExport />
                    </CSVLink>
                    <button
                        className='btn btn-success'
                        onClick={handleShow}
                    >
                        Add new
                        <IoIosAddCircle className='mx-2' />
                    </button>
                </div>
            </div>
            <div className='cus-table'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className='d-flex justify-content-between'>
                                <span>ID</span>
                                <span style={{ cursor: 'pointer' }}>
                                    <AiOutlineArrowDown
                                        onClick={() => handleSort('desc', 'id')}
                                    />
                                    <AiOutlineArrowUp
                                        onClick={() => handleSort('asc', 'id')}
                                    />
                                </span>
                            </th>
                            <th>Email</th>
                            <th>
                                <div className=' d-sm-flex justify-content-between'>
                                    <div>First Name</div>
                                    <div>
                                        <input
                                            className='border rounded-3'
                                            placeholder='Search user by firstName...'
                                            onChange={(e) => handleSearch(e)}
                                        />
                                    </div>
                                </div>
                            </th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser && listUser.length > 0 &&
                            listUser.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                className='btn btn-success mx-3'
                                                onClick={() => handleEditUserModal(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className='btn btn-danger'
                                                onClick={() => handleDeleteUserModal(item)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"

                pageClassName='page-item a'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakClassName='page-item'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModalAddNew
                show={showModalAddNew}
                handleClose={handleClose}
                handleCreateUser={handleCreateUser}
            />
            <ModalEditUser
                show={showModalEdit}
                dataUserEdit={dataUserEdit}
                handleClose={handleClose}
                handleEditNewUser={handleEditNewUser}
            />
            <ModalConfirm
                show={showModalDelete}
                dataUserDelete={dataUserDelete}
                handleClose={handleClose}
                handleDeleteUser={handleDeleteUser}
            />
        </Container>
    );
}

export default TableUser;