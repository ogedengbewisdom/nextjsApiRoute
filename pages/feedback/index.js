import { Fragment, useState } from "react";
import { getExtractedData, getFilePath } from "../api/feedback";
import Link from "next/link";


const FeedbackPage = (props) => {
    // const [selectedData, setSelectedData] = useState();
    const {feedback} = props;
    // const showDetailHandler = async (id) => {
    //     const response = await fetch(`/api/${id}`);
    //     const resData = await response.json();
    //     setSelectedData(resData.feedback.email)
    // };

    return(
            <Fragment>
               <h1>Feedbacks</h1>
               {/* <p>{selectedData}</p> */}
               <ul>
                {feedback.map(item => <li key={item.id}>{item.text} {" "} <button><Link href={`/feedback/${item.id}`}>show Detail</Link></button></li>)}
               </ul>
           </Fragment>
    )
};

export const getStaticProps = async () => {
    const filePath = getFilePath();
    const data = getExtractedData(filePath);

    return {
        props: {
            feedback: data
        }
    }
};
export default FeedbackPage;