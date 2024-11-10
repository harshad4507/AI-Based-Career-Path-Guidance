import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllResoureces } from "../../../services/operations/resouresAPI";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Resources() {
    const { subdomain } = useParams();
    const [loading, setLoading] = useState(false);
    const [resourceData, setResourceData] = useState([]);
    const { user } = useSelector((state) => state.profile);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const result = await getAllResoureces(subdomain, user?._id);
                setResourceData(result?.weeklyBreakdown || []);
            } catch (error) {
                toast.error("Failed to load resources");
            } finally {
                setLoading(false);
            }
        })();
    }, [subdomain]);

    if (loading) {
        return (
            <div className="grid flex-1 place-items-center h-screen">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="p-8 text-richblack-5">
            <h1 className="mb-14 text-3xl font-medium">Resources for {subdomain}</h1>

            {resourceData && resourceData.length > 0 ? (
                resourceData.map((week, index) => (
                    <div
                        key={index}
                        className="my-10 p-6 border border-richblack-700 rounded-lg bg-richblack-800 shadow-lg"
                    >
                        {/* Week and Focus Area */}
                        <h2 className="mb-2 text-2xl font-semibold text-richblack-50">
                            {week.week} - {week.focusArea}
                        </h2>
                        <p className="mb-4 text-richblack-300 text-sm">
                            <span className="font-medium">Time Allocation:</span> {week.timeAllocation}
                        </p>

                        {/* Tasks Section */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-richblack-50 mb-3">Tasks</h3>
                            <ul className="space-y-3">
                                {week.tasks.map((task, i) => (
                                    <li key={i} className="p-4 rounded-md bg-richblack-900 border border-richblack-700">
                                        <h4 className="font-semibold text-richblack-100">{task.title}</h4>
                                        <p className="text-richblack-300 text-sm">{task.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources Section */}
                        <div>
                            <h3 className="text-lg font-semibold text-richblack-50 mb-3">Resources</h3>
                            <ul className="space-y-3">
                                {week.resources.map((resource, i) => (
                                    <li key={i} className="pl-2">
                                        <a
                                            href={resource.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-400 hover:underline"
                                        >
                                            {resource.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-richblack-400">No resources available for this topic.</p>
            )}
        </div>
    );
}
