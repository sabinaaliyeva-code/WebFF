export async function getProduct(){


try{
    let response = await fetch("../../data.json");
    let data= await response.json();
    return data;

}
catch(error){
    console.log("Error :", error);
    
}
    
    
}