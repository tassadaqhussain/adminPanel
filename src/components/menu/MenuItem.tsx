import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';
import { useLogout } from '../../hooks/useAuth';

interface MenuItemProps {
    onClick?: () => void;
    catalog: string;
    listItems: Array<{
        isLink: boolean;
        url?: string;
        icon: IconType;
        label: string;
        onClick?: () => void;
    }>;
}

const MenuItem: React.FC<MenuItemProps> = ({ catalog, listItems }) => {
    const navigate = useNavigate();
    const logoutMutation = useLogout();

    const handleMenuItemClick = (url: string | undefined) => {
        if (url === '/login') {
            logoutMutation.mutate();
        } else if (url) {
            navigate(url);
        }
    };

    return (
        <div className="w-full flex flex-col items-stretch gap-4">
            {/* Catalog Title */}
            <span className="hidden xl:block px-3 xl:text-sm 2xl:text-base 3xl:text-lg font-semibold text-gray-600 uppercase truncate">
                {catalog}
            </span>

            {/* Render Menu Items */}
            {listItems.map((listItem, index) => {
                const commonClasses =
                    'flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300';

                const activeClasses = 'bg-indigo-600 text-white';
                const inactiveClasses =
                    'hover:bg-indigo-100 text-gray-700';

                const textClasses =
                    'xl:text-sm 2xl:text-base 3xl:text-lg capitalize truncate';

                if (listItem.isLink && listItem.url) {
                    return (
                        <NavLink
                            key={index}
                            to={listItem.url}
                            className={({ isActive }) =>
                                `${commonClasses} ${
                                    isActive ? activeClasses : inactiveClasses
                                }`
                            }
                            onClick={() => handleMenuItemClick(listItem.url)}
                        >
                            <listItem.icon className="xl:text-2xl 2xl:text-3xl 3xl:text-4xl" />
                            <span className={textClasses}>{listItem.label}</span>
                        </NavLink>
                    );
                } else {
                    return (
                        <button
                            key={index}
                            onClick={() => handleMenuItemClick(listItem.url)}
                            className={`${commonClasses} ${inactiveClasses}`}
                        >
                            <listItem.icon className="xl:text-2xl 2xl:text-3xl 3xl:text-4xl" />
                            <span className={textClasses}>{listItem.label}</span>
                        </button>
                    );
                }
            })}
        </div>
    );
};

export default MenuItem;
