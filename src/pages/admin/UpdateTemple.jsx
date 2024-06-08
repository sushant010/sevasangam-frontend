import Layout from '../../components/layout/Layout';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete, GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';

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
            city: '',
            state: '',
            zipCode: '',
            country: '',
            longitude: 77.01502627,
            latitude: 10.99835602,
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
        upcomingEvents: [],
        timing: {
            start: '',
            end: ''
        },
    });

    // for google map
    const google_map_api = import.meta.env.VITE_GOOGLE_MAP_API_KEY;
    const libraries = ['places'];
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: google_map_api,
        libraries: libraries
    });

    const [autocomplete, setAutocomplete] = useState(null);


    const handleLocationChange = (place) => {


        const address = place.formatted_address;
        const components = place.address_components;
        const locationDetails = {
            address: address,
            state: '',
            zipCode: '',
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
            city: '',
            country: '',
        };

        components.forEach(component => {
            const types = component.types;
            if (types.includes('administrative_area_level_1')) {
                locationDetails.state = component.long_name;
            } else if (types.includes('postal_code')) {
                locationDetails.zipCode = component.long_name;
            } else if (types.includes('locality')) {
                locationDetails.city = component.long_name;
            } else if (types.includes('country')) {
                locationDetails.country = component.long_name;
            }
        });

        setTemple(prevTemple => ({
            ...prevTemple,
            location: locationDetails,
        }));
    };


    const onPlaceChanged = () => {
        const place = autocomplete.getPlace();
        handleLocationChange(place);
    };

    const onMarkerDragEnd = (event) => {

        const newLat = event.latLng.lat();
        const newLng = event.latLng.lng();

        const place = {
            formatted_address: '', // Update with your logic to get the address
            geometry: {
                location: { lat: newLat, lng: newLng }
            },
            address_components: [], // Update with your logic to get the address components
        };

        handleLocationChange(place);
    };


    const fetchTemple = async () => {
        try {
            const res = await axios.get(`${api}/temple/get-temple/${id}`);
            const { data } = res.data;
            setTemple(data);
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

    useEffect(() => {

        fetchTemple();
    }, []);

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

        // If the name contains a dot (.), it means it's a nested property
        if (name.includes('.')) {
            const [parent, child] = name.split('.'); // Split the name into parent and child keys
            setTemple(prevTemple => ({
                ...prevTemple,
                [parent]: {
                    ...prevTemple[parent], // Preserve other properties of the parent object
                    [child]: value // Update the value of the nested property
                }
            }));
        } else {
            // If it's not a nested property, update it directly
            setTemple(prevTemple => ({
                ...prevTemple,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare form data
            const formData = new FormData();
            Object.entries(temple).forEach(([key, value]) => {
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        formData.append(`${key}.${subKey}`, subValue);
                    });
                } else if (Array.isArray(value)) {
                    value.forEach((item, index) => {
                        Object.entries(item).forEach(([subKey, subValue]) => {
                            formData.append(`${key}[${index}].${subKey}`, subValue);
                        });
                    });
                } else {
                    formData.append(key, value);
                }
            });
            formData.append("userUpdating", auth.user.role);
            const res = await axios.put(`${api}/temple/update-temple/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.data.success) {
                toast.success(res.data.message);
                setTimeout(() => {
                    window.scrollTo(0, 0);
                    navigate(auth.user.role === 2 ? '/superadmin/temples' : '/admin/temples');
                }, 2000);
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
                                <label htmlFor="templeName" className="form-label">Temple Name</label>
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
                                <label htmlFor="typeOfOrganization" className="form-label">Type of Organization</label>
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
                                <label htmlFor="description" className="form-label">Description</label>
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
                                {isLoaded && (
                                    <>
                                        <Autocomplete
                                            onLoad={(autocomplete) => setAutocomplete(autocomplete)}
                                            onPlaceChanged={onPlaceChanged}
                                        >
                                            <input
                                                type="text"
                                                placeholder="Enter a location"
                                                className="form-control"
                                            />
                                        </Autocomplete>
                                    </>
                                )}

                            </div>
                            <div className="mb-3">
                                <label htmlFor="locationAddress" className="form-label">Location Address</label>
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
                                <label htmlFor="locationCity" className="form-label">Location City</label>
                                <input
                                    placeholder="Location City"
                                    type="text"
                                    name="location.city"
                                    onChange={handleChange}
                                    value={temple.location.city}
                                    className="form-control"
                                    id="locationCity"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="locationState" className="form-label">Location State</label>
                                <input
                                    placeholder="Location State"
                                    type="text"
                                    name="location.state"
                                    onChange={handleChange}
                                    value={temple.location.state}
                                    className="form-control"
                                    id="locationState"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="locationZipCode" className="form-label">Location Zip Code</label>
                                <input
                                    placeholder="Zip Code"
                                    type="text"
                                    name="location.zipCode"
                                    onChange={handleChange}
                                    value={temple.location.zipCode}
                                    className="form-control"
                                    id="locationZipCode"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="locationCountry" className="form-label">Location Country</label>
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
                                <label htmlFor="contactPersonName" className="form-label">Contact Person Name</label>
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
                                <label htmlFor="contactPersonEmail" className="form-label">Contact Person Email</label>
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
                                <label htmlFor="contactPersonMobile" className="form-label">Contact Person Mobile</label>
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
                                <label htmlFor="taxId" className="form-label">Tax ID</label>
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
                                <label htmlFor="ein" className="form-label">EIN</label>
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
                                <label htmlFor="bankName" className="form-label">Bank Name</label>
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
                                <label htmlFor="branch" className="form-label">Branch</label>
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
                                <label htmlFor="accountHolderName" className="form-label">Account Holder Name</label>
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
                                <label htmlFor="accountNumber" className="form-label">Account Number</label>
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
                                <label htmlFor="ifscCode" className="form-label">IFSC Code</label>
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
                                <label htmlFor="routingNumber" className="form-label">Routing Number</label>
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
                                <label htmlFor="swiftBicCode" className="form-label">SWIFT/BIC Code</label>
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
                                <label htmlFor="website" className="form-label">Website</label>
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
                                <label htmlFor="facebook" className="form-label">Facebook</label>
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
                                <label htmlFor="twitter" className="form-label">Twitter</label>
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
                                <label htmlFor="instagram" className="form-label">Instagram</label>
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
                            <div className="mb-3">
                                <h3 className='text-primary fw-bold text-md'>Timing</h3>
                            </div>
                            <div className="mb-3">
                                <input
                                    placeholder="Start Time"
                                    type="time"
                                    name="timing.start"
                                    onChange={handleChange}
                                    value={temple?.timing?.start}
                                    className="form-control"
                                    id="startTime"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    placeholder="End Time"
                                    type="time"
                                    name="timing.end"
                                    onChange={handleChange}
                                    value={temple?.timing?.end}
                                    className="form-control"
                                    id="endTime"
                                />
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