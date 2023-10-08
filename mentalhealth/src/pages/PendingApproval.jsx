import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebase-config'; // Adjust the path
import { ref, get } from 'firebase/database';
import './PendingApproval.css';

function PendingApproval() {
    const navigate = useNavigate();
    const intervalRef = useRef(null); // To hold reference of the interval

    useEffect(() => {
        const checkAccess = async () => {
            // Ensure there's a logged-in user
            if (auth.currentUser) {
                const uid = auth.currentUser.uid;

                // Create a reference to the user's "access" field in the database
                const accessRef = ref(db, 'users/' + uid + '/access');

                try {
                    const snapshot = await get(accessRef);

                    if (snapshot.exists()) {
                        const access = snapshot.val();
                        
                        if (access === 1) {
                            clearInterval(intervalRef.current); // Clear interval once the desired condition is met
                            navigate('/profhome');
                        } else if (access === 0) {
                            clearInterval(intervalRef.current); // Clear interval once the desired condition is met
                        }
                    } else {
                        console.error("Access field not found for user:", uid);
                    }
                } catch (error) {
                    console.error("Error checking access field:", error);
                }
            }
        };

        intervalRef.current = setInterval(checkAccess, 10000); // Check every 10 seconds

        return () => {
            clearInterval(intervalRef.current); // Clear the interval if the component unmounts
        };
    }, [navigate]); // Execute only once when the component mounts

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
