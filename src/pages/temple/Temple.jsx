import Layout from "../../components/layout/Layout"
import './temple.css'

const Temple = () => {
  return (
    <Layout>
      <section className="temple-container">
        <div className="d-flex">

          <div className="img-wrapper">

            <img src="https://source.unsplash.com/1600x900/?temple" alt="temple" />

          </div>
          <div className="temple-details">
            <h2 className="section-heading">Temple Name</h2>
            <p><div className="fa-solid fa-location-dot mx-1"></div> Mumbai, Maharashtra</p>
            <div className="d-flex"><span className="feature bg-primary">Tax Benfit</span><span className="feature bg-success">Assured</span></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nostrum quae expedita soluta placeat quidem necessitatibus, ipsum minus, quisquam temporibus libero eos velit fuga non rerum. Commodi sequi ullam tempora quia hic eum sint, facere fugiat iure, ipsa quos vero.</p>
            
            </div>
        </div>

        <div className="d-flex">
          <div className="temple-details">
            <h3 className="section-heading mt-4">Lorem ipsum dolor, sit amet consectetur.</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eveniet doloremque facilis placeat sint nam. Dicta, minus sint. In officia sunt dignissimos quae totam id odio reiciendis nemo! Doloribus, nesciunt. Enim obcaecati optio laborum repellendus animi vel nostrum esse cum accusantium, doloribus labore a dicta. Excepturi nemo earum pariatur assumenda.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eveniet doloremque facilis placeat sint nam. Dicta, minus sint. In officia sunt dignissimos quae totam id odio reiciendis nemo! Doloribus, nesciunt. Enim obcaecati optio laborum repellendus animi vel nostrum esse cum accusantium, doloribus labore a dicta. Excepturi nemo earum pariatur assumenda.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eveniet doloremque facilis placeat sint nam. Dicta, minus sint. In officia sunt dignissimos quae totam id odio reiciendis nemo! Doloribus, nesciunt. Enim obcaecati optio laborum repellendus animi vel nostrum esse cum accusantium, doloribus labore a dicta. Excepturi nemo earum pariatur assumenda.</p>
            <div className="img-wrapper">
              <img src="https://source.unsplash.com/1600x900/?temple-indian" alt="temple" />
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eveniet doloremque facilis placeat sint nam. Dicta, minus sint. In officia sunt dignissimos quae totam id odio reiciendis nemo! Doloribus, nesciunt. Enim obcaecati optio laborum repellendus animi vel nostrum esse cum accusantium, doloribus labore a dicta. Excepturi nemo earum pariatur assumenda.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum eveniet doloremque facilis placeat sint nam. Dicta, minus sint. In officia sunt dignissimos quae totam id odio reiciendis nemo! Doloribus, nesciunt. Enim obcaecati optio laborum repellendus animi vel nostrum esse cum accusantium, doloribus labore a dicta. Excepturi nemo earum pariatur assumenda.</p>  

          </div>
          <div className="donation-ways">

            </div>
        </div>

      </section>
          
    </Layout>
  )
}

export default Temple