export const checkLocalStorage = () =>{
    let hristoken = null;
    try {
        hristoken = localStorage.getItem("hristoken");
    } catch (error) {
        hristoken = null;
    }
    return hristoken; 
} 