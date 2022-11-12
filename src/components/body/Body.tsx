import React from 'react';import { Routes, Route, Navigate } from 'react-router-dom';
import { EmailView } from '../../features/mostEmailed/emailUserView';
import { ShareView } from '../../features/mostShared/sharedUserView';
import { ViewUserView } from '../../features/mostViewed/viewUserView';

const Body = () => {
    return (
        <div>
            <Routes>
                <Route path="/email" element={<EmailView/>} />
                <Route path="/" element={<Navigate replace to="/email" />} />
                <Route path="/share" element={<ShareView/>} />
                <Route path="/view" element={<ViewUserView/>} />
            </Routes>
        </div>
    );
}

export default Body;