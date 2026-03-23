import axios from 'axios';

const BASE_URL = 'http://localhost:9000/api';
const ADMIN_API_URL = `${BASE_URL}/admin`;
const TEACHER_API_URL = `${BASE_URL}/teacher`; // Assumption: Adjust if your URL is different
const STUDENT_API_URL = `${BASE_URL}/student`; // Assumption: Adjust if your URL is different

// --- Configuration ---
const mainAdminCredentials = {
    email: 'dean@college.com',
    password: 'Admin@123'
};

const subAdminData = {
    email: 'hod.cs@college.com',
    password: 'HOD@123',
    firstName: 'HOD',
    lastName: 'CS',
    phoneNumber: '9876543210',
    department: 'Computer Science'
};

const teacherData = {
    email: 'teacher.cs@college.com',
    password: 'Teacher@123',
    firstName: 'John',
    lastName: 'Doe',
    phoneNumber: '9876543211',
    department: 'Computer Science'
};

const studentData = {
    email: 'student.cs@college.com',
    password: 'Student@123',
    firstName: 'Jane',
    lastName: 'Smith',
    phoneNumber: '9876543212',
    department: 'Computer Science',
    year: 2,
    rollNumber: 'CS-001'
};

// --- Helper Functions ---

/**
 * Logs in a user and returns the auth token.
 * @param {string} loginUrl - The full URL for the login endpoint.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 * @returns {Promise<string|null>} The auth token, or null if login fails.
 */
async function login(loginUrl, email, password) {
    try {
        console.log(`\n🔑 Logging in as ${email}...`);
        const loginResponse = await axios.post(loginUrl, { email, password });
        const token = loginResponse.data.data.token; // Adjust if token path is different for roles
        if (!token) {
            console.error(`❌ Login successful for ${email}, but no token was found in the response.`);
            return null;
        }
        console.log(`✅ Login successful for ${email}!`);
        return token;
    } catch (error) {
        console.error(`❌ Error logging in as ${email}:`, error.response ? error.response.data : error.message);
        return null;
    }
}

/**
 * Generic function to create a user.
 * @param {string} endpoint - The API endpoint for user creation.
 * @param {object} userData - The data for the new user.
 * @param {string} token - The admin's auth token.
 * @param {string} userType - A string describing the user type (e.g., "Sub Admin").
 */
async function createUser(endpoint, userData, token, userType) {
    console.log(`\n👤 Creating ${userType} (${userData.email})...`);
    try {
        const createResponse = await axios.post(`${ADMIN_API_URL}/${endpoint}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(`✅ ${userType} created successfully!`);
        console.log(createResponse.data);
    } catch (error) {
        if (error.response && error.response.status === 409) {
            console.log(`⚠️ ${userType} already exists, proceeding...`);
        } else {
            console.error(`❌ Error creating ${userType}:`, error.response ? error.response.data : error.message);
        }
    }
}

/**
 * Main test execution function.
 */
async function testUserCreation() {
    try {
        // 1. Login as Main Admin to get a token for creating other users
        const adminToken = await login(
            `${ADMIN_API_URL}/login`,
            mainAdminCredentials.email,
            mainAdminCredentials.password
        );

        if (!adminToken) {
            console.error("❌ Main admin login failed. This could be due to an incorrect password in the script, or the user having a different password in the database.");
            console.error("   Please verify the credentials for 'dean@college.com'. Aborting script.");
            return;
        }

        // 2. Create users for different roles
        await createUser('sub-admin', subAdminData, adminToken, 'Sub Admin');
        // NOTE: Assuming '/teachers' is the endpoint for creating teachers. Please adjust if incorrect.
        await createUser('teachers', teacherData, adminToken, 'Teacher');
        // NOTE: Assuming '/students' is the endpoint for creating students. Please adjust if incorrect.
        await createUser('students', studentData, adminToken, 'Student');

        // 3. Verify creation by logging in as each new user
        console.log('\n\n--- Verifying User Logins ---');
        const subAdminLoginToken = await login(
            `${ADMIN_API_URL}/login`,
            subAdminData.email,
            subAdminData.password
        );
        if (subAdminLoginToken) {
            // You can add further checks here, e.g., fetching role-specific data
        }

        // NOTE: Assumes teacher login is at /api/teacher/login. Adjust if incorrect.
        const teacherLoginToken = await login(
            `${TEACHER_API_URL}/login`,
            teacherData.email,
            teacherData.password
        );
        if (teacherLoginToken) {
            // Further checks for teacher
        }

        // NOTE: Assumes student login is at /api/student/login. Adjust if incorrect.
        const studentLoginToken = await login(
            `${STUDENT_API_URL}/login`,
            studentData.email,
            studentData.password
        );
        if (studentLoginToken) {
            // Further checks for student
        }

        // 4. List Sub Admins (as an example of an admin-only action)
        console.log('\n📋 Fetching all Sub Admins...');
        try {
            const listResponse = await axios.get(`${ADMIN_API_URL}/sub-admins`, {
                headers: {
                    Authorization: `Bearer ${adminToken}`
                }
            });
            console.log('✅ Sub Admins list fetched successfully:');
            console.log(listResponse.data.data);
        } catch (error) {
            console.error('❌ Error fetching sub-admins:', error.response ? error.response.data : error.message);
        }

    } catch (error) {
        console.error('❌ An unexpected error occurred during the test script execution:');
        console.error(error.response ? error.response.data : error.message);
    }
}

testUserCreation();
