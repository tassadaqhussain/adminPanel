import React, { FormEvent } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { addFarm, fetchUsersAllUers } from '../../api/ApiCollection.tsx';

interface AddFarmModalProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddFarmModal: React.FC<AddFarmModalProps> = ({ isOpen, setIsOpen }) => {
    const queryClient = useQueryClient();

    // State for form fields
    const [location, setLocation] = React.useState('');
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
    const [size, setSize] = React.useState('');
    const [irrigationSource, setIrrigationSource] = React.useState('');
    const [soilType, setSoilType] = React.useState('');
    const [sowingMethod, setSowingMethod] = React.useState('');
    const [seedVariety, setSeedVariety] = React.useState('');
    const [crop, setCrop] = React.useState('');
    const [sowingDate, setSowingDate] = React.useState('');
    const [name, setName] = React.useState('');
    const [farmConfigurations, setFarmConfigurations] = React.useState([{ key: '', value: '' }]);
    const [userId, setUserId] = React.useState('');

    // Fetch users from the server
    const { data: users, isLoading: usersLoading, isError: usersError } = useQuery({
        queryKey: ['users'],
        queryFn: fetchUsersAllUers,
    });

    // Effect to reset form fields when modal is closed
    React.useEffect(() => {
        if (!isOpen) {
            setLocation('');
            setLatitude('');
            setLongitude('');
            setSize('');
            setIrrigationSource('');
            setSoilType('');
            setSowingMethod('');
            setSeedVariety('');
            setCrop('');
            setSowingDate('');
            setName('');
            setFarmConfigurations([{ key: '', value: '' }]);
            setUserId('');
        }
    }, [isOpen]);

    // Check if the form is valid
    const isFormValid = () => {
        return (
            location.trim() !== '' &&
            latitude.trim() !== '' &&
            longitude.trim() !== '' &&
            size.trim() !== '' &&
            irrigationSource.trim() !== '' &&
            soilType.trim() !== '' &&
            sowingMethod.trim() !== '' &&
            seedVariety.trim() !== '' &&
            crop.trim() !== '' &&
            sowingDate.trim() !== '' &&
            farmConfigurations.every((config) => config.key.trim() !== '' && config.value.trim() !== '') &&
            userId.trim() !== ''
        );
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isFormValid()) {
            try {
                // Call the API to add a new farm
                await addFarm({
                    location,
                    latitude,
                    longitude,
                    size,
                    irrigation_source: irrigationSource,
                    soil_type: soilType,
                    sowing_method: sowingMethod,
                    seed_variety: seedVariety,
                    crop,
                    sowing_date: sowingDate,
                    name,
                    farm_configuration: farmConfigurations,
                    user_id: userId,
                });
                toast.success('Farm added successfully!');

                // Invalidate cache and close the modal
                queryClient.invalidateQueries({ queryKey: ['farms'] });
                setIsOpen(false);
            } catch (error) {
                toast.error('Failed to add farm');
            }
        }
    };

    // Handle dynamic addition of farm configuration rows
    const addConfigurationRow = () => {
        setFarmConfigurations([...farmConfigurations, { key: '', value: '' }]);
    };

    const updateConfigurationRow = (index: number, field: 'key' | 'value', value: string) => {
        const newConfigurations = [...farmConfigurations];
        newConfigurations[index][field] = value;
        setFarmConfigurations(newConfigurations);
    };

    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black/75 z-[99] transition duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            <div className="w-[80%] xl:w-[50%] rounded-lg p-7 bg-base-100 relative flex flex-col items-stretch gap-5">
                <div className="w-full flex justify-between pb-5 border-b border-base-content border-opacity-30">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-5 right-3 btn btn-ghost btn-circle"
                    >
                        <HiOutlineXMark className="text-xl font-bold" />
                    </button>
                    <span className="text-2xl font-bold">Add New Farm</span>
                </div>
                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Location"
                        className="input input-bordered w-full"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Latitude"
                        className="input input-bordered w-full"
                        value={latitude}
                        onChange={(e) => setLatitude(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Longitude"
                        className="input input-bordered w-full"
                        value={longitude}
                        onChange={(e) => setLongitude(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Size"
                        className="input input-bordered w-full"
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Irrigation Source"
                        className="input input-bordered w-full"
                        value={irrigationSource}
                        onChange={(e) => setIrrigationSource(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Soil Type"
                        className="input input-bordered w-full"
                        value={soilType}
                        onChange={(e) => setSoilType(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Sowing Method"
                        className="input input-bordered w-full"
                        value={sowingMethod}
                        onChange={(e) => setSowingMethod(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Seed Variety"
                        className="input input-bordered w-full"
                        value={seedVariety}
                        onChange={(e) => setSeedVariety(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Crop"
                        className="input input-bordered w-full"
                        value={crop}
                        onChange={(e) => setCrop(e.target.value)}
                    />
                    <input
                        type="date"
                        className="input input-bordered w-full"
                        value={sowingDate}
                        onChange={(e) => setSowingDate(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Name (Optional)"
                        className="input input-bordered w-full"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label className="form-control w-full">
                        <span className="label-text">User</span>
                        <select
                            className="select select-bordered"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            disabled={usersLoading || usersError}
                        >
                            <option disabled value="">
                                {usersLoading ? 'Loading users...' : 'Select a user'}
                            </option>
                            {users &&
                                users.map((user: any) => (
                                    <option key={user.id} value={user.id}>
                                        {user.name}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <div className="col-span-full">
                        <span className="font-semibold">Farm Configurations</span>
                        {farmConfigurations.map((config, index) => (
                            <div key={index} className="flex gap-4 mt-2">
                                <input
                                    type="text"
                                    placeholder="Key"
                                    className="input input-bordered w-full"
                                    value={config.key}
                                    onChange={(e) => updateConfigurationRow(index, 'key', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Value"
                                    className="input input-bordered w-full"
                                    value={config.value}
                                    onChange={(e) => updateConfigurationRow(index, 'value', e.target.value)}
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-secondary mt-2"
                            onClick={addConfigurationRow}
                        >
                            Add Configuration
                        </button>
                    </div>
                    <button
                        className={`mt-5 btn ${!isFormValid() ? 'btn-disabled' : 'btn-primary'} btn-block col-span-full font-semibold`}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddFarmModal;
