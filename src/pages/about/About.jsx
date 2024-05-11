import Button from '../../components/buttons/Button';
import Layout from '../../components/layout/Layout';
import SectionImgWithText from '../../components/sectionImgWithTextDesc/SectionImgWithText';
import './about.css';
const About = () => {
  return (
      <Layout>
          
          <section className='banner'>
              <div className="banner-text">
          <h2 className="text-heading">About Us</h2>
            <p className="text-md fw-bold text-grey-dark">
              SevaSangam is a platform that connects devotees with temples and
              trusts. We aim to make temple donations transparent, easy, and
              accessible to all. 
                  </p>
                  <Button/>
            </div>
      </section>
      <SectionImgWithText
          title="How we evolved"
          img1="https://plus.unsplash.com/premium_photo-1678693021499-c6c5111bbc74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          img2="https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          img3="https://images.unsplash.com/photo-1544588440-fc7551331160?q=80&w=1844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          sectionTitle="Lorem Ipsum has been the industrys standard dummy"
          sectionDesc="Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
      />
      
      <section>
      <div className="quote mb-4">
             
             <h3 className="fw-light">Our Core Value</h3>
           <blockquote>
           Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate odio doloribus eum culpa quae? Et labore est dolorem sapiente amet, sed illo itaque rem hic adipisci voluptate sunt voluptates doloremque! Cupiditate odio doloribus eum culpa quae? Et labore est dolorem sapiente amet, sed illo itaque rem hic adipisci voluptate sunt voluptates doloremque!  Et labore est dpisci voluptate sunt voluptates doloremque! 
           </blockquote>

           </div>
      </section>

      <section>

      <h3 className="fw-light">Our Team</h3>
      </section>
  

   
    </Layout>
  )
}

export default About