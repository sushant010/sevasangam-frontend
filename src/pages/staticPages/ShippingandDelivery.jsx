import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const ShippingAndDelivery = () => {
    return (
        <Layout>
            <section>
                <div>
                    <h1 className='section-heading'>Shipping and Delivery Policy</h1>
                    <hr />
                    <p>Last updated: Nov 15, 2024</p>
                    <h2>Order Processing</h2>
                    <hr />
                    <p>
                        Orders are processed within <strong>1-3 business days</strong> of confirmation. You will receive a confirmation email with tracking details once your order is shipped.
                    </p>
                    <h2>Shipping Methods and Charges</h2>
                    <hr />
                    <p>
                        We partner with trusted delivery services for safe and timely delivery. Shipping charges are calculated at checkout based on your location and the weight of the items.
                    </p>
                    <h2>Estimated Delivery Times</h2>
                    <hr />
                    <ul>
                        <li><strong>Domestic Orders:</strong> 5-7 business days after dispatch.</li>
                        <li><strong>International Orders:</strong> 10-15 business days after dispatch, subject to customs clearance.</li>
                    </ul>
                    <h2>Prasadams and Perishable Items</h2>
                    <hr />
                    <p>
                        Special care is taken to ensure the freshness of prasadams and perishable items. Delivery for such items is expedited, but delays caused by unforeseen circumstances are not our responsibility.
                    </p>
                    <h2>Undelivered or Lost Packages</h2>
                    <hr />
                    <p>
                        For delayed or lost packages, contact our support team with your Order ID. Refunds or replacements will be processed based on the investigation outcome.
                    </p>
                    <h2>Returns and Exchanges</h2>
                    <hr />
                    <p>
                        As our offerings are primarily religious or perishable, returns or exchanges are not accepted unless the item is damaged during transit. Notify us within <strong>24 hours</strong> of receiving the item with photographic evidence.
                    </p>
                    <br/>
                    <h2 className=" h3">Contact Us</h2>
        <hr />
        <p>
          If you have any questions about this Privacy Policy, You can contact
          us:
        </p>
        <br />
        <ul>
          <li>
            <p>
              By email:{" "}
              <a href="mailto:support@sevasangam.com">support@sevasangam.com</a>
            </p>
          </li>
          <li>
            <p>
              By visiting this page on our website:{" "}
              <a href="https://sevasangam.com/contact">
                https://sevasangam.com/contact
              </a>
            </p>
          </li>
          <li>
            <p>
            Unit 101, Oxford Towers, 139, HAL Old Airport Rd, Kodihalli, Bengaluru, Karnataka 560008
            </p>
          </li>
        </ul>
                </div>
            </section>
        </Layout>
    );
}

export default ShippingAndDelivery;
