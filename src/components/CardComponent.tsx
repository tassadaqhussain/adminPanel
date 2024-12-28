

interface CardComponentProps {
    title: string;
    value: string | number;
    description?: string;
    icon: React.ReactNode;
}

const CardComponent: React.FC<CardComponentProps> = ({ title, value, description, icon }) => {
    return (
        <div className="box col-span-full sm:col-span-1 xl:col-span-1 3xl:row-span-2 p-4 shadow-lg rounded-lg bg-white border border-gray-200">
            <div className="">
                <div className="flex items-center gap-2 mb-2">
                    <div className="text-blue-600 text-2xl">
                        {icon}
                    </div>
                    <span className="text-[16px] xl:text-[20px] font-semibold text-gray-800">
                        {title}
                    </span>
                </div>
                <span className="text-xl xl:text-2xl font-bold text-blue-600">
                    {value}
                </span>
                {description && (
                    <p className="text-sm text-gray-600 mt-2">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
};

export default CardComponent;
