import Button from '../../components/buttons/Button';
import Layout from '../../components/layout/Layout';
import './howItWorks.css';
const HowItWorks = () => {
  return (
      <Layout>
          
          <section className='banner'>
              <div className="banner-text">
          <h2 className="text-heading">How it works!</h2>
            <p className="text-md fw-bold text-grey-dark">
              SevaSangam is a platform that connects devotees with temples and
              trusts. We aim to make temple donations transparent, easy, and
              accessible to all. 
                  </p>
                  <Button/>
            </div>
          </section>
        <section className="about-section">
          <div className="about-section-text">
            <h2 className="text-heading">About Us</h2>
            <p className="text-lg">
              SevaSangam is a platform that connects devotees with temples and
              trusts. We aim to make temple donations transparent, easy, and
              accessible to all. Our platform allows devotees to donate to
              temples and trusts of their choice. We also provide a platform for
              temples and trusts to manage their donations and donors. Our
              mission is to make temple donations transparent and accessible to
              all.
            </p>
          </div>
        </section>
    </Layout>
  )
}

export default HowItWorks