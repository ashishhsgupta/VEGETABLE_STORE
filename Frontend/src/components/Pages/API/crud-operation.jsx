import { _delete, _get, _post, _put } from "./api-client";
import { SOMETHING_WENT_WRONG } from "./message-constant,jsx";
import { showLoading } from "./global-function";


export const getAPIData = async(
    p_sURL, p_bLoadingNotReq, successCallback, failureCallback
) => {showLoading(p_bLoadingNotReq);
    if(!p_sURL){
        failureCallback && failureCallback(SOMETHING_WENT_WRONG);
        return;
    }
    try{
        const response = await _get(p_sURL);
        successCallback && successCallback(response);
        // showLoading(false);
    }catch(error){
        failureCallback && failureCallback(error);
        // showLoading(false);
    }finally{
        showLoading(false);
    }
};

export const postAPIData = async(
    p_sURL, p_oPayloadObj, p_bLoadingNotReq, successCallback, failureCallback
) => {showLoading(p_bLoadingNotReq);
    if(!p_sURL){
        failureCallback && failureCallback(SOMETHING_WENT_WRONG);
    }
    try{
        const response = await _post(p_sURL, p_oPayloadObj);
        successCallback && successCallback(response);
        showLoading(false);
    }catch(error){
        failureCallback && failureCallback(error);
        showLoading(false);
    }
};

export const putAPIData = async(p_sURL, p_oPayloadObj, p_bLoadingNotReq, successCallback,
 failureCallback) => {showLoading(p_bLoadingNotReq);
    if(!p_sURL){
        failureCallback && failureCallback(SOMETHING_WENT_WRONG);
    }
    try{
        const response = await _put(p_sURL, p_oPayloadObj);
        successCallback && successCallback(response);
        showLoading(false);
    }catch(error){
        failureCallback && failureCallback(error);
        showLoading(false);
    }
 };

 export const deleteAPIData = async(p_sURL, p_oPayloadObj, p_bLoadingNotReq, successCallback,
    failureCallback) => {showLoading(p_bLoadingNotReq);
        if(!p_sURL){
            failureCallback && failureCallback(SOMETHING_WENT_WRONG);
        }
        try{
            const response = await _delete(p_sURL, p_oPayloadObj);
            successCallback && successCallback(response);
            showLoading(false);
        }catch(error){
            failureCallback && failureCallback(error);
            showLoading(false);
        }
    };