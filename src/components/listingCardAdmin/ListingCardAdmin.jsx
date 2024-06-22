import PropTypes from 'prop-types';
import { useAuth } from '../../context/Auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAdminTemples } from "../../context/AdminTemples";
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import { useState } from 'react';

const ListingCardAdmin = ({ temple }) => {

  const [auth] = useAuth()
  const navigate = useNavigate();
  const [adminTemples, setAdminTemples, removeTempleFromLocalStorage] = useAdminTemples();
  const [loading, setLoading] = useState(false);
  const createdBy = temple.createdBy?.name ? temple.createdBy?.name : 'ahsjh'[0].toUpperCase();


  const handleViewTemple = (id, e) => {
    e.stopPropagation();
    window.scrollTo(0, 0)
    auth.user?.role === 1 ?
      navigate(`/admin/temple/${id}`) :
      navigate(`/superadmin/temple/${id}`);
  };

  const handleUpdateTemple = (id, e) => {
    e.stopPropagation();
    window.scrollTo(0, 0)
    auth?.user?.role == 1 ?
      navigate(`/admin/update-temple/${id}`) :
      navigate(`/superadmin/update-temple/${id}`);

  }


  const handleDeleteTemple = async (id, e) => {
    e.stopPropagation();
    setLoading(true);
    const api = import.meta.env.VITE_API_URL;
    try {
      const response = await axios.delete(`${api}/temple/delete-temple/${id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        removeTempleFromLocalStorage(id);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Failed to delete temple');
      console.error('Error deleting temple:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUpcomingEvent = (id, e) => {
    e.stopPropagation();
    window.scrollTo(0, 0)
    auth?.user?.role == 1 ?
      navigate(`/admin/add-event/${id}`) :
      navigate(`/superadmin/add-event/${id}`);
  }

  const navigateToTemple = (id, e) => () => {
    e.stopPropagation();
    window.scrollTo(0, 0)
    auth.user?.role === 1 ?
      navigate('/admin/temple/' + id) :
      navigate('/superadmin/temple/' + id);
  }



  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="listing admin" onClick={(e) => navigateToTemple(temple._id, e)}>
        <div style={{ position: "relative" }} className="listing-img-wrapper">

          {!temple.isVerified && (<span style={{ position: "absolute", right: "0", backgroundColor: "var(--color-theme-error)", color: "white", padding: "2px 4px", fontSize: "13px", borderRadius: "6px", margin: "4px " }}>Unverified</span>)}
          {(temple.hasChangesToApprove == 1 && temple.isVerified == 1) && (<span style={{ position: "absolute", right: "0", backgroundColor: "var(--color-theme-error)", color: "white", padding: "2px 4px", fontSize: "13px", borderRadius: "6px", margin: "4px " }}>Modified</span>)}
          <img
            src={temple.images.bannerImage ? temple.images.bannerImage : "https://images.unsplash.com/photo-1564804955013-e02ad9516982?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}

          />
        </div>

        <div className="listing-content">
          <h2 className="listing-title fw-bold ">{temple.templeName.length > 20 ? `${temple.templeName.slice(0, 20)}...` : temple.templeName}</h2>
          <p className="listing-description text-grey-light text-sm">
            {temple.location.city ? temple.location.city : 'City'}, {temple.location.state ? temple.location.state : 'State'}, {temple.location.country ? temple.location.country : 'Country'}
          </p>
          <div className="table-responsive">
            <table className='table table-light table-bordered table-striped' style={{ border: "1px solid #cecece", width: "100%" }}>
              <tbody>
                <tr>
                  <td className="listing-donation  text-sm">Donation : </td>
                  <td className="listing-donation text-grey-dark text-sm"> {temple.donation}</td>
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
                      onClick={(e) => handleViewTemple(temple._id, e)}

                    >
                      <i
                        className="fa-solid fa-eye"
                        style={{ color: "var(--color-theme-primary)" }}
                      ></i>
                    </button>
                    <button
                      title="Update Temple"
                      onClick={(e) => handleUpdateTemple(temple._id, e)}

                    >
                      <i
                        className="fa-solid fa-pen-to-square"
                        style={{ color: "var(--color-theme-primary)" }}
                      ></i>
                    </button>
                    <button
                      title="Add Upcoming Temple"
                      onClick={(e) => handleAddUpcomingEvent(temple._id, e)}

                    >
                      <i
                        className="fa-solid fa-plus-square"
                        style={{ color: "var(--color-theme-primary)" }}
                      ></i>
                    </button>
                    {auth?.user?.role == 2 ? (<button title="Delete Temple"
                      onClick={(e) => handleDeleteTemple(temple._id, e)}

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
    </>
  )
}



ListingCardAdmin.propTypes = {
  temple: PropTypes.object,

};


export default ListingCardAdmin