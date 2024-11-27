import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';

const CancellationAndRefund = () => {
    return (
        <Layout>
            <section>
                <div>
                    <h1 className='section-heading'>Cancellation and Refund Policy</h1>
                    <hr />
                    <p>Last updated: Nov 15, 2024</p>
                    <br />
                    <h2 className=" h3">Cancellation Policy</h2>
                    <hr />
                    <p>
                        Donations and service requests made through SevaSangam are generally non-refundable, except in specific cases such as duplicate transactions or technical errors. If you need to request a cancellation, please contact our support team within <strong>24 hours</strong> of the transaction. Cancellations beyond this period may not be honored.
                    </p>
                    <br />
                    <h2 className=" h3">Refund Policy</h2>
                    <hr />
                    <p>
                        Approved refunds will be processed to the original payment method. Refunds may take <strong>7-10 business days</strong>, depending on your payment provider.
                    </p>
                    <br />
                    <h2 className=" h3">Exceptions</h2>
                    <hr />
                    <p>
                        Refunds are not applicable for:
                    </p>
                    <ul>
                        <li>Services that have already been rendered, such as rituals or poojas.</li>
                        <li>Custom or special service requests confirmed by you.</li>
                    </ul>
                    <br />
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

export default CancellationAndRefund;
