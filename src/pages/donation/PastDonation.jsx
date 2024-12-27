import { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout'
import axios from 'axios';
import { useAuth } from '../../context/Auth';
import { toast } from 'react-toastify';
import HashLoader from "react-spinners/HashLoader";
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner';
import UserDonations from './UserDonations';
const PastDonations = () => {

    return (
        <Layout>
            <UserDonations></UserDonations>
        </Layout>
    );
}

export default PastDonations