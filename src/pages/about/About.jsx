import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import SectionImgWithText from '../../components/sectionImgWithTextDesc/SectionImgWithText.jsx';
import SectionLinearBg from '../../components/sectionLinearBg/sectionLinearBg';
import './about.css';

const About = () => {
  return (
    <Layout title="About Us" description="Learn more about our team and mission">

      <section className='banner'>
        <div className="banner-text">
          <h2 className="text-heading">About Us</h2>
          <p className="text-md text-grey-dark">
            SevaSangam is a visionary platform dedicated to facilitating spiritual connections and supporting temples through seamless digital solutions. Founded with a deep commitment to preserving cultural heritage and fostering devotion, SevaSangam bridges tradition with technology to empower individuals and communities worldwide.

          </p>
          <Link to="/temples" className="btn btn-theme-primary">Donate Now</Link>
        </div>
      </section>
      <SectionImgWithText
        title="How we evolved"
        img1="https://plus.unsplash.com/premium_photo-1678693021499-c6c5111bbc74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        img2="https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?q=80&w=1948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        img3="https://images.unsplash.com/photo-1544588440-fc7551331160?q=80&w=1844&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        sectionTitle="About SevaSangam"
        sectionDesc="At SevaSangam, our mission and vision stem from recognizing the evolving needs of our society and the timeless significance of spiritual connection. We saw a unique opportunity to bridge tradition and technology, addressing the challenges devotees face in making donations and payments to temples, especially when physical presence is not feasible.    In today’s fast-paced world, the need for convenient and secure methods of supporting religious institutions is crucial. Temples are vital in preserving our cultural and spiritual heritage, yet many struggle with financial stability and connecting with the tech-savvy younger generation. Devotees seek meaningful ways to contribute without geographic or time constraints. SevaSangam addresses these needs by providing an accessible, convenient, and transparent platform for donations, ensuring that temples receive the support they need for upkeep, activities, and community services. This digital solution also engages younger generations, making it easier for them to stay connected to their heritage. Through SevaSangam, we harness technology to uphold and enhance spiritual traditions, ensuring the cultural and religious fabric of our society remains strong and vibrant for future generations."
      />

      <SectionLinearBg background="https://images.unsplash.com/photo-1646492312014-6130b0f5c6e9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
        <div className='d-flex w-100 justify-content-end m-auto'>
          <div className='w-50'>

            <h3 className="section-heading mb-4">Our Vision</h3>
            <p className="text-grey-dark mb-3">
              To become the leading online platform that bridges the gap between devotees and temples, SevaSangam aspires to foster spiritual connections and support through seamless digital payments and donations, enriching the cultural and religious heritage of our community. We envision a world where technology and tradition unite to create a vibrant, accessible, and supportive environment for spiritual growth and temple sustenance.</p>
            <p className="text-grey-dark mb-3">
              We envision a world where temple donations are transparent, easy,
              and accessible to all. We aim to bridge the gap between devotees
              and temples by providing a platform that enables devotees to
              donate to their favorite temples and trusts with ease.</p>
            {/* <p className="text-grey-dark mb-3  ">
              We envision a world where temple donations are transparent, easy,
              and accessible to all. We aim to bridge the gap between devotees
              and temples by providing a platform that enables devotees to
              donate to their favorite temples and trusts with ease.</p> */}

          </div>

        </div></SectionLinearBg>

      <section>
        <div className="quote mb-4">

          <h3 className="fw-light">Our Core Value</h3>
          <blockquote style={{ fontSize: "16px" }}>
            Driven by a passion for service and a belief in the transformative power of collective action, SevaSangam strives to make temple offerings accessible, transparent, and meaningful for all. Our platform serves as a catalyst for positive change, empowering devotees to make a tangible difference in the upkeep and development of sacred spaces.
          </blockquote>

        </div>
      </section>

      {/* <section className='team-section'>

        <h3 className="section-heading text-center">Our Team</h3>
        <p className="text-center">Meet the minds shaping our direction.</p>

        <div className="team-container">
          <div className="team-item">
            <div className="team-img">
              <img src="https://media.istockphoto.com/id/1338289824/photo/close-up-image-of-indian-man-with-buzz-cut-hairstyle-to-disguise-receding-hairline-wearing-t.webp?b=1&s=170667a&w=0&k=20&c=iQtn24U2eDA49T6UZZ0i2QlDj0TWD_2VeYngAo2Jy8U=" alt="" />
            </div>
            <div className="team-item-title">
              Surya Pratap Singh
            </div>
            <div className="team-item-des">
              CEO
            </div>
          </div>
          <div className="team-item">
            <div className="team-img">
              <img src="https://media.istockphoto.com/id/1338289824/photo/close-up-image-of-indian-man-with-buzz-cut-hairstyle-to-disguise-receding-hairline-wearing-t.webp?b=1&s=170667a&w=0&k=20&c=iQtn24U2eDA49T6UZZ0i2QlDj0TWD_2VeYngAo2Jy8U=" alt="" />
            </div>
            <div className="team-item-title">
              Sushant Kumar Suman
            </div>
            <div className="team-item-des">
              CTO
            </div>
          </div>
          <div className="team-item">
            <div className="team-img">
              <img src="https://media.istockphoto.com/id/1338289824/photo/close-up-image-of-indian-man-with-buzz-cut-hairstyle-to-disguise-receding-hairline-wearing-t.webp?b=1&s=170667a&w=0&k=20&c=iQtn24U2eDA49T6UZZ0i2QlDj0TWD_2VeYngAo2Jy8U=" alt="" />
            </div>
            <div className="team-item-title">
              Rahul Kumar
            </div>
            <div className="team-item-des">
              CFO
            </div>
          </div>
        </div>
      </section> */}


      {/* <section className='awards-section'>
        <div className="section-heading line">
          Awards and Achievement
        </div>
        <div className="card-container">
          <div className="card">
            <img
              src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card Image"
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-title">Award Name</h2>
              <p className="card-description">
                Lorem Ipsum has been the industrys standard dummy{" "}
              </p>
            </div>
          </div>
          <div className="card">
            <img
              src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card Image"
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-title">Award Name</h2>
              <p className="card-description">
                Lorem Ipsum has been the industrys standard dummy{" "}
              </p>
            </div>
          </div>
          <div className="card">
            <img
              src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card Image"
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-title">Award Name</h2>
              <p className="card-description">
                Lorem Ipsum has been the industrys standard dummy{" "}
              </p>
            </div>
          </div>
          <div className="card">
            <img
              src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Card Image"
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-title">Award Name</h2>
              <p className="card-description">
                Lorem Ipsum has been the industrys standard dummy{" "}
              </p>
            </div>
          </div>
        </div>

      </section> */}

      <SectionLinearBg background="https://images.unsplash.com/photo-1559967861-dcec8e280633?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
        <div className='d-flex w-100 justify-content-end auto'>
          <div className='w-50'>

            <h3 className="section-heading mb-4">Our Mission</h3>
            <p className="text-grey-dark mb-3">
              SevaSangam is committed to empowering individuals to connect with their faith and heritage through innovative online services. </p>
            <p className="text-grey-dark mb-3">
              Our mission is to facilitate secure and convenient donations and payments to temples, strengthen the bond between devotees and temples through technology, and promote transparency and trust in religious contributions. We aim to support the maintenance and development of temples and their activities, ensuring they remain vibrant centers of spiritual practice and community gathering.</p>
            <p className="text-grey-dark mb-3  ">
              By providing a user-friendly platform, we enhance the spiritual experience for all devotees, making it easier for them to participate in and contribute to the preservation and growth of their cultural and religious heritage.</p>

          </div>

        </div></SectionLinearBg>
      {/* <section>

        <h3 className='section-heading line'> Our Collaborators</h3>
        <div className="collaborators">
          <div className="collaborator">
            <img src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="collaborator">
            <img src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="collaborator">
            <img src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="collaborator">
            <img src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
        </div>
      </section> */}



    </Layout>
  )
}

export default About