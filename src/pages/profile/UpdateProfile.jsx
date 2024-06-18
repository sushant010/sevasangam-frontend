import TrendingPopularRecentlyCreatedTemples from '../../components/TrendingPopularRecentlyCreatedTemples';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../context/Auth';
import UserDonations from '../donation/UserDonations';
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
                                            <td>{user.phone ? user.phone : "No Phone Number"}</td>
                                        </tr>
                                        {/* <tr>
                                            <td>Role</td>
                                            <td>{user.role === 0 ? 'User' : user.role === 1 ? 'Admin' : 'Superadmin'}</td>
                                        </tr> */}

                                        <tr>
                                            <td>Avatar</td>
                                            <td> {auth.user.avatar ? <div style={{ marginRight: "8px" }} className='avatar-wrapper'>
                                                <img src={auth.user.avatar ? auth.user.avatar : "https://i.pinimg.com/1200x/49/da/b2/49dab2d4d9be840f6aae7d575353cb48.jpg"} alt='avatar' />
                                            </div> : <span>No Avatar set</span>} </td>

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
            <UserDonations></UserDonations>
            <TrendingPopularRecentlyCreatedTemples></TrendingPopularRecentlyCreatedTemples>
        </Layout>
    );
};

export default UpdateProfile;