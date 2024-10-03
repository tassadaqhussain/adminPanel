import React, { ChangeEvent, FormEvent } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRoles, addUser } from '../api/ApiCollection';

interface AddDataProps {
    slug: string;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    editData?: any; // Optional prop for editing
}

const AddData: React.FC<AddDataProps> = ({ slug, isOpen, setIsOpen, editData }) => {
    const queryClient = useQueryClient(); // Initialize queryClient to invalidate queries

    // State to handle modal visibility
    const [showModal, setShowModal] = React.useState(false);

    // Form data states for user
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState(''); // New password state
    const [role, setRole] = React.useState(''); // New role state
    const [formUserIsEmpty, setFormUserIsEmpty] = React.useState(true);

    // Fetch roles from API using React Query
    const { data: roles, isLoading: rolesLoading, isError: rolesError } = useQuery({
        queryKey: ['roles'], // Changed queryKey to be an array
        queryFn: fetchRoles,
    });

    // Effect to synchronize form fields with `editData`
    React.useEffect(() => {
        if (editData) {
            console.log(editData);
            setName(editData.name || '');
            setEmail(editData.email || '');
            setRole(editData.role && editData.role.length > 0 ? editData.role[0] : '');
            setPassword(''); // Do not pre-fill the password for security reasons
        }
    }, [editData]);

    // Effect to handle modal visibility
    React.useEffect(() => {
        setShowModal(isOpen);
        if (!isOpen) {
            // Reset form fields when modal is closed
            setName('');
            setEmail('');
            setRole('');
            setPassword('');
        }
    }, [isOpen]);


    const isFormValid = () => {
        // For add mode, ensure all fields including password are filled
        if (!editData) {
            return name.trim() !== '' && email.trim() !== '' && role !== '' && password.trim() !== '';
        }

        return name.trim() !== '' && email.trim() !== '' && role!== '';
    };

    // Handle form submission for both add and update operations
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isFormValid()) {
            try {
                if (editData) {
                    // If `editData` is present, update the user
                   // await updateUser(editData.id, { name, email, role });
                    toast.success('User updated successfully!');
                } else {
                    // Call the API to add a new user
                    await addUser(name, email, password, role);
                    toast.success('User added successfully!');
                }

                // Invalidate the 'allusers' query to refetch the user list
                queryClient.invalidateQueries(['allusers']); // Updated to use array format

                // Close the modal and reset form
                setIsOpen(false);
                setShowModal(false);
                setName('');
                setEmail('');
                setPassword(''); // Reset password
                setRole('');
            } catch (error) {
                // Show an error message
                toast.error('Failed to save user');
            }
        }
    };

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/75 z-[99] transition duration-300 ${
                showModal ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative flex flex-col items-stretch gap-5">
                <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
                    <button
                        onClick={() => {
                            setShowModal(false);
                            setIsOpen(false);
                        }}
                        className="absolute top-5 right-3 btn btn-ghost btn-circle"
                    >
                        <HiOutlineXMark className="text-xl font-bold" />
                    </button>
                    <span className="text-2xl font-bold">
                        {editData ? `Edit ${slug}` : `Add new ${slug}`}
                    </span>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4"
                >
                    <input
                        type="text"
                        placeholder="Name"
                        className="input input-bordered w-full"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(element) => setName(element.target.value)}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="input input-bordered w-full"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(element) => setEmail(element.target.value)}
                    />
                    {/* Password field is only visible when adding a new user */}
                    {!editData && (
                        <input
                            type="password"
                            placeholder="Password"
                            className="input input-bordered w-full"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(element) => setPassword(element.target.value)}
                        />
                    )}

                    {/* Roles Dropdown */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Role</span>
                        </div>
                        <select
                            className="select select-bordered"
                            name="role"
                            id="role"
                            value={role}
                            onChange={(element) => setRole(element.target.value)}
                            disabled={rolesLoading || rolesError} // Disable if roles are loading or error occurred
                        >
                            <option disabled selected>
                                {rolesLoading ? 'Loading roles...' : 'Select a role'}
                            </option>
                            {roles?.map((role: any) => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <button
                        className={`mt-5 btn ${!isFormValid() ? 'btn-disabled' : 'btn-primary'} btn-block col-span-full font-semibold`}
                    >
                        {editData ? 'Update' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddData;
