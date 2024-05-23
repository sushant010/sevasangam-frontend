import PropTypes from 'prop-types';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAdminTemples } from '../../context/AdminTemples';
const ListingCardAdmin = ({ temple }) => {

  const [auth] = useAuth()
  const navigate = useNavigate();
  const [adminTemples, setAdminTemples] = useAdminTemples()

  const createdBy = temple.createdBy?.name ? temple.createdBy?.name : 'ahsjh'[0].toUpperCase();

  const handleViewTemple = (id) => {

    if (auth?.user?.role == 2) {
      navigate(`/superadmin/temple/${id}`)
    } else {
      navigate(`/admin/temple/${id}`)
    }


  }

  const handleUpdateTemple = (id) => {

    if (auth?.user?.role == 2) {
      navigate(`/superadmin/update-temple/${id}`)
    } else {
      navigate(`/admin/update-temple/${id}`)
    }

  }


  const handleDeleteTemple = async (id) => {
    const api = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.delete(`${api}/temple/delete-temple/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setAdminTemples(adminTemples.filter(temple => temple._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to delete temple');
      console.error('Error deleting temple:', error);
    }
  };


  const navigateToTemple = (id) => () => {
    navigate('/superadmin/temple/' + id)
  }



  return (

    <div className="listing admin" onClick={navigateToTemple(temple._id)}>
      <div className="listing-img-wrapper">
        <img
          src={temple?.images.templeBannerImage ? temple?.images.templeBannerImage : "https://images.unsplash.com/photo-1564804955013-e02ad9516982?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}

        />
      </div>

      <div className="listing-content">
        <h2 className="listing-title fw-bold ">{temple.templeName.length > 20 ? `${temple.templeName.slice(0, 20)}...` : temple.templeName}</h2>
        <p className="listing-description text-grey-light text-sm">
          {temple.location.address.length > 20 ? `${temple.location.address.slice(0, 20)}...` : temple.location.address}
        </p>
        <div className="table-responsive">
          <table className='table table-light table-bordered table-striped' style={{ border: "1px solid #cecece", width: "100%" }}>
            <tbody>
              <tr>
                <td className="listing-donation  text-sm">Donation : </td>
                <td className="listing-donation text-grey-dark text-sm">{temple.donation}</td>
              </tr>
              {auth?.user?.role == 2 ? (

                <tr>
                  <td className="listing-donation text-sm">Created By : </td>
                  <td className="listing-donation text-grey-dark text-sm">{createdBy}</td>
                </tr>
              ) : null

              }

              <tr>
                <td className="listing-donation text-sm">Actions : </td>
                <td className="listing-donation text-grey-dark text-sm">
                  <button
                    title="View Temple"
                    onClick={() => handleViewTemple(temple._id)}

                  >
                    <i
                      className="fa-solid fa-eye"
                      style={{ color: "var(--color-theme-primary)" }}
                    ></i>
                  </button>
                  <button
                    title="Update Temple"
                    onClick={() => handleUpdateTemple(temple._id)}

                  >
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ color: "var(--color-theme-primary)" }}
                    ></i>
                  </button>
                  {auth?.user?.role == 2 ? (<button title="Delete Temple"
                    onClick={() => handleDeleteTemple(temple._id)}

                  >
                    <i
                      className="fa-solid fa-trash-can"
                      style={{ color: "#D83F31" }}
                    ></i>
                  </button>) : null}

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}



ListingCardAdmin.propTypes = {
  temple: PropTypes.object,

};


export default ListingCardAdmin