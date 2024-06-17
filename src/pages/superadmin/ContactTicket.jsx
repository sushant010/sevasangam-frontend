
import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { HashLoader } from "react-spinners";

export default function ContactTicket() {
  const [tickets, setTickets] = useState([]);


  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    email: searchParams.get('email') || '',
    title: searchParams.get('title') || '',
    message: searchParams.get('message') || '',
    status: searchParams.get('status') || '',
  });




  const api = import.meta.env.VITE_API_URL;

  const fetchContactTickets = async (reset = false) => {
    if (loading || (!hasMore && !reset)) return;
    setLoading(true);
    try {
      const response = await axios.post(`${api}/contact/get-all-contact-tickets`, { page: reset ? 1 : page, ...filters });
      if (response.data.success) {
        setTickets((prevTickets) => reset ? response.data.contactTickets : [...prevTickets, ...response.data.contactTickets]);
        setPage((prevPage) => reset ? 2 : prevPage + 1);
        setHasMore(response.data.contactTickets.length > 0);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching contact tickets:", error);
    } finally {
      setLoading(false);
    }
  };


  const updateContactTicket = async (id, status) => {
    try {
      const res = await axios.put(`${api}/contact/update-contact-ticket-status`, {
        id,
        status,
      });
      toast.success(res.data.message);
      fetchContactTickets();

    } catch (error) {
      console.error("Error in updating ticket:", error);
      toast.error(error.message)
    }
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleScroll = () => {
    // setLoading(true);
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      // setLoading(false);

      fetchContactTickets(); // Fetch more temples when scrolled to the bottom

    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Remove event listener on unmount
  }, [loading]);


  const applyFilters = (e) => {
    e.preventDefault();
    setPage(1);
    setHasMore(true);
    setTickets([]);
    const params = new URLSearchParams(filters).toString();
    setSearchParams(params);
    fetchContactTickets(true);
  };

  useEffect(() => {
    fetchContactTickets();
  }, [searchParams]);
  return (
    <Layout>
      <section>
        <div className="section-heading mb-2">Contact Ticket</div>
        <form onSubmit={(e) => applyFilters(e)}>
          <div className="filters-container row mb-4">

            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                name="email"
                placeholder="Email"
                value={filters.email}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                name="title"
                placeholder="Title"
                value={filters.title}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                name="message"
                placeholder="Message"
                value={filters.message}
                onChange={handleFilterChange}
              />
            </div>

            <div className="col-md-2">
              <select
                name="status"
                className="form-select"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div className="col-md-1">
              <button className="btn btn-theme-primary" type="submit"><i className="fa-solid fa-filter"></i></button>
            </div>



          </div>
        </form>
        {tickets.length > 0 ? (
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
                    <p className="fw-bold text-primary">Action</p>
                  </td>
                  <td>
                    <p className="fw-bold text-primary">Title</p>
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
                    <td>{index + 1} </td>
                    <td>{ticket.email} </td>
                    <td> <a href={`mailto:${ticket.email}`}><i style={{ cursor: "pointer" }} title="reply" className="text-primary fa-solid fa-reply"></i></a></td>
                    <td>
                      {ticket.title === "donation-related-query" ? (
                        <span>Donation Related Query</span>
                      ) : ticket.title === "temple-related-query" ? (
                        <span>Temple Related Query</span>
                      ) : ticket.title === "80g-certificate" ? (
                        <span>80g Certificate Related Query</span>
                      ) : ticket.title === "work-with-us" ? (
                        <span>Work with us</span>
                      ) : ticket.title === "feedback" ? (
                        <span>Feedback</span>
                      ) : (
                        <span>Others</span>
                      )}
                    </td>


                    <td>{ticket.message}</td>
                    <td style={{ minWidth: "100px" }}>
                      <select
                        value={ticket.status}
                        onChange={(e) =>
                          updateContactTicket(ticket._id, e.target.value)
                        }
                      >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td style={{ minWidth: "150px" }}>{new Date(ticket.createdAt).toDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>No tickets found</div>
        )}
        {loading && (
          <section className="d-flex justify-content-center m-auto">
            <HashLoader color={"#ff395c"} />
          </section>
        )}
      </section>
    </Layout >
  );
}
