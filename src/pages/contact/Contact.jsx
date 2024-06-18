import { useState } from 'react';
import Button from '../../components/buttons/Button';
import Layout from '../../components/layout/Layout';
import './contact.css';
import axios from "axios"
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const Contact = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    email: ''
  });

  const api = import.meta.env.VITE_API_URL;
  const [contactFormLoading, setContactFormLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending data to the server
    setContactFormLoading(true)
    try {

      await axios.post(`${api}/contact/create-contact-form`, {
        title: formData.title,
        message: formData.message,
        email: formData.email
      });
      toast.success('Your message has been sent successfully.');
      setFormData({
        title: '',
        message: '',
        email: ''
      });

    } catch (error) {
      toast.error('Something went wrong, please try again later.');

    } finally {
      setContactFormLoading(false)
    }
  };
  return (
    <Layout>
      <section className='banner'>

        <div className="banner-text">
          <h2 className="text-heading">Contact Us</h2>
          <p className="text-md  text-grey-dark">
            Contact us by below details or submit a ticket, and our team will get back shortly.

          </p>
          <Link to="/temples" className="btn btn-theme-primary">Donate Now</Link>
        </div>
      </section>
      <section className="contact-main">
        <div className="left-container">
          <div className="d-flex flex-column">
            <span className="section-heading mb-4 pb-4">Happy to Help you!</span>
            <div className="d-flex align-items-start mb-3">
              <div className="icon-wrapper static">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <div className="mx-2">
                <p className="fw-bold">Office Address</p>
                <p className="text-sm">

                  <a target='_blank' href='https://maps.app.goo.gl/fxp9d26ArG8NbFrS9'>    23A, Shanbough Krinshappa Ln, Upparahalli, Mavalli, Bengaluru, Karnataka 560004</a>

                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <div className="icon-wrapper static">
                <i className="fa-solid fa-phone"></i>
              </div>
              <div className="mx-2">

                <p className="text-sm">

                  <a rel="tel" href="+919521133652">9521133652</a> | <a rel="tel" href="+919602672516">9602672516</a>

                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="icon-wrapper static">
                <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="mx-2">
                <p className="text-sm">
                  <a rel="noopener noreferrer" href="mailto:support@sevasangam.com">support@sevasangam.com</a> | <a rel="noopener noreferrer" href="mailto:contact.sevasangam@gmail.com">contact.sevasangam@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="right-container">
          <span className="section-heading line">Submit a ticket</span>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor="title">Title:</label>

              <select name="title" id="title" value={formData.title} onChange={handleChange} required>
                <option value="">Select</option>
                <option value="donation-related-query">Donation Related Query</option>
                <option value="temple-related-query">Temple Related Query</option>
                <option value="80g-certificate">80g Certificate Related Query</option>
                <option value="work-with-us">Work with us</option>
                <option value="feedback">Feedback</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div className='mb-4'>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className='mb-4'>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* <Button  text='Submit' type='primary submit'/> */}
            {
              contactFormLoading ? <Button text='Sending...' type='primary' size='medium' /> : <Button text='Submit' type='primary' size='medium' />
            }
          </form>
        </div>
      </section>

      <section>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3283163428573!2d77.57890541060644!3d12.950830915280683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15e973abff83%3A0x79f8f2a247b5c8b8!2s23%2C%20Shanbough%20Krinshappa%20Ln%2C%20Upparahalli%2C%20Mavalli%2C%20Bengaluru%2C%20Karnataka%20560004!5e0!3m2!1sen!2sin!4v1717845116067!5m2!1sen!2sin" width={'100%'} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" />
      </section>


    </Layout>
  )
}

export default Contact