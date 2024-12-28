import React, {FormEvent} from 'react';
import toast from 'react-hot-toast';
import {HiOutlineXMark} from 'react-icons/hi2';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {addInvestment, fetchFarms} from '../../api/ApiCollection.tsx';

interface AddInvestmentProps {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddInvestment: React.FC<AddInvestmentProps> = ({isOpen, setIsOpen}) => {
    const queryClient = useQueryClient();

    // State for form fields
    const [investmentPercentage, setInvestmentPercentage] = React.useState('');
    const [investmentPeriod, setInvestmentPeriod] = React.useState('');
    const [minInvestmentAmount, setMinInvestmentAmount] = React.useState('');
    const [isActive, setIsActive] = React.useState(false);
    const [farmId, setFarmId] = React.useState('');

    // Fetch farm options from the server
    const {data: farms, isLoading: farmsLoading, isError: farmsError} = useQuery({
        queryKey: ['farms'],
        queryFn: fetchFarms,
    });

    // Effect to reset form fields when modal is closed
    React.useEffect(() => {
        if (!isOpen) {
            setInvestmentPercentage('');
            setInvestmentPeriod('');
            setMinInvestmentAmount('');
            setIsActive(false);
            setFarmId('');
        }
    }, [isOpen]);

    // Check if the form is valid
    const isFormValid = () => {
        return (
            investmentPercentage.trim() !== '' &&
            investmentPeriod.trim() !== '' &&
            minInvestmentAmount.trim() !== '' &&
            farmId !== ''
        );
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (isFormValid()) {
            try {
                // Call the API to add a new investment
                await addInvestment({
                    "investment_percentage": investmentPercentage,
                    "investment_period": investmentPeriod,
                    min_investment_amount: minInvestmentAmount,
                    is_active: isActive,
                    farm_id: farmId,
                });
                toast.success('Investment added successfully!');

                // Invalidate cache and close the modal
                queryClient.invalidateQueries({queryKey: ['allprojectConfiguration']});
                setIsOpen(false);
            } catch (error) {
                toast.error('Failed to add investment');
            }
        }
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
                        <HiOutlineXMark className="text-xl font-bold"/>
                    </button>
                    <span className="text-2xl font-bold">Add New Investment</span>
                </div>
                <form onSubmit={handleSubmit} className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <input
                        type="number"
                        placeholder="Investment Percentage"
                        className="input input-bordered w-full"
                        value={investmentPercentage}
                        onChange={(e) => setInvestmentPercentage(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Investment Period"
                        className="input input-bordered w-full"
                        value={investmentPeriod}
                        onChange={(e) => setInvestmentPeriod(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Minimum Investment Amount"
                        className="input input-bordered w-full"
                        value={minInvestmentAmount}
                        onChange={(e) => setMinInvestmentAmount(e.target.value)}
                    />
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                        <span>Is Active</span>
                    </label>
                    <label className="form-control w-full">
                        <span className="label-text">Farm</span>
                        <select
                            className="select select-bordered"
                            value={farmId}
                            onChange={(e) => setFarmId(e.target.value)}
                            disabled={farmsLoading || farmsError}
                        >
                            <option disabled value="">
                                {farmsLoading ? 'Loading farms...' : 'Select a farm'}
                            </option>
                            {farms && farms?.map((farm: any) => (
                                <option key={farm.id} value={farm.id}>
                                    {farm.name}
                                </option>
                            ))}
                        </select>
                    </label>
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

export default AddInvestment;
