import Layout from '../../components/layout/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/Auth';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateTemple = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const api = import.meta.env.VITE_API_URL;
    const [temple, setTemple] = useState({
        templeName: '',
        typeOfOrganization: '',
        description: '',
        contactPerson: {
            name: '',
            email: '',
            mobile: ''
        },
        location: {
            address: '',
            country: ''
        },
        images: {
            logo: '',
            templeBannerImage: '',
            templeImages: [],
        },
        bankDetails: {
            bankName: '',
            branch: '',
            accountHolderName: '',
            accountNumber: '',
            ifscCode: '',
            routingNumber: '',
            swiftBicCode: ''
        },
        taxInformation: {
            taxId: '',
            ein: ''
        },
        website: '',
        socialMedia: {
            facebook: '',
            twitter: '',
            instagram: ''
        },
        upcomingEvents: []
    });

    useEffect(() => {
        const fetchTemple = async () => {
            try {
                const res = await axios.get(`${api}/temple/get-temple/${id}`);
                const { data } = res.data;
                setTemple(data);
                console.log(data)
                setImagePreviews({
                    logo: data.images.logo,
                    banner: data.images.bannerImage,
                    otherImages: data.images.otherImages,
                });

            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch temple details');
            }
        };
        fetchTemple();
    }, [api, id]);

    const [templeLogoImage, setTempleLogoImage] = useState(null);
    const [templeBannerImage, setTempleBannerImage] = useState(null);
    const [templeImages, setTempleImages] = useState([]);

    const [imagePreviews, setImagePreviews] = useState({
        logo: null,
        banner: null,
        otherImages: [],
    });

    const handleTempleLogoImage = (e) => {
        const selectedFile = e.target.files[0];
        setTempleLogoImage(selectedFile);
        setImagePreviews(prev => ({
            ...prev,
            logo: URL.createObjectURL(selectedFile),
        }));
    };

    const handleTempleBannerImage = (e) => {
        const selectedFile = e.target.files[0];
        setTempleBannerImage(selectedFile);
        setImagePreviews(prev => ({
            ...prev,
            banner: URL.createObjectURL(selectedFile),
        }));
    };

    const handleTempleImagesChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setTempleImages(selectedFiles);
        setImagePreviews(prev => ({
            ...prev,
            otherImages: selectedFiles.map(file => URL.createObjectURL(file)),
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTemple(prevTemple => ({
            ...prevTemple,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${api}/temple/update-temple/${id}`, temple);
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => { navigate(`/admin/temples`); }, 2000);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while updating the temple.');
        }
    };

    return (
        <Layout>
            <section>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center section-heading">
                                Update Temple
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-3">
                                <h3 className='text-primary fw-bold text-md'>Basic</h3>
                            </div>
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
                                    style={{ height: '150px' }}
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
                            <div style={{ background: "var(--color-theme-accent)", padding: "10px", borderRadius: "4px" }} className="mb-3">
                                <label htmlFor="templeLogo" className="form-label">Temple Logo</label>
                                <input
                                    type="file"
                                    name="templeLogo"
                                    onChange={handleTempleLogoImage}
                                    className="form-control"
                                    id="templeLogo"
                                    accept="image/*"
                                />
                                {imagePreviews.logo && (
                                    <img src={imagePreviews.logo} alt="Logo Preview" className="mt-2" style={{ width: 'auto', height: '40px', border: "3px solid #fff " }} />
                                )}
                            </div>
                            <div style={{ background: "var(--color-theme-accent)", padding: "10px", borderRadius: "4px" }} className="mb-3">
                                <label htmlFor="templeBanner" className="form-label">Temple Banner Image</label>
                                <input
                                    type="file"
                                    name="templeBanner"
                                    onChange={handleTempleBannerImage}
                                    className="form-control"
                                    id="templeBanner"
                                    accept="image/*"
                                />
                                {imagePreviews.banner && (
                                    <img src={imagePreviews.banner} alt="Banner Preview" className="mt-2" style={{ width: '140px', height: '100px', border: "3px solid #fff" }} />
                                )}
                            </div>
                            <div style={{ background: "var(--color-theme-accent)", padding: "10px", borderRadius: "4px" }} className="mb-3">
                                <label htmlFor="templeImages" className="form-label">Temple Images</label>
                                <input
                                    type="file"
                                    name="templeImages"
                                    onChange={handleTempleImagesChange}
                                    className="form-control"
                                    id="templeImages"
                                    multiple
                                    accept="image/*"
                                />
                                {imagePreviews.otherImages.map((src, index) => (
                                    <img key={index} src={src} alt={`Image Preview ${index}`} className="mt-2 me-2" style={{ height: '80px', width: 'auto', border: "3px solid #fff" }} />
                                ))}
                            </div>
                        </div>

                        <div className="col-md-4">
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
                                <h3 className='text-primary fw-bold text-md'>Tax Information</h3>
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
                        </div>

                        <div className="col-md-4">
                            <div className="mb-3">
                                <h3 className='text-primary fw-bold text-md'>Social Media</h3>
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
                                    placeholder="Facebook"
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
                                    placeholder="Twitter"
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
                                    placeholder="Instagram"
                                    type="text"
                                    name="socialMedia.instagram"
                                    onChange={handleChange}
                                    value={temple.socialMedia.instagram}
                                    className="form-control"
                                    id="instagram"
                                />
                            </div>
                            <div className="mb-3">
                                <h3 className='text-primary fw-bold text-md'>Upcoming Events</h3>
                            </div>
                            {/* {temple.upcomingEvents.map((event, index) => (
                                <div key={index} className="mb-3">
                                    <input
                                        placeholder={`Event Title ${index + 1}`}
                                        type="text"
                                        name={`upcomingEvents.${index}.title`}
                                        onChange={handleChange}
                                        value={event.title}
                                        className="form-control"
                                        id={`eventTitle${index}`}
                                    />
                                    <input
                                        placeholder={`Event Date ${index + 1}`}
                                        type="date"
                                        name={`upcomingEvents.${index}.date`}
                                        onChange={handleChange}
                                        value={event.date}
                                        className="form-control mt-2"
                                        id={`eventDate${index}`}
                                    />
                                    <input
                                        placeholder={`Event Location ${index + 1}`}
                                        type="text"
                                        name={`upcomingEvents.${index}.location`}
                                        onChange={handleChange}
                                        value={event.location}
                                        className="form-control mt-2"
                                        id={`eventLocation${index}`}
                                    />
                                </div>
                            ))} */}
                            <div className="mb-3 d-flex justify-content-between">
                                <button
                                    style={{ fontSize: '14px' }}
                                    type="button"
                                    className="btn btn-theme-primary-outline"
                                    onClick={() =>
                                        setTemple(prevTemple => ({
                                            ...prevTemple,
                                            upcomingEvents: [
                                                ...prevTemple.upcomingEvents,
                                                { title: '', date: '', location: '' },
                                            ],
                                        }))
                                    }
                                >
                                    Add More Event
                                </button>
                            </div>
                        </div>

                        <div className="col-md-12">
                            <button type="submit" className="btn btn-theme-primary w-100">
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </section>
        </Layout>
    );
};

export default UpdateTemple;