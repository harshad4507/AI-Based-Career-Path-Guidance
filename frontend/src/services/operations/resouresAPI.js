import { resourcesEndpoints } from "../apis"
import { apiConnector } from "../apiConnector"
import { toast } from "react-hot-toast"

const {
  GET_TOPICS_API,
  GET_RESOURCES_API
} = resourcesEndpoints;

export const getAllTopics = async (subdomain) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_TOPICS_API,
      {
        subdomain,
      },
    )
    console.log("GET_TOPICS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.topics
  } catch (error) {
    console.log("GET_TOPICS_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}

export const getAllResoureces = async (topicTitles) => {
  const toastId = toast.loading("Loading...")
  let result = null
  try {
    const response = await apiConnector(
      "POST",
      GET_RESOURCES_API,
      {
        topicTitles,
      },
    )
    console.log("GET_RESOURCES_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response?.data?.resource;
  } catch (error) {
    console.log("GET_RESOURCES_API API ERROR............", error)
    result = error.response.data
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
};
