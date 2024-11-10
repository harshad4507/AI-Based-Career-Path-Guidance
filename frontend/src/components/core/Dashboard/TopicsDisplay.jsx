import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { getAllTopics } from "../../../services/operations/resouresAPI";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { RiEditBoxLine } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";
import IconBtn from "../../Common/IconBtn";

export default function TopicsDisplay() {
    const { subdomain } = useParams();
    const navigate = useNavigate(); // Initialize navigate
    const [loading, setLoading] = useState(false);
    const [introduction, setIntroduction] = useState("");
    const [easyTopics, setEasyTopics] = useState([]);
    const [mediumTopics, setMediumTopics] = useState([]);
    const [hardTopics, setHardTopics] = useState([]);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const result = await getAllTopics(subdomain);
                setIntroduction(result.introduction);
                setEasyTopics(result.easyTopics);
                setMediumTopics(result.mediumTopics);
                setHardTopics(result.hardTopics);
            } catch (error) {
                toast.error("Failed to load topics");
            } finally {
                setLoading(false);
            }
        })();
    }, [subdomain]);

    // Function to handle the navigation on button click
    const handleSeeResourcesClick = () => {
        navigate(`/dashboard/Resources/${subdomain}/`);
    };

    if (loading) {
        return (
            <div className="grid flex-1 place-items-center">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <>
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">Topics - {subdomain}</h1>

            {/* Introduction Section */}
            <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 mb-10">
                <h2 className="text-2xl font-semibold text-richblack-5 mb-4">Introduction</h2>
                <p className="text-richblack-300">{introduction}</p>
            </div>

            {/* Topics Sections */}
            <TopicSection title="Easy Topics" topics={easyTopics} />
            <TopicSection title="Medium Topics" topics={mediumTopics} />
            <TopicSection title="Hard Topics" topics={hardTopics} />

            {/* Finalize Button at the Bottom of the Page */}
            <div className="mt-8 flex justify-end">
                <IconBtn
                    text="Go To Resources"
                    onclick={handleSeeResourcesClick} // Pass the navigation function here
                    className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    <FaArrowRight />
                </IconBtn>
            </div>
        </>
    );
}

// Helper component to render each topic section
function TopicSection({ title, topics }) {
    return (
        <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
            <div className="flex w-full items-center justify-between">
                <h2 className="text-lg font-semibold text-richblack-5">{title}</h2>
                <RiEditBoxLine className="text-richblack-300" />
            </div>
            {topics.length > 0 ? (
                topics.map((topic, index) => (
                    <div key={index} className="mb-4 p-4 border border-richblack-700 rounded-md bg-richblack-900">
                        <h3 className="text-xl font-semibold text-richblack-5">{topic.title.replace("**", "")}</h3>
                        <p className="text-richblack-300">{topic.description.replace("**", "")}</p>
                    </div>
                ))
            ) : (
                <p className="text-richblack-400">No topics available for {title.toLowerCase()}.</p>
            )}
        </div>
    );
}
