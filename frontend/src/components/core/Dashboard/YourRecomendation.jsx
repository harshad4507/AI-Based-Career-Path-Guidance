import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { getDomainData } from '../../../services/operations/assessmentAPI'; // Make sure the path is correct

export default function YourRecommendation() {
    const dispatch = useDispatch(); 
    const { user } = useSelector((state) => state.profile);
    const { domainData } = useSelector((state) => state.domain);
    const navigate = useNavigate();
    const [selectedSubdomain, setSelectedSubdomain] = useState(''); // State to store selected subdomain

    useEffect(() => {
        if (user?.recomendation) {
            dispatch(getDomainData(user?.recomendation)); // Dispatch action to get domain data
        }
    }, [dispatch, user?.recomendation]); // Add user.recomendation to the dependency array

    const handleRadioChange = (event) => {
        setSelectedSubdomain(event.target.value); // Update selected subdomain
    };

    const handleSeeTopicsClick = () => {
        if (selectedSubdomain) {
            // Navigate to the topics page with the selected subdomain
            navigate(`/topics/${selectedSubdomain}`);
        } else {
            alert('Please select a subdomain to see the topics');
        }
    };

    console.log(domainData); // Log domain data for debugging

    return (
        <>
            {user?.isRecommended && domainData && ( // Check for domainData
                <>
                    <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                        Your Recommendation
                    </h1>

                    {/* Displaying recommendations */}
                    <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                        <div className="flex w-full items-center justify-between">
                            <p className="text-lg font-semibold text-richblack-5">
                                {user?.recomendation} {/* Display the main domain */}
                            </p>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-richblack-5">Subdomains:</h2>
                            <form>
                                {domainData.map((subdomain, index) => (
                                    <div key={index} className="flex items-center gap-x-2 mb-2">
                                        <input
                                            type="radio"
                                            id={`subdomain-${index}`}
                                            name="subdomain"
                                            value={subdomain}
                                            checked={selectedSubdomain === subdomain}
                                            onChange={handleRadioChange}
                                            className="cursor-pointer"
                                        />
                                        <label
                                            htmlFor={`subdomain-${index}`}
                                            className="text-sm text-richblack-5 cursor-pointer"
                                        >
                                            {subdomain}
                                        </label>
                                    </div>
                                ))}
                            </form>
                        </div>

                        {/* See the Topics button */}
                        <div className="mt-8 flex justify-end">
                            <IconBtn
                                text="See the Topics"
                                onclick={handleSeeTopicsClick}
                                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                <FaArrowRight />
                            </IconBtn>
                        </div>
                    </div>
                </>
            )}
            {!user?.isRecommended && (
                <>
                    <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                        Please give the Assessment to start your journey !!
                    </h1>

                    <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                        <div className="flex w-full items-center justify-between">
                            <p className="text-lg font-semibold text-richblack-5"> Start Assessment</p>
                            <IconBtn
                                text="Start"
                                onclick={() => {
                                    navigate("/dashboard/Assessment-page-1");
                                }}
                            >
                                <FaArrowRight />
                            </IconBtn>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
