import React from 'react';
import { Ripple } from 'primereact/ripple';

export default function MenuSide({ isSidebarVisible, showComponent }) {
    return (
        <>
            {isSidebarVisible && (
                <div
                    className="surface-section h-screen block flex-shrink-0 border-right-1 surface-border select-none fadeinleft animation-duration-100 "
                    style={{ width: '250px' }}
                >
                    <div className="flex flex-column h-full">
                        <div className="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                            <span className="inline-flex align-items-center gap-2">
                                <span className="font-semibold text-2xl text-primary">Dashboard</span>
                            </span>
                        </div>
                        <div className="overflow-y-auto">
                            <ul className="list-none p-3 m-0">
                                <li>
                                    <ul className="list-none p-0 m-0 overflow-hidden">
                                        <li>
                                            <a
                                                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:bg-cyan-100 transition-duration-150 transition-colors w-full"
                                                onClick={() => showComponent('SearchBox')} // Show SearchBox
                                            >
                                                <i className="pi pi-search mr-2"></i>
                                                <span className="font-medium">Search Company</span>
                                                <Ripple />
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:bg-cyan-100 transition-duration-150 transition-colors w-full"
                                                onClick={() => showComponent('SettingsPage')} // Show SettingsPage
                                            >
                                                <i className="pi pi-cog mr-2"></i>
                                                <span className="font-medium">Settings</span>
                                                <Ripple />
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
