import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';

export default function SettingsPage() {
    const [username, setUsername] = useState('John Doe');
    const [email, setEmail] = useState('johndoe@example.com');
    const [theme, setTheme] = useState('Light');
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        push: true,
    });

    const themeOptions = [
        { label: 'Light', value: 'Light' },
        { label: 'Dark', value: 'Dark' },
        { label: 'System Default', value: 'System' },
    ];

    const handleSave = () => {
        console.log('Settings Saved:', { username, email, theme, notifications });
        // Add logic to save settings, e.g., API call.
    };

    return (
        <div className="p-5 surface-card shadow-2 border-round-xl mt-3">
            <h2 className="text-primary">Settings</h2>

            <div className="my-4">
                <h3 className="text-700">Profile</h3>
                <div className="flex flex-column gap-3">
                    <div className="field">
                        <label htmlFor="username" className="block font-medium mb-2">
                            Username
                        </label>
                        <InputText
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full"
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email" className="block font-medium mb-2">
                            Email Address
                        </label>
                        <InputText
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="my-4">
                <h3 className="text-700">Preferences</h3>
                <div className="flex flex-column gap-3">
                    <div className="field">
                        <label htmlFor="theme" className="block font-medium mb-2">
                            Theme
                        </label>
                        <Dropdown
                            id="theme"
                            value={theme}
                            options={themeOptions}
                            onChange={(e) => setTheme(e.value)}
                            placeholder="Select a theme"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            <div className="my-4">
                <h3 className="text-700">Notifications</h3>
                <div className="flex flex-column gap-2">
                    <div className="flex align-items-center">
                        <Checkbox
                            inputId="email-notifications"
                            checked={notifications.email}
                            onChange={(e) =>
                                setNotifications((prev) => ({ ...prev, email: e.checked }))
                            }
                        />
                        <label htmlFor="email-notifications" className="ml-2">
                            Email Notifications
                        </label>
                    </div>
                    <div className="flex align-items-center">
                        <Checkbox
                            inputId="sms-notifications"
                            checked={notifications.sms}
                            onChange={(e) =>
                                setNotifications((prev) => ({ ...prev, sms: e.checked }))
                            }
                        />
                        <label htmlFor="sms-notifications" className="ml-2">
                            SMS Notifications
                        </label>
                    </div>
                    <div className="flex align-items-center">
                        <Checkbox
                            inputId="push-notifications"
                            checked={notifications.push}
                            onChange={(e) =>
                                setNotifications((prev) => ({ ...prev, push: e.checked }))
                            }
                        />
                        <label htmlFor="push-notifications" className="ml-2">
                            Push Notifications
                        </label>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <Button label="Save Changes" className="p-button-primary" onClick={handleSave} />
            </div>
        </div>
    );
}
