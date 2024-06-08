import Layout from '../../components/layout/Layout';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import { Autocomplete, GoogleMap, LoadScript, Marker, useJsApiLoader } from '@react-google-maps/api';




const AddTemple = () => {

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



    const [auth] = useAuth();
    const navigate = useNavigate();

    // Image states
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

    const api = import.meta.env.VITE_API_URL;

    const initialState = {
        templeName: 'Sample Temple',
        typeOfOrganization: 'Non-Profit',
        description: 'Lorem ipsum dolor sit amet...',
        createdBy: '', // Sample user ID
        contactPerson: {
            name: 'John Doe',
            email: 'johndoe@example.com',
            mobile: '+1234567890',
        },
        location: {
            address: '123 Main Street',
            city: 'United States',
            state: 'United States',
            zipCode: 'United States',
            country: 'United States',
            longitude: 77.01502627,
            latitude: 10.99835602,
        },
        bankDetails: {
            bankName: 'Sample Bank',
            branch: 'Main Branch',
            accountHolderName: 'John Doe',
            accountNumber: '1234567890',
            ifscCode: 'SAMPLEIFSC123',
            routingNumber: 'SAMPLE123456',
            swiftBicCode: 'SWIFTBICCODE',
        },
        taxInformation: {
            taxId: '123456789',
            ein: 'EIN123456789',
        },
        website: 'https://sampletemple.com',
        socialMedia: {
            facebook: 'https://www.facebook.com/sampletemple',
            twitter: 'https://twitter.com/sampletemple',
            instagram: 'https://www.instagram.com/sampletemple',
        },
        upcomingEvents: [
            {
                eventName: 'Event 1',
                description: 'Lorem ipsum dolor sit amet...',
                date: {
                    start: '2022-12-31',
                    end: '2022-12-31',
                },
                timing: {
                    start: '2022-12-31',
                    end: '2022-12-31',
                },
                images: []
            },
        ],
        timing: {
            start: '08:00',
            end: '17:00',
        },
    };

    const [temple, setTemple] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');

        if (keys.length === 1) {
            setTemple(prevTemple => ({
                ...prevTemple,
                [name]: value,
            }));
        } else {
            const [key, subkey] = keys;
            setTemple(prevTemple => ({
                ...prevTemple,
                [key]: {
                    ...prevTemple[key],
                    [subkey]: value,
                },
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            // Adding text fields to formData
            Object.keys(temple).forEach(key => {
                if (typeof temple[key] === 'object' && temple[key] !== null && !Array.isArray(temple[key])) {
                    Object.keys(temple[key]).forEach(subKey => {
                        formData.append(`${key}.${subKey}`, temple[key][subKey]);
                    });
                } else {
                    if (key === 'createdBy') {
                        formData.append(key, auth.user._id);
                    } else {
                        formData.append(key, temple[key]);
                    }
                }
            });

            const templeImagesArray = Array.isArray(templeImages) ? templeImages : [];

            // Adding image fields to formData
            if (templeLogoImage) formData.append('logo', templeLogoImage);
            if (templeBannerImage) formData.append('bannerImage', templeBannerImage);
            templeImagesArray.forEach(image => formData.append('otherImages', image));

            const res = await axios.post(`${api}/temple/create-temple`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                toast.success(res.data.message);

                setTimeout(() => {
                    window.scrollTo(0, 0);
                    navigate('/admin/temples');
                }, 2000);
                setTemple(initialState);
                setImagePreviews({
                    logo: null,
                    banner: null,
                    otherImages: [],
                });
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

            <section>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="text-center section-heading">
                                Add Temple
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="mb-3">
                                <h3 className='text-primary fw-bold text-md'>Basic</h3>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="templeName">Temple name</label>
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
                                <label htmlFor="typeOfOrganization">Type of Organization</label>
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
                                <label htmlFor="description">Description</label>
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
                                <LoadScript googleMapsApiKey={google_map_api} libraries={libraries}>
                                    <GoogleMap
                                        mapContainerStyle={{ height: "300px", width: "100%" }}
                                        center={{
                                            lat: temple.location.latitude || 10.99835602,
                                            lng: temple.location.longitude || 77.01502627,
                                        }}
                                        zoom={11}
                                    >
                                        <Marker
                                            position={{
                                                lat: temple.location.latitude || 10.99835602,
                                                lng: temple.location.longitude || 77.01502627,
                                            }}
                                            draggable={false}
                                            onDragEnd={onMarkerDragEnd}
                                        />
                                    </GoogleMap>
                                </LoadScript>
                            </div>
                            <div className="mb-3">

                                <label htmlFor="locationAddress">Location Address</label>

                                <input
                                    placeholder="Location Address"
                                    type="text"
                                    name="location.address"
                                    onChange={handleChange}
                                    value={temple.location.address}
                                    className="form-control"
                                    id="locationAddress"
                                />
                            </div >
                            <div className="mb-3">
                                <label htmlFor="locationCity">Location City</label>
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
                                <label htmlFor="locationState">Location State</label>
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
                                <label htmlFor="locationZipCode">Zip Code</label>
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
                                <label htmlFor="locationCountry">Location Country</label>
                                <input
                                    placeholder="Location City"
                                    type="text"
                                    name="location.city"
                                    onChange={handleChange}
                                    value={temple.location.city}
                                    className="form-control"
                                    id="locationCountry"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    placeholder="Location State"
                                    type="text"
                                    name="location.state"
                                    onChange={handleChange}
                                    value={temple.location.state}
                                    className="form-control"
                                    id="locationCountry"
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    placeholder="Zip Code"
                                    type="text"
                                    name="location.zipCode"
                                    onChange={handleChange}
                                    value={temple.location.zipCode}
                                    className="form-control"
                                    id="locationCountry"
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
                        </div >

                        <div className="col-md-4">
                            <div className="mb-3">
                                <h3 className='text-primary fw-bold text-md'>Contact Person</h3>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactPersonName">Contact Person Name</label>
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
                                <label htmlFor="contactPersonEmail">Contact Person Email</label>
                                <input
                                    placeholder="Contact Person Email"
                                    type="contactPersonEmail"
                                    name="contactPerson.email"
                                    onChange={handleChange}
                                    value={temple.contactPerson.email}
                                    className="form-control"
                                    id="contactPersonEmail"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactPersonMobile">Contact Person Mobile</label>
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
                                <label htmlFor="taxId">Tax ID</label>
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
                                <label htmlFor="ein">EIN</label>
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
                                <label htmlFor="bankName">Bank Name</label>
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
                                <label htmlFor="branch">Branch</label>
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
                                <label htmlFor="accountHolderName">Account Holder Name</label>
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
                                <label htmlFor="accountNumber">Account Number</label>
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
                                <label htmlFor="ifscCode">IFSC Code</label>
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
                                <label htmlFor="routingNumber">Routing Number</label>
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
                                <label htmlFor="swiftBicCode">SWIFT/BIC Code</label>
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
                                <label htmlFor="website">Website</label>
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
                                <label htmlFor="facebook">Facebook</label>
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
                                <label htmlFor="twitter">Twitter</label>
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
                                <label htmlFor="instagram">Instagram</label>
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
                                <h3 className='text-primary fw-bold text-md'>Timing</h3>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startTime">Start Time</label>
                                <input
                                    placeholder="Start Time"
                                    type="time"
                                    name="timing.start"
                                    onChange={handleChange}
                                    value={temple.timing.start}
                                    className="form-control"
                                    id="startTime"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endTime">End Time</label>
                                <input
                                    placeholder="End Time"
                                    type="time"
                                    name="timing.end"
                                    onChange={handleChange}
                                    value={temple.timing.end}
                                    className="form-control"
                                    id="endTime"
                                />
                            </div>
                            <div className="mb-3">
                                <h3 className='text-primary fw-bold text-md'>Upcoming Events</h3>
                            </div>
                            {temple.upcomingEvents.map((event, index) => (
                                <div key={index} className="mb-3">
                                    <hr></hr>
                                    <div className="mb-3">
                                        <label htmlFor={`eventName${index}`}>Event Name</label>
                                        <input
                                            placeholder={`Event Name ${index + 1}`}
                                            type="text"
                                            name={`upcomingEvents.${index}.eventName`}
                                            onChange={handleChange}
                                            value={event.eventName}
                                            className="form-control"
                                            id={`eventName${index}`}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`eventDescription${index}`}>Event Description</label>
                                        <input
                                            placeholder={`Event Description ${index + 1}`}
                                            type="text"
                                            name={`upcomingEvents.${index}.description`}
                                            onChange={handleChange}
                                            value={event.description}
                                            className="form-control mt-2"
                                            id={`eventDescription${index}`}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`eventStartDate${index}`}>Event Start Date</label>
                                        <input
                                            placeholder={`Event Start Date ${index + 1}`}
                                            type="date"
                                            name={`upcomingEvents.${index}.date.start`}
                                            onChange={handleChange}
                                            value={event.date.start}
                                            className="form-control mt-2"
                                            id={`eventStartDate${index}`}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`eventEndDate${index}`}>Event End Date</label>
                                        <input
                                            placeholder={`Event End Date ${index + 1}`}
                                            type="date"
                                            name={`upcomingEvents.${index}.date.end`}
                                            onChange={handleChange}
                                            value={event.date.end}
                                            className="form-control mt-2"
                                            id={`eventEndDate${index}`}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`eventStartTime${index}`}>Event Start Time</label>
                                        <input
                                            placeholder={`Event Start Time ${index + 1}`}
                                            type="time"
                                            name={`upcomingEvents.${index}.timing.start`}
                                            onChange={handleChange}
                                            value={event.timing.start}
                                            className="form-control mt-2"
                                            id={`eventStartTime${index}`}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`eventEndTime${index}`}>Event End Time</label>
                                        <input
                                            placeholder={`Event End Time ${index + 1}`}
                                            type="time"
                                            name={`upcomingEvents.${index}.timing.end`}
                                            onChange={handleChange}
                                            value={event.timing.end}
                                            className="form-control mt-2"
                                            id={`eventEndTime${index}`}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`eventImages${index}`}>Event Images</label>
                                        <input
                                            placeholder={`Event Images ${index + 1}`}
                                            type="file"
                                            name={`upcomingEvents.${index}.images`}
                                            multiple
                                            onChange={(e) => {
                                                const files = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
                                                setTemple((prevTemple) => {
                                                    const newEvents = [...prevTemple.upcomingEvents];
                                                    newEvents[index].images = files;
                                                    return {
                                                        ...prevTemple,
                                                        upcomingEvents: newEvents,
                                                    };
                                                });
                                            }}
                                            className="form-control mt-2"
                                            id={`eventImages${index}`}
                                        />
                                    </div>



                                </div>
                            ))}
                            <div className="mb-3 d-flex justify-content-between">
                                <button
                                    style={{ fontSize: "14px" }}
                                    type="button"
                                    className="btn btn-theme-primary-outline"
                                    onClick={() => setTemple((prevTemple) => ({
                                        ...prevTemple,
                                        upcomingEvents: [
                                            ...prevTemple.upcomingEvents,
                                            {
                                                eventName: '',
                                                description: '',
                                                date: {
                                                    start: '',
                                                    end: '',
                                                },
                                                timing: {
                                                    start: '',
                                                    end: '',
                                                },
                                                images: [],
                                            },
                                        ],
                                    }))}
                                >
                                    Add More Event
                                </button>
                            </div>

                        </div>

                        <div className="col-md-12">
                            <button
                                type="submit"
                                className="btn btn-theme-primary w-100"
                            >
                                Save
                            </button>
                        </div>
                    </div >
                </form >
            </section >
        </Layout >
    );
};

export default AddTemple;