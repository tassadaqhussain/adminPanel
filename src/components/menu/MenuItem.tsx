import React from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {IconType} from 'react-icons';
import {useLogout} from '../../hooks/useAuth'; // Import the useLogout hook

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

const MenuItem: React.FC<MenuItemProps> = ({catalog, listItems}) => {
    const navigate = useNavigate();
    const logoutMutation = useLogout();

    const handleMenuItemClick = (url: string | undefined) => {
        if (url === '/login') {
            logoutMutation.mutate();
        } else if (url) {
            // For other menu items, simply navigate to the URL
            navigate(url);
        }
    };

    return (
        <div className="w-full flex flex-col items-stretch gap-2">
            {/* Display catalog title */}
            <span className="hidden xl:block px-2 xl:text-sm 2xl:text-base 3xl:text-lg uppercase">
        {catalog}
      </span>

            {/* Iterate over listItems and render them */}
            {listItems.map((listItem, index) => {
                if (listItem.isLink && listItem.url) {
                    return (
                        <NavLink
                            key={index}
                            to={listItem.url} // URL is passed here
                            className={({isActive}) =>
                                isActive
                                    ? 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-active btn-ghost btn-block justify-start'
                                    : 'btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start'
                            }
                            onClick={() => handleMenuItemClick(listItem.url)} // Handle logout or navigation
                        >
                            <listItem.icon className="xl:text-2xl 2xl:text-3xl 3xl:text-4xl"/>
                            <span className="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
                {listItem.label}
              </span>
                        </NavLink>
                    );
                } else {
                    return (
                        <button
                            key={index}
                            onClick={() => handleMenuItemClick(listItem.url)} // Handle logout or navigation
                            className="btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start"
                        >
                            <listItem.icon className="xl:text-2xl 2xl:text-3xl 3xl:text-4xl"/>
                            <span className="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
                {listItem.label}
              </span>
                        </button>
                    );
                }
            })}
        </div>
    );
};

export default MenuItem;
