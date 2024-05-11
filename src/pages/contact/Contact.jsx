import { useState } from 'react';
import Button from '../../components/buttons/Button';
import Layout from '../../components/layout/Layout';
import './contact.css';
const Contact = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, such as sending data to the server
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      title: '',
      message: '',
      email: ''
    });
  };
  return (
    <Layout>
      <section className='banner'>
     
              <div className="banner-text">
          <h2 className="text-heading">Contact Us</h2>
            <p className="text-md fw-bold text-grey-dark">
            Call us at +917738714428, email on test@sevasangam.com submit a ticket, and our team will get back shortly.

                  </p>
                  <Button/>
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
                5th Main Rd, Sector 6, HSR Layout, Bangalore, Karnataka, 560102
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center mb-3">
            <div className="icon-wrapper static">
              <i className="fa-solid fa-phone"></i>
            </div>
            <div className="mx-2">
              
              <p className="text-sm">
              test@gmail.com | test2@gmail.com
              </p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <div className="icon-wrapper static">
            <i className="fa-solid fa-envelope"></i>
            </div>
            <div className="mx-2">
              <p className="text-sm">
                 96325896325 | 9632587412
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
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
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
      <Button  text='Submit' type='primary submit'/>
    </form>
       </div>
      </section>
      
      <section>
      <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d112057.40065448315!2d77.12502679309405!3d28.635942376461674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x390cfd4517ab8d91%3A0x82e70eda7b1b1443!2sDAV%20PUBLIC%20SCHOOL%2C%20RamaKrishna%20Ashram%20Marg%2C%20Sector%203%2C%20Block%20D%2C%20DIZ%20Area%2C%20Gole%20Market%2C%20New%20Delhi%2C%20Delhi%20110001!3m2!1d28.635967299999997!2d77.2074282!5e0!3m2!1sen!2sin!4v1714278561533!5m2!1sen!2sin" width={'100%'} height={450} style={{border: 0}} allowFullScreen loading="lazy" />
      </section>


    </Layout>
  )
}

export default Contact