import { enqueueSnackbar } from "notistack";

const loaderInstance = document.querySelector("#apiLoader");

export const showLoading = (p_bValue) => {
    if(p_bValue){
        loaderInstance.style.display = "none";
    }
}

export const showErrorMSG = (p_sMSG, p_bPersist) => {
    const snackbarId = enqueueSnackbar(p_sMSG,{
        variant: 'error',
        persist: p_bPersist
    })
}

export const showSuccessMSG = (p_sMSG, p_bPersist) => {
    const snackbarId = enqueueSnackbar(p_sMSG, {
        variant: 'success',
        persist: p_bPersist
    })
}

export const stripHtmlTags = (str) => {
    if(!str) return '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    const textContent = doc.body.textContent || "";

    return textContent.replace(/<[^>]*>?/gm, '');
};