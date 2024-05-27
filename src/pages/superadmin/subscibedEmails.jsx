import axios from "axios";
import { useAuth } from "../../context/Auth";
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";

export default function SubscribedEmails() {
  const auth = useAuth();
  const [emails, setEmails] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchSubscribedEmails = async () => {
    try {
      const backendURL = import.meta.env.VITE_API_URL;
      const response = await axios.post(
        `${backendURL}/subscriptionEmail/getallSubscriptionEmails`,
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

  useEffect(() => {
    fetchSubscribedEmails();
  }, []);

  return (
    <Layout>
      <div className="section-heading mb-2">Subscribed Emails</div>
      {errorMessage && <div>{errorMessage}</div>}
      {emails.length > 0 ? (
        <div className="responsive-table">
          <table className=" table table-light table-bordered table-striped">
            <thead>
              <tr>
                <td>
                  <p className="fw-bold text-primary">Email</p>
                </td>
                <td>
                  <p className="fw-bold text-primary">Subscribed On</p>
                </td>
              </tr>
            </thead>
            <tbody>
              {emails.map((email) => (
                <tr key={email._id}>
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
    </Layout>
  );
}
