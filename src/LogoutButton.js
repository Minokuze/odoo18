import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

export default function ProfileButton() {
    const [selectedAction, setSelectedAction] = useState(null);
    const actions = [
        { label: 'Profile', icon: 'pi pi-user', value: 'profile' },
        { label: 'Sign Out', icon: 'pi pi-sign-out', value: 'signOut' }
    ];

    const handleActionChange = (e) => {
        setSelectedAction(e.value);
        // You can implement the action logic here, e.g., navigate to Profile or Sign Out
        if (e.value === 'signOut') {
            console.log('Signing out...');
            // Implement the sign-out functionality here
        } else if (e.value === 'profile') {
            console.log('Opening Profile...');
            // Implement the profile logic here
        }
    };

    return (
        <div>
            <Dropdown
                value={selectedAction}
                options={actions}
                onChange={handleActionChange}
                optionLabel="label"
                optionIcon="icon"
                placeholder="Select Action"
                className="p-button-rounded p-button-text"
            />
        </div>
    );
}
