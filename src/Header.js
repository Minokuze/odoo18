import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import MenuSide from './MenuSide';
import SearchBox from './SearchBox';
import SettingsPage from './SettingsPage'; // Import SettingsPage

function Header() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);
    const [activeComponent, setActiveComponent] = useState('SearchBox'); // Default to SearchBox

    // Function to toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarVisible((prev) => !prev);
    };

    // Function to set the active component
    const showComponent = (component) => {
        setActiveComponent(component);
    };

    // Function to handle window resizing
    const handleWindowResize = () => {
        if (window.innerWidth < 800) {
            setIsSidebarVisible(false); // Hide sidebar when width is below 800px
        } else {
            setIsSidebarVisible(true); // Show sidebar when width is above 800px
        }
    };

    useEffect(() => {
        // Call handleWindowResize on initial render
        handleWindowResize();

        // Add resize event listener
        window.addEventListener('resize', handleWindowResize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', handleWindowResize);
    }, []);

    return (
        <div className="flex flex-column w-full">
            {/* Header Bar */}
            <div className="flex justify-content-between bg-primary-400" style={{ height: '80px' }}>
                <div className="flex align-items-center justify-content-start m-2" style={{ width: '100%' }}>
                    <Button
                        icon="pi pi-bars"
                        className="p-button-rounded no-background m-3"
                        aria-label="Toggle Sidebar"
                        onClick={toggleSidebar}
                        style={{ color: 'white', backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                    />
                    <span style={{ color: 'white', fontSize: '24px' }}>SearchCO</span>
                </div>

                <div className="flex align-items-center px-3">
                    <Button
                        icon="pi pi-sign-out" // Logout icon
                        severity="info"
                        outlined
                        className="p-button-text p-button-rounded p-button-primary"
                        style={{ backgroundColor: 'white', color: 'var(--primary-color)' }}
                    />
                </div>
            </div>

            {/* Sidebar and Main Content */}
            <div className="flex">
                <MenuSide
                    sidebarVisibility={isSidebarVisible}
                    toggleComponent={showComponent} // Pass the function to toggle active component
                />
                <div className="flex-grow-1 p-5 bg-primary-50">
                    {/* Conditionally render components based on activeComponent */}
                    {activeComponent === 'SearchBox' && <SearchBox />}
                    {activeComponent === 'SettingsPage' && <SettingsPage />}
                </div>
            </div>
        </div>
    );
}
export default Header