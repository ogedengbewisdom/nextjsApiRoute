import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

    // const showDetailHandler = async (id) => {
    //     const response = await fetch(`/api/${id}`);
    //     const resData = await response.json();
    //     setSelectedData(resData.feedback.email)
    // };


const FeedbackDetailPage = () => {
    const [seleted, setSelected] = useState([])
    const router = useRouter();


    const sendRequest = async () => {
        const feedbackId = router.query.feedbackId;
        if (!feedbackId) {
            return <p>INVALID ID</p>
        }
        const response = await fetch(`/api/${feedbackId}`);
        const data = await response.json();
        if (!data.feedback ) {
            return <p>Loading</p>
        }
        setSelected(data.feedback.email);
    }


    useEffect( () => {
        sendRequest();
    }, [sendRequest]);

    if(seleted === null && !seleted) {
        return <p>No p now</p>
    }
    return <Fragment>
        <h1>{seleted}</h1>
    </Fragment>
};

export default FeedbackDetailPage;