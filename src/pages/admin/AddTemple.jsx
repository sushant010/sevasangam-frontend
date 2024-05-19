import Layout from '../../components/layout/Layout'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';

const AddTemple = () => {

    const [auth] = useAuth();

    const navigate = useNavigate();

    const api = import.meta.env.VITE_API_URL;

    // const initialState = {
    //     templeName: '',
    //     typeOfOrganization: '',
    //     description: '',
    //     createdBy: '',
    //     contactPerson: {
    //         name: '',
    //         email: '',
    //         mobile: ''
    //     },
    //     location: {
    //         address: '',
    //         country: ''
    //     },
    //     images: {
    //         logo: '',
    //         templeBannerImage: [],
    //         templeImages: []
    //     },
    //     bankDetails: {
    //         bankName: '',
    //         branch: '',
    //         accountHolderName: '',
    //         accountNumber: '',
    //         ifscCode: '',
    //         routingNumber: '',
    //         swiftBicCode: ''
    //     },
    //     taxInformation: {
    //         taxId: '',
    //         ein: ''
    //     },
    //     website: '',
    //     socialMedia: {
    //         facebook: '',
    //         twitter: '',
    //         instagram: ''
    //     },
    //     upcomingEvents: []
    // };


    const initialState = {
        templeName: 'Sample Temple',
        typeOfOrganization: 'Non-Profit',
        description: 'This is a sample temple description.',
        createdBy: '', // Sample user ID
        contactPerson: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            mobile: '+1234567890'
        },
        location: {
            address: '123 Main Street',
            country: 'United States'
        },
        images: {
            logo: '',
            templeBannerImage: '',
            templeImages: [],
        },
        bankDetails: {
            bankName: 'Sample Bank',
            branch: 'Main Branch',
            accountHolderName: 'John Doe',
            accountNumber: '1234567890',
            ifscCode: 'SAMPLEIFSC123',
            routingNumber: 'SAMPLE123456',
            swiftBicCode: 'SWIFTBICCODE'
        },
        taxInformation: {
            taxId: '123456789',
            ein: 'EIN123456789'
        },
        website: 'https://sampletemple.com',
        socialMedia: {
            facebook: 'https://www.facebook.com/sampletemple',
            twitter: 'https://twitter.com/sampletemple',
            instagram: 'https://www.instagram.com/sampletemple'
        },
        upcomingEvents: [
            {
                title: 'Event 1',
                date: '2024-06-01',
                location: 'Sample Location 1'
            },
            {
                title: 'Event 2',
                date: '2024-07-15',
                location: 'Sample Location 2'
            }
        ]
    };


    const [temple, setTemple] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const keys = name.split('.');

        if (files) {
            const filePath = URL.createObjectURL(files[0]);
            if (keys.length === 1) {
                setTemple(prevTemple => ({
                    ...prevTemple,
                    [name]: filePath
                }));
            } else {
                const [key, subkey] = keys;
                setTemple(prevTemple => ({
                    ...prevTemple,
                    [key]: {
                        ...prevTemple[key],
                        [subkey]: filePath
                    }
                }));
            }
        } else {
            if (keys.length === 1) {
                setTemple(prevTemple => ({
                    ...prevTemple,
                    [name]: value
                }));
            } else {
                const [key, subkey] = keys;
                setTemple(prevTemple => ({
                    ...prevTemple,
                    [key]: {
                        ...prevTemple[key],
                        [subkey]: value
                    }
                }));
            }
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            console.log(temple);
            Object.keys(temple).forEach(key => {
                if (typeof temple[key] === 'object' && temple[key] !== null && !Array.isArray(temple[key])) {
                    Object.keys(temple[key]).forEach(subKey => {
                        formData.append(`${key}.${subKey}`, temple[key][subKey]);
                    });
                } else {
                    if (key == 'createdBy') {
                        formData.append(key, auth.user._id);
                    } else {
                        formData.append(key, temple[key]);
                    }

                }
            });

            const res = await axios.post(`${api}/temple/create-temple`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                toast.success(res.data.message);
                setTemple(initialState);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while creating the temple.');
        }
    };

    return (
        <Layout>

            <section className='d-flex justify-content-center'>
                <div className="custom-form">

                    <div className="section-heading">
                        Add Temple
                    </div>


                    <form className="row" onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <input
                                placeholder="Temple Name"
                                type="text"
                                name="templeName"
                                onChange={handleChange}
                                value={temple.templeName}
                                className="form-control"
                                id="templeName"
                            />
                        </div>



                        <div className="mb-3">
                            <input
                                placeholder="Type of Organization"
                                type="text"
                                name="typeOfOrganization"
                                onChange={handleChange}
                                value={temple.typeOfOrganization}
                                className="form-control"
                                id="typeOfOrganization"
                            />
                        </div>
                        <div className="mb-3">
                            <textarea
                                placeholder="Description"
                                name="description"
                                onChange={handleChange}
                                value={temple.description}
                                className="form-control"
                                id="description"
                            />
                        </div>
                        <div className="mb-3">
                            <h3 className='text-primary fw-bold text-md'>Contact Person</h3>
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Contact Person Name"
                                type="text"
                                name="contactPerson.name"
                                onChange={handleChange}
                                value={temple.contactPerson.name}
                                className="form-control"
                                id="contactPersonName"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Contact Person Email"
                                type="email"
                                name="contactPerson.email"
                                onChange={handleChange}
                                value={temple.contactPerson.email}
                                className="form-control"
                                id="contactPersonEmail"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Contact Person Mobile"
                                type="text"
                                name="contactPerson.mobile"
                                onChange={handleChange}
                                value={temple.contactPerson.mobile}
                                className="form-control"
                                id="contactPersonMobile"
                            />
                        </div>
                        <div className="mb-3">
                            <h3 className='text-primary fw-bold text-md'>Location</h3>
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Location Address"
                                type="text"
                                name="location.address"
                                onChange={handleChange}
                                value={temple.location.address}
                                className="form-control"
                                id="locationAddress"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Location Country"
                                type="text"
                                name="location.country"
                                onChange={handleChange}
                                value={temple.location.country}
                                className="form-control"
                                id="locationCountry"
                            />
                        </div>
                        <div className="mb-3">
                            <h3 className='text-primary fw-bold text-md'>Images</h3>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="logo">Logo Image</label>
                            <input
                                className="form-control"
                                id="logo"
                                placeholder="Logo Image"
                                type="file"
                                name="images.logo"
                                accept="image/*"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="templeBannerImage">Temple Banner Image</label>
                            <input
                                placeholder="Temple Banner Images URLs (comma separated)"
                                type="file"
                                name="images.templeBannerImage"
                                onChange={handleChange}

                                className="form-control"
                                id="templeBannerImage"
                                accept="image/*"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="templeImages">Temple Image</label>
                            <input
                                placeholder="Temple Images URLs (comma separated)"
                                type="file"
                                name="images.templeImages"
                                onChange={handleChange}

                                className="form-control"
                                id="templeImages"
                                accept="image/*"
                                multiple
                            />
                        </div>
                        <div className="mb-3">
                            <h3 className='text-primary fw-bold text-md'>Bank Details</h3>
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Bank Name"
                                type="text"
                                name="bankDetails.bankName"
                                onChange={handleChange}
                                value={temple.bankDetails.bankName}
                                className="form-control"
                                id="bankName"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Branch"
                                type="text"
                                name="bankDetails.branch"
                                onChange={handleChange}
                                value={temple.bankDetails.branch}
                                className="form-control"
                                id="branch"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Account Holder Name"
                                type="text"
                                name="bankDetails.accountHolderName"
                                onChange={handleChange}
                                value={temple.bankDetails.accountHolderName}
                                className="form-control"
                                id="accountHolderName"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Account Number"
                                type="text"
                                name="bankDetails.accountNumber"
                                onChange={handleChange}
                                value={temple.bankDetails.accountNumber}
                                className="form-control"
                                id="accountNumber"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="IFSC Code"
                                type="text"
                                name="bankDetails.ifscCode"
                                onChange={handleChange}
                                value={temple.bankDetails.ifscCode}
                                className="form-control"
                                id="ifscCode"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Routing Number"
                                type="text"
                                name="bankDetails.routingNumber"
                                onChange={handleChange}
                                value={temple.bankDetails.routingNumber}
                                className="form-control"
                                id="routingNumber"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="SWIFT/BIC Code"
                                type="text"
                                name="bankDetails.swiftBicCode"
                                onChange={handleChange}
                                value={temple.bankDetails.swiftBicCode}
                                className="form-control"
                                id="swiftBicCode"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Tax ID"
                                type="text"
                                name="taxInformation.taxId"
                                onChange={handleChange}
                                value={temple.taxInformation.taxId}
                                className="form-control"
                                id="taxId"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="EIN"
                                type="text"
                                name="taxInformation.ein"
                                onChange={handleChange}
                                value={temple.taxInformation.ein}
                                className="form-control"
                                id="ein"
                            />
                        </div>
                        <div className="mb-3">
                            <h3 className='text-primary fw-bold text-md'>Social</h3>
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Website"
                                type="text"
                                name="website"
                                onChange={handleChange}
                                value={temple.website}
                                className="form-control"
                                id="website"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Facebook URL"
                                type="text"
                                name="socialMedia.facebook"
                                onChange={handleChange}
                                value={temple.socialMedia.facebook}
                                className="form-control"
                                id="facebook"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Twitter URL"
                                type="text"
                                name="socialMedia.twitter"
                                onChange={handleChange}
                                value={temple.socialMedia.twitter}
                                className="form-control"
                                id="twitter"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                placeholder="Instagram URL"
                                type="text"
                                name="socialMedia.instagram"
                                onChange={handleChange}
                                value={temple.socialMedia.instagram}
                                className="form-control"
                                id="instagram"
                            />
                        </div>
                        {/* <div className="mb-3">
                        <textarea
                            placeholder="Upcoming Events (JSON format)"
                            name="upcomingEvents"
                            onChange={handleChange}
                            value={JSON.stringify(temple.upcomingEvents)}
                            className="form-control"
                            id="upcomingEvents"
                        />
                    </div> */}
                        <button type="submit" className="btn btn-theme-primary">Submit</button>
                    </form>
                </div>
            </section >
        </Layout >
    )
}

export default AddTemple;