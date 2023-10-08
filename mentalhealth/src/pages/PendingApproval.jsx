import React from 'react';
import './PendingApproval.css';

function PendingApproval() {
    return (
        <div className="pending-approval-container text-center">
            <div className="icon-container">
                <i className="bi bi-hourglass-split"></i>
            </div>
            <h1>Thank You for Registering!</h1>
            <p>Your professional registration is <strong>pending approval</strong>. Once approved, you will be able to log in. Thank you for your patience.</p>
        </div>
    );
}

export default PendingApproval;
