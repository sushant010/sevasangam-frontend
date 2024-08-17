
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { CSVLink } from 'react-csv';
import { HashLoader } from "react-spinners";

export default function SubscribedEmails() {
  const auth = useAuth();
  const [emails, setEmails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);




  const fetchSubscribedEmails = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;

    setLoading(true); // Set loading to true before the API call

    try {
      const api = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${api}/subscriptionEmail/getallSubscriptionEmails`,
        {},
        {
          params: {
            page: reset ? 1 : page,
            limit: 10, // Increased limit to 10 as you're checking for 10 items
          },
        }
      );

      const newEmails = response.data;

      if (reset) {
        setEmails(newEmails);
        setPage(2);
      } else {
        setEmails((prevEmails) => [...prevEmails, ...newEmails]);
        setPage((prevPage) => prevPage + 1);
      }

      setHasMore(newEmails.length === 10); // Set to false if less than 10 items
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to fetch emails");
    } finally {
      setLoading(false); // Ensure loading is set to false after the API call
    }
  };


  useEffect(() => {
    fetchSubscribedEmails(true);
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading && hasMore) {

      fetchSubscribedEmails();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);


  const csvData = emails.map((email, index) => {
    const date = new Date(email.createdAt).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
    return {
      "S. No": index + 1,
      "Email": email.email,
      "Date of Subscribe": date,

    };
  });


  return (
    <Layout>
      <section>
        <div className="section-heading mb-2">Subscribed Emails</div>
        {emails.length > 0 && (<div className="d-flex justify-content-end mb-2">  <CSVLink
          data={csvData}
          filename={"emails.csv"}
          className="btn btn-theme-primary mb-3"
        >
          <i className="fa-solid fa-file-excel"></i> Download as CSV
        </CSVLink></div>)}

        {errorMessage && <div>{errorMessage}</div>}
        {emails.length > 0 ? (
          <div className="table-responsive">
            <table className=" table table-light table-bordered table-striped">
              <thead>
                <tr>
                  <td>
                    <p className="fw-bold text-primary">S. No</p>
                  </td>
                  <td>
                    <p className="fw-bold text-primary">Email</p>
                  </td>
                  <td>
                    <p className="fw-bold text-primary">Subscribed On</p>
                  </td>
                </tr>
              </thead>
              <tbody>
                {emails.map((email, index) => (
                  <tr key={email._id}>

                    <td>
                      <p>{index + 1}</p>
                    </td>
                    <td>
                      <p>{email.email}</p>
                    </td>
                    <td>
                      <p>
                        {new Date(email.createdAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No Emails Subscribed</div>
        )}
      </section>
      {loading && (
        <section className="d-flex m-auto">
          <HashLoader color={"#ff395c"} />
        </section>
      )}
    </Layout>
  );
}
