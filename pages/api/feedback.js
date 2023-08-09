import path from "path";
import fs from "fs";


export const getFilePath = () => {
    return path.join(process.cwd(), "data", "feedback.json")
}

export const getExtractedData = (filepath) => {
    const fileData = fs.readFileSync(filepath);
    const jsonData = JSON.parse(fileData);
    return jsonData;
}
const handler = (req, res) => {
    
    if (req.method === "POST") {
        const email = req.body.email;
        const text = req.body.text;

        const newFeedback = {
            id: new Date().toISOString(),
            email,
            text
        }
        const filePath = getFilePath();
        const data = getExtractedData(filePath)
        data.push(newFeedback);
        fs.writeFileSync(filePath, JSON.stringify(data));
        res.status(201).json({message: success, feedback: newFeedback});
    } else {
        const filePath = getFilePath();
        const data = getExtractedData(filePath);
        res.status(201).json({meassage: "Success", feedback: data})
    }
};

export default handler;

