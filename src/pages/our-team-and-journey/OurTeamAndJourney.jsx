import Layout from "../../components/layout/Layout";
import SectionImgWithText from "../../components/sectionImgWithTextDesc/SectionImgWithText";
import SectionLinearBg from "../../components/sectionLinearBg/sectionLinearBg";

const OurTeamAndJourney = () => {
  return (
    <Layout>
      <section className="banner">
        <div className="banner-text">
          <h2 className="text-heading">Our Team and Journey</h2>
          <p className="text-md fw-bold text-grey-dark">
            SevaSangam is a platform that connects devotees with temples and
            trusts. We aim to make temple donations transparent, easy, and
            accessible to all.
          </p>
          <button className=" btn primary">Donate Now</button>
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

      <section className="team-section">
        <h3 className="section-heading text-center">Our Team</h3>
        <p className="text-center">Meet the minds shaping our direction.</p>

        <div className="team-container">
          <div className="team-item">
            <div className="team-img">
              <img
                src="https://media.istockphoto.com/id/1338289824/photo/close-up-image-of-indian-man-with-buzz-cut-hairstyle-to-disguise-receding-hairline-wearing-t.webp?b=1&s=170667a&w=0&k=20&c=iQtn24U2eDA49T6UZZ0i2QlDj0TWD_2VeYngAo2Jy8U="
                alt=""
              />
            </div>
            <div className="team-item-title">John</div>
            <div className="team-item-des">CEO</div>
          </div>
          <div className="team-item">
            <div className="team-img">
              <img
                src="https://media.istockphoto.com/id/1338289824/photo/close-up-image-of-indian-man-with-buzz-cut-hairstyle-to-disguise-receding-hairline-wearing-t.webp?b=1&s=170667a&w=0&k=20&c=iQtn24U2eDA49T6UZZ0i2QlDj0TWD_2VeYngAo2Jy8U="
                alt=""
              />
            </div>
            <div className="team-item-title">John</div>
            <div className="team-item-des">CEO</div>
          </div>
          <div className="team-item">
            <div className="team-img">
              <img
                src="https://media.istockphoto.com/id/1338289824/photo/close-up-image-of-indian-man-with-buzz-cut-hairstyle-to-disguise-receding-hairline-wearing-t.webp?b=1&s=170667a&w=0&k=20&c=iQtn24U2eDA49T6UZZ0i2QlDj0TWD_2VeYngAo2Jy8U="
                alt=""
              />
            </div>
            <div className="team-item-title">John</div>
            <div className="team-item-des">CEO</div>
          </div>
        </div>
      </section>
      <section>
        <div className="quote mb-4">
          <h3 className="fw-light">Our Core Value</h3>
          <blockquote>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
            odio doloribus eum culpa quae? Et labore est dolorem sapiente amet,
            sed illo itaque rem hic adipisci voluptate sunt voluptates
            doloremque! Cupiditate odio doloribus eum culpa quae? Et labore est
            dolorem sapiente amet, sed illo itaque rem hic adipisci voluptate
            sunt voluptates doloremque! Et labore est dpisci voluptate sunt
            voluptates doloremque!
          </blockquote>
        </div>
      </section>
      <SectionLinearBg background="https://images.unsplash.com/photo-1646492312014-6130b0f5c6e9?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
        <div className="d-flex w-100 justify-content-end m-auto">
          <div className="w-50">
            <h3 className="section-heading mb-4">Our Vision</h3>
            <p className="text-grey-dark mb-3">
              We envision a world where temple donations are transparent, easy,
              and accessible to all. We aim to bridge the gap between devotees
              and temples by providing a platform that enables devotees to
              donate to their favorite temples and trusts with ease.
            </p>
            <p className="text-grey-dark mb-3">
              We envision a world where temple donations are transparent, easy,
              and accessible to all. We aim to bridge the gap between devotees
              and temples by providing a platform that enables devotees to
              donate to their favorite temples and trusts with ease.
            </p>
            <p className="text-grey-dark mb-3  ">
              We envision a world where temple donations are transparent, easy,
              and accessible to all. We aim to bridge the gap between devotees
              and temples by providing a platform that enables devotees to
              donate to their favorite temples and trusts with ease.
            </p>
          </div>
        </div>
      </SectionLinearBg>
      <section>
        <h3 className="section-heading line"> Our Collaborators</h3>
        <div className="collaborators">
          <div className="collaborator">
            <img
              src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="collaborator">
            <img
              src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="collaborator">
            <img
              src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div className="collaborator">
            <img
              src="https://plus.unsplash.com/premium_photo-1661310049066-57565d639aba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OurTeamAndJourney;
