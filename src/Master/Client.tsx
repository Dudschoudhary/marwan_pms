import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUserAsync, editUserAsync, deleteUserAsync } from '../Redux/userSlice';
import { RootState } from '../store/store';
import CustomButton from '../common/CustomButton';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import CustomTable from '../common/CustomTable';
import CustomModal from '../common/CustomModal';
import { AppDispatch } from '../store/store';
import SearchBox from '../common/SearchBox';
import CustomForm from '../common/CustomForm';
import Demo from './Demo';



const Client = () => {

    const dispatch: AppDispatch = useDispatch();
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalTitle, setModalTitle] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const { users, loading, error } = useSelector((state: RootState) => state.user);

    const validationSchema: any = yup.object({
        name: yup.string().required('Client Name is required'),
        coName: yup.string().required('Contact Person is required'),
        contact: yup
            .string()
            .matches(/^[0-9]+$/, 'Contact must be a number')
            .required('Contact is required'),
        description: yup.string(),
    });

    const initialValues = {
        name: '',
        coName: '',
        contact: '',
        description: '',
    };


    const handleSearchChange = (event: any) => {
        setSearchQuery(event.target.value);
    };

    const handleFormSubmit = (values: any, { resetForm }: { resetForm: any }) => {
        if (editingUser) {
            dispatch(editUserAsync({ ...editingUser as any, ...values }));
        } else {
            const userWithId: any = { ...values, id: uuidv4() };
            dispatch(addUserAsync(userWithId));
        }
        setIsModalOpen(false);
        setEditingUser(null);
        resetForm();
    };

    const fields: any = [
        {
            name: 'name',
            label: 'Client Name',
            placeholder: 'Enter Client Name',
            required: '*',
            type: 'text',
        },
        {
            name: 'coName',
            label: 'Contact Person',
            type: 'text',
            placeholder: 'Enter Client Contact Name',
            required: '*'
        },
        {
            name: 'contact',
            label: 'Contact',
            placeholder: 'Enter Client Contact Info.',
            type: 'number',
            required: '*'
        },
        {
            name: 'description',
            type: 'text-area',
            label: 'Brief Description (Optional)',
            placeholder: 'Enter Client Description',
        },
    ];

    const columns = [
        {
            title: 'Client Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Edit',
            key: 'edit',
            render: (_: any, record: any) => (
                <CustomButton
                    title="Edit"
                    className="border border-gray-300 bg-sky-700 text-white hover:bg-gray-100 px-4 py-2 rounded-md"
                    onClick={() => {
                        setIsModalOpen(true);
                        setModalTitle('Edit Client');
                        setEditingUser(record);
                    }}
                />
            ),
        },
        {
            title: 'Delete',
            key: 'delete',
            render: (_: any, record: any) => (
                <CustomButton
                    title="Delete"
                    className="border border-red-500 bg-red-500 text-white hover:bg-red-100 px-4 py-2 rounded-md"
                    onClick={() => {
                        // setIsConfirmModalOpen(true);
                        // setonfirmModalTitle('? Confirm');
                        dispatch(deleteUserAsync(record.id));
                    }}
                />
            ),
        },

    ];

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className="w-full m-auto container">
                <div className="flex justify-between items-center">
                    <h4>Client</h4>

                    <CustomButton
                        title=" + Add User"
                        className="bg-[#3c8dbc] text-white hover:bg-blue-600 px-4 py-5 rounded-md mb"
                        onClick={() => {
                            setModalTitle("Add Client");
                            setIsModalOpen(true);
                        }}
                    />
                </div>
                <SearchBox type="text" value={searchQuery} onChange={handleSearchChange} placeholder='Search by name.... ' className=" flex space-x-5 relative border border-gray-300 rounded w-[300px] py-5" />

                <div className="my-5">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="overflow-x-auto w-full">
                            <CustomTable
                                columns={columns}
                                data={filteredUsers} // Use filtered data
                                className="min-w-full flex-1"
                            />
                        </div>
                    )}
                </div>
                <Demo />
                <CustomModal
                    open={isModalOpen}
                    title={modalTitle}
                    onClose={() => {
                        setEditingUser(null);
                        setIsModalOpen(false);
                    }}

                // className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-6"
                >
                    <CustomForm initialValues={editingUser || initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit} fields={fields} />
                </CustomModal>

            </div>
        </>
    );
};

export default Client;
