import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu'; // Import the Menu component for dropdown

export default function Header({ toggleSidebar }) {
    const [menuVisible, setMenuVisible] = useState(false);

    // Menu items for dropdown (Profile and Log Out options)
    const items = [
        {
            label: 'Profile',
            icon: 'pi pi-user',
            command: () => { console.log('Profile clicked'); } // Replace with actual action
        },
        {
            label: 'Log Out',
            icon: 'pi pi-sign-out',
            command: () => { console.log('Log Out clicked'); } // Replace with actual log out functionality
        }
    ];

    return (
        <div className="flex w-full justify-content-between bg-primary-400 border-round-xl" style={{ height: '80px' }}>
            {/* Left Side: Toggle Sidebar and Title */}
            <div className="flex align-items-center justify-content-start w-full m-2">
                <Button 
                    icon="pi pi-bars" 
                    className="p-button-rounded no-background m-3" 
                    aria-label="Toggle Sidebar" 
                    onClick={toggleSidebar} 
                    style={{ color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }} 
                />
                <span className="font-bold text-xl text-white">Company Registration Lookup</span>
            </div>

            {/* Right Side: User Menu Dropdown */}
            <div className="flex align-items-center px-3">
                {/* User Menu Button */}
                <Button 
                    icon="pi pi-user" 
                    className="p-button-rounded p-button-text p-button-primary" 
                    aria-label="User Menu"
                    onClick={() => setMenuVisible(!menuVisible)} 
                    style={{ backgroundColor: 'transparent', color: 'white', border: 'none', cursor: 'pointer' }} 
                />
                
                {/* Menu Component */}
                <Menu model={items} popup visible={menuVisible} onHide={() => setMenuVisible(false)} />
            </div>
        </div>
    );
}
