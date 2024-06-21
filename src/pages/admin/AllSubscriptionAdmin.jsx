import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/Auth";
import { CSVLink } from 'react-csv';
import HashLoader from "react-spinners/HashLoader";
import compress from 'compress-base64'

const AllSubscriptionsAdmin = () => {
  const api = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const [auth] = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);

  const [temples, setTemples] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState([]);
  const [templeCreator, setTempleCreator] = useState([]);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    temple: searchParams.get("temple") || "",
    payId: searchParams.get("payId") || "",
    templeCreatedBy: searchParams.get("templeCreatedBy") || "",
    donateUser: searchParams.get("donateUser") || "",
    paymentMethod: searchParams.get("paymentMethod") || "",
    dateFrom: searchParams.get("dateFrom") || "",
    dateTo: searchParams.get("dateTo") || "",
  });


  const resetFilters = () => {
    setFilters(null)
  }

  const fetchAllSubscriptionsAdmin = async () => {

    if (auth.user.role == 1) {
      try {
        const res = await axios.post(`${api}/subscription/fetch-all-subscription-by-admin`, {
          id: auth.user._id,
        });

        setSubscriptions(res.data.subscriptions);
        // console.log(res.data.subscriptions)
      } catch (error) {
        console.error(error);
        // Handle error, e.g., display a toast message
      }
    } else {
      try {
        const res = await axios.get(`${api}/subscription/fetch-all-subscription`);

        setSubscriptions(res.data.subscriptions);
        // console.log(res.data.subscriptions)
      } catch (error) {
        console.error(error);
        // Handle error, e.g., display a toast message
      }
    }
  };


  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        resolve(event.target.result);
      };
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }



  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      setFile(base64);
      setFilePreview(URL.createObjectURL(file));
      alert("foennn")
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload80GCertificate = async (id, e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("certificate", file);
      formData.append("id", id);
      const res = await axios.post(
        `${api}/subscription/upload-80-certificate`,
        formData
      );
      if (res.data.success) {
        toast.success(res.data.message);
        fetchAllSubscriptionsAdmin();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate80GCertificate = async (id, e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("certificate", file);
      formData.append("id", id);
      const res = await axios.put(
        `${api}/subscription/update-80-certificate`,
        formData
      );

      if (res.data.success) {
        toast.success(res.data.message);
        fetchAllSubscriptionsAdmin();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  //   setFilePreview(URL.createObjectURL(selectedFile));
  // };
  // Function to handle scroll event
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      fetchAllSubscriptionsAdmin(); // Fetch more temples when scrolled to the bottom
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Remove event listener on unmount
  }, [loading]);

  // Fetch temples when filters or sortOption change
  useEffect(() => {
    fetchAllSubscriptionsAdmin(true);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // const handleSortOption = (option) => {
  //     setSortOption(option);
  // };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams();

    // Check if there are any filter values or sort options
    const hasFilterValues = Object.values(filters).some((value) => value);

    if (hasFilterValues) {
      for (const key in filters) {
        if (filters[key]) {
          newSearchParams.set(key, filters[key]);
        }
      }
      setSearchParams(newSearchParams);
      window.scrollTo(0, 0);
      navigate({
        search: newSearchParams.toString(),
      });
    } else {
      // If neither filters nor sort option are set, clear the search parameters
      setSearchParams("");
      window.scrollTo(0, 0);
      navigate({
        search: "",
      });
    }
  };

  const getUniqueObjects = (array, key) => {
    const uniqueKeys = new Set();
    return array.filter((item) => {
      const keyValue = item[key];
      if (!uniqueKeys.has(keyValue)) {
        uniqueKeys.add(keyValue);
        return true;
      }
      return false;
    });
  };

  const fetchAllTemples = async () => {
    try {
      const res = await axios.get(`${api}/temple/get-temples`);
      setTemples(res.data.data.temples);
      const creators = temples.map((temple) => temple.createdBy);
      const uniqueCreators = getUniqueObjects(creators, "_id");
      setTempleCreator(uniqueCreators);
    } catch (error) {
      console.error(error);
      // Handle error, e.g., display a toast message
    }
  };

  // CSV Data Preparation
  const csvData = subscriptions.map((subscription, index) => {
    const formattedDate = new Date(subscription.date).toLocaleDateString("en-GB");
    const donateUser = subscription.donateUser ? JSON.parse(subscription.donateUser) : { name: "Anonymous", email: "", phone: "" };
    const temple = temples.find(temp => temp._id === subscription.temple)?.templeName || "Unknown";
    const customSubscription = subscriptions.find(don => don.razorpay_payment_id === subscription.id) || {};
    return {
      "S. No": index + 1,
      "Subscription Id": subscription.subscription_id,
      "Plan Id": subscription.plan_id,
      "Temple": temple,
      "Date of Subscription": formattedDate,
      "Subscription by User": `${donateUser.name} (${donateUser.email}, ${donateUser.phone})`,
      "Amount": subscription.currency !== "INR" ? `${subscription.currency} ${subscription.amount}` : `₹ ${subscription.amount}`,
      "80G Certificate": customSubscription.certificate ? "Available" : "Not Available"
    };
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      await fetchAllSubscriptionsAdmin();
      await fetchAllTemples();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <section>
        <div className="section-heading">All Subscriptions</div>
        {/* <div className="filter-container my-4">
          <form className="row g-4" onSubmit={handleFilterSubmit}>
            <div className="col-md-2">
              <select
                className="form-select"
                name="temple"
                value={filters.temple}
                onChange={handleFilterChange}
              >
                <option value="">Select Temple</option>
                {temples.map((temple, index) => (
                  <option key={index} value={temple._id}>
                    {temple.templeName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                name="temple"
                value={filters.templeCreatedBy}
                onChange={handleFilterChange}
              >
                <option value="">Select Temple Created By</option>
                {templeCreator &&
                  templeCreator.map((creator, index) => (
                    <option key={index} value={creator._id}>
                      {creator.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                name="donateUser"
                placeholder="Donate User"
                value={filters.donateUser}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                name="payId"
                placeholder="Payment Id"
                value={filters.payId}
                onChange={handleFilterChange}
              />
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                name="paymentMethod"
                value={filters.paymentMethod}
                onChange={handleFilterChange}
              >
                <option value="">Select Payment Method</option>
                {paymentMethod.map((method, index) => (
                  <option key={index} value={method}>
                    {method}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <label className="mx-2">Date From</label>
              <input
                type="date"
                className="form-control"
                name="dateFrom"
                placeholder="Date From"
                value={filters.dateFrom}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <label className="mx-2">Date To</label>
              <input
                type="date"
                className="form-control"
                name="dateTo"
                placeholder="Date To"
                value={filters.dateTo}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-1">
              <div className="d-flex justify-content-end m-0 p-0">
                <button type="submit" className="btn btn-theme-primary">
                  <i className="fa-solid fa-filter"></i>
                </button>
              </div>
            </div>
          </form>
        </div> */}
        <div className="d-flex justify-content-end">
          <CSVLink
            data={csvData}
            filename={"subscriptions.csv"}
            className="btn btn-theme-primary mb-3"
          >
            <i className="fa-solid fa-file-excel"></i> Download as CSV
          </CSVLink>
        </div>

        <div className="table-responsive">
          <table className="table table-light table-bordered table-striped">
            <thead>
              <tr>
                <td>
                  <p className="fw-bold text-primary">S. No</p>
                </td>
                <td>
                  <p className="fw-bold text-primary">Subsciption Id</p>
                </td>
                <td>
                  <p className="fw-bold text-primary">Plan Id</p>
                </td>
                <td>
                  <p className="fw-bold text-primary">Temple</p>
                </td>

                <td>
                  <p className="fw-bold text-primary">Date of Subscription</p>
                </td>
                <td>
                  <p className="fw-bold text-primary">Subscription by User</p>
                </td>
                <td>
                  <p className="fw-bold text-primary">Amount</p>
                </td>

                <td>
                  <p className="fw-bold text-primary">80G Certificate</p>
                </td>
              </tr>
            </thead>
            <tbody>
              {subscriptions &&
                subscriptions.map((subscription, index) => {
                  const formattedDate = new Date(
                    subscription.date
                  ).toLocaleDateString("en-GB");
                  const donateUser = subscription.donateUser
                    ? JSON.parse(subscription.donateUser)
                    : null;
                  const customSubscription =
                    subscriptions.find(
                      (don) => don.razorpay_payment_id === subscription.id
                    ) || {};

                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{subscription.subscription_id}</td>
                      <td>{subscription.plan_id}</td>
                      <td>
                        {
                          temples.find(
                            (temp) => temp._id === subscription.temple
                          )?.templeName
                        }
                      </td>

                      <td>{formattedDate}</td>
                      {donateUser !== null ? (
                        <td>{`${donateUser.name} (${donateUser.email}, ${donateUser.phone}) `}</td>
                      ) : (
                        <td>Anonymous</td>
                      )}
                      <td>
                        {subscription.currency !== "INR" ? subscription.currency : "₹"}{" "}
                        {subscription.amount}
                      </td>

                      <td>
                        {customSubscription.is80CertificateRequested ? (
                          <>
                            {customSubscription.certificate ? (
                              <>
                                <div className="file-preview">
                                  <a
                                    className="fw-bold"
                                    style={{ color: "green", textDecoration: "underline" }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={customSubscription.certificate}
                                  >
                                    View Certificate
                                  </a>
                                </div>
                                <div className="fw-bold text-danger">Request Received Again</div>
                                <form
                                  onSubmit={(e) => handleUpdate80GCertificate(subscription.id, e)}
                                >
                                  <input
                                    onChange={handleFileChange}
                                    type="file"
                                  />
                                  <button
                                    type="submit"
                                    className="m-2 btn btn-theme-primary"
                                    title="View Temple"
                                  >
                                    Update Certificate
                                  </button>
                                  {filePreview && (
                                    <div className="file-preview">
                                      <a
                                        className="fw-bold"
                                        style={{ color: "green", textDecoration: "underline" }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={filePreview}
                                      >
                                        View Preview
                                      </a>
                                    </div>
                                  )}
                                </form>

                              </>
                            ) : (
                              <>
                                <form
                                  onSubmit={(e) => handleUpload80GCertificate(subscription.id, e)}
                                >
                                  <label className="mb-2" style={{ color: "red" }}>
                                    80G Certificate Requested:
                                  </label>
                                  <input
                                    placeholder="upload certificate"
                                    onChange={handleFileChange}
                                    type="file"
                                  />
                                  <button
                                    type="submit"
                                    className="m-2 btn btn-theme-primary"
                                  >
                                    Upload
                                  </button>
                                </form>
                                {filePreview && (
                                  <div className="file-preview">
                                    <a
                                      className="fw-bold"
                                      style={{ color: "green", textDecoration: "underline" }}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      href={filePreview}
                                    >
                                      View Preview
                                    </a>
                                  </div>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            {customSubscription.certificate ? (
                              <div className="file-preview">
                                <a
                                  className="fw-bold"
                                  style={{ color: "green", textDecoration: "underline" }}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  href={customSubscription.certificate}
                                >
                                  View Certificate
                                </a>
                              </div>
                            ) : (
                              <div>No request</div>
                            )}
                          </>
                        )}
                      </td>

                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>

      {loading && (
        <section className="d-flex m-auto">
          <HashLoader color={"#ff395c"} />
        </section>
      )}


    </Layout>
  );
};

export default AllSubscriptionsAdmin;
