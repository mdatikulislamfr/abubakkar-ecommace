import fs from 'fs'
import cron from 'node-cron'
import path from 'node:path';
const errorFileSynck = async (root: string) => {
    if (process.env.EROR_SEND_ON != "true") return;
    const filePath = path.join(root, "error.log");
    cron.schedule(`*/${Number(process.env.EROR_SEND_TIME)} * * * *`, async () => {
        try {
            if (fs.existsSync(filePath)) {
                const logData = fs.readFileSync(filePath, "utf8");
                const logEntries = logData.trim().split('\n');
                if (logEntries.length > 0) {
                    const bulkData = logEntries.map((entry: string) => ({
                        logs: entry,
                        timestamp: new Date()
                    }));
                    console.log(bulkData);
                    // inset quary
                    // send message teligram
                    // const status = await errorLogModel.insertMany(bulkData);
                    fs.writeFileSync(filePath, "");
                    console.log("Error logs successfully synced to MongoDB.");
                }
            }
        } catch (err) {
            console.error("Cron Error in errorFileSynck:", err instanceof Error ? err.message : "");
        }
    });
};

module.exports = errorFileSynck;