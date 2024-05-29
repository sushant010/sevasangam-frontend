import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/Auth';
import './profile.css';
const UpdateProfile = () => {

    const [auth] = useAuth();
    const user = auth?.user;
    return (
        <Layout>
            <section>
                <h2 className='section-heading'> Profile</h2>
                <div className="row">
                    <div className="col-md-4">
                    <table className="table table-light profile">
                    <thead>
                        <tr>
                            <td colSpan="2">
                                <p className='fw-bold text-primary'>Profile Details</p>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {user ? (
                            <>
                                <tr>
                                    <td>Name</td>
                                    <td>{user.name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{user.email}</td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td>{user.phone}</td>
                                </tr>
                                <tr>
                                    <td>Role</td>
                                    <td>{user.role === 0 ? 'User' : user.role === 1 ? 'Admin' : 'Superadmin'}</td>
                                </tr>
                                <tr>
                                    <td>Email Verified</td>
                                    <td>{user.isEmailVerified ? 'Yes' : 'No'}</td>
                                </tr>
                            </>

                        ) : null}

                    </tbody>
                </table>
                    </div>
                </div>
             

                <button type="button" className="btn btn-theme-primary" data-bs-toggle="modal" data-bs-target="#updateProfileModal">
                    Update Profile
                </button>
            </section>
        </Layout>
    );
};

export default UpdateProfile;