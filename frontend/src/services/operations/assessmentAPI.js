import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector"
import { setLoading } from "../../slices/assessmentSlice"
import {assessmentEndpoints} from "../apis"
import { setdomainData , setLoadingATDomain} from "../../slices/domainSlice"

const {
 SUBMIT_ASSESSMENT_API,
 GET_DOMAIN_DATA_API
} = assessmentEndpoints

export function submitAssessment(formData,nevigate) {
    return async (dispatch) => {
      console.log("SUBMIT ASSESSMENT API DATA............", formData);
      const toastId = toast.loading("Loading...");
      dispatch(setLoading(true));
      
      try {
        const response = await apiConnector("POST",SUBMIT_ASSESSMENT_API ,formData);  
        console.log("SUBMIT ASSESSMENT API RESPONSE............", response);
  
        if (response && response.data && response.data.success) {
          nevigate("/dashboard/Recomendation");
        } else {
          const errorMessage = response?.data?.message || "Unknown error occurred";
          throw new Error(errorMessage);
        }
      } catch (error) {
        console.log("SUBMIT ASSESSMENT API ERROR............", error);
        toast.error(`Could Not Submit Assessment: ${error.message}`);
      } finally {
        toast.dismiss(toastId);
        dispatch(setLoading(false));
      }
    };
};

export function getDomainData(domain) {
  return async (dispatch) => {
    console.log(domain);
    dispatch(setLoadingATDomain(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("GET", GET_DOMAIN_DATA_API,null,null ,{ domain });
      console.log("Domains............", response);

      if (response && response.data && response.data.success) {
        dispatch(setdomainData(response.data.domain.subdomains));
      } else {
        const errorMessage = response?.data?.message || "Unknown error occurred";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.log("Error getting the subdomians............", error);
      toast.error(`Could Not Submit Assessment: ${error.message}`);
    } finally {
      toast.dismiss(toastId);
      dispatch(setLoadingATDomain(false));
    }
  };
}