import { getExtractedData, getFilePath } from "./feedback";

const handler = (req, res) => {
    const feedbackId = req.query.feedbackId;
    const filePath = getFilePath();
    const data = getExtractedData(filePath);
    const selectedData = data.find(item => item.id === feedbackId)
    res.status(200).json({feedback: selectedData})
};

export default handler