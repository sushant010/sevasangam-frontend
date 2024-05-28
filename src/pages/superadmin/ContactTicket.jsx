
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/Auth";

export default function ContactTicket() {
  const [tickets, setTickets] = useState([]);
  const auth = useAuth();
  const fetchContactTickets = async () => {
    try {
      const api = import.meta.env.VITE_API_URL;
      console.log();
      const response = await axios.post(
        `${api}/contact/contact-form/getallContactTickets`,
        {},
        {
          headers: {
            Authorization: `Bearer ${auth[0].token}`,
          },
        }
      );
      console.log(response);
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching contact tickets:", error);
    }
  };

  useEffect(() => {
    fetchContactTickets();
  }, []);
  return (
    <Layout>
      <section>
        <div className="section-heading mb-2">Contact Ticket</div>
        {tickets.length > 0 ? (
          <div className="responsive-table">
            <table className=" table table-light table-bordered table-striped">
              <thead>
                <tr>
                  <td>
                    <p className="fw-bold text-primary">Email</p>
                  </td>
                  <td>
                    <p className="fw-bold text-primary">Tittle</p>
                  </td>
                  <td>
                    <p className="fw-bold text-primary">Message</p>
                  </td>
                  <td>
                    <p className="fw-bold text-primary">Status</p>
                  </td>
                  <td>
                    <p className="fw-bold text-primary">Created On</p>
                  </td>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={ticket._id}>
                    <td>{ticket.email}</td>
                    <td>{ticket.tittle}</td>
                    <td>{ticket.message}</td>
                    <td>{ticket.status}</td>
                    <td>{new Date(ticket.createdAt).toDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No tickets found</div>
        )}
      </section>
    </Layout>
  );
}
