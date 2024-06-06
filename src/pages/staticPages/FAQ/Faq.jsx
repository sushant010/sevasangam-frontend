import Layout from "../../../components/layout/Layout";
import FAQData from "./FAQdata";

export default function Faq() {
  return (
    <Layout>
      <section className="banner">
        <div className="banner-text">
          <h2 className="text-heading">Frequently Asked Questions (FAQs)</h2>
          <p className="text-md fw-bold text-grey-dark">
            Find answers to common queries about SevaSangam and our services.
          </p>
        </div>
      </section>

      <section className="faq-section">
        <div className="accordion" id = "FAQaccordion">
          {FAQData.map((val, i) => {
            return (
              <div className="accordion-item" key={i}>
                <h2 className="accordion-header" id={`${val.id}-accordion-id`}>
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${val.id}-accordion-collapse`}
                    aria-expanded="false"
                    aria-controls={`${val.id}-accordion-collapse`}
                  >
                    {val.question}
                  </button>
                </h2>

                <div
                  id={`${val.id}-accordion-collapse`}
                  className="accordion-collapse collapse"
                  aria-labelledby={`${val.id}-accordion-id`}
                  data-bs-parent="#FAQaccordion"
                >
                  <div className="accordion-body">{val.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
