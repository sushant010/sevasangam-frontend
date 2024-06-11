
import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { CSVLink } from 'react-csv';

export default function SubscribedEmails() {
  const auth = useAuth();
  const [emails, setEmails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchSubscribedEmails = async () => {
    try {
      const api = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${api}/subscriptionEmail/getallSubscriptionEmails`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth[0].token}`,
          },
        }
      );
      setEmails(response.data);
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to fetch emails");
    }
  };

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


  useEffect(() => {
    fetchSubscribedEmails();
  }, []);

  return (
    <Layout>
      <section>
        <div className="section-heading mb-2">Subscribed Emails</div>
        {emails.length > 0 && (<div className="d-flex justify-content-end mb-2">  <CSVLink
          data={csvData}
          filename={"donations.csv"}
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
    </Layout>
  );
}
