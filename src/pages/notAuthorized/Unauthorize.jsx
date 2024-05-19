import React from 'react'
import Layout from '../../components/layout/Layout'
import { Link } from 'react-router-dom'

const Unauthorize = () => {
    return (
        <Layout>
            <section>
                <div className="d-flex flex-column">

                    <img className='m-auto' style={{ width: "500px" }} src='https://cdn.dribbble.com/users/761395/screenshots/6287961/error_401.jpg?resize=400x0'></img>

                    <h1 className='my-3 text-center text-primary fw-bold'>Unauthorize Access</h1>
                    <p className='text-center'>Sorry, You are not authorized to view this page</p>
                    <Link to='/' className='mt-3 btn btn-theme-primary m-auto'>Go to Home</Link>
                </div>


            </section>


        </Layout>
    )
}

export default Unauthorize