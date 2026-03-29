import { askAgent } from "../services/ai.service.js";

export const callAgent = async(req, res) => {
    const { userQuery } = req.body;

    if(!userQuery) {
        return res.status(400).json({
            success: false,
            message: "Can't send empty chat",
            err: "Empty chat"
        });
    }

    try {
        const result = await askAgent({ query: userQuery });

        res.status(200).json({
            success: true,
            message: "Output generated",
            result
        });
    } catch(err) {
        console.log(err.message);
    }
}