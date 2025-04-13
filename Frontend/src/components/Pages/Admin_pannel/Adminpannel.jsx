// //import React from "react";
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import {
//   ADD_PRODUCT_PATH,
//   ADDED_PRODUCT_CART_PATH,
// } from "../Router/Router-Constant";

// const Adminpannel = () => {
//   const navigate = useNavigate();
//   const [userRole, setUserRole] = useState("");
//   const [product, setProduct] = useState([]);

//   // useEffect(() => {
//   //   const postProducts = async () => {
//   //     try {
//   //       const response = await axios.post(
//   //         "http://localhost:4002/vegies/api/v1/products"
//   //       );
//   //       setProduct(response.data);
//   //     } catch (error) {
//   //       console.error("Error while fetching product", error);
//   //     }
//   //   };
//   //   postProducts();
//   // }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:4002/vegies/v1/api/products"
//         );
//         setProduct(res.data);
//       } catch (err) {
//         console.error("Error fetching data from API", err.message);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const storedRole = localStorage.getItem("userRole");
//     if (storedRole) {
//       setUserRole(storedRole);
//     } else {
//       setUserRole("");
//     }
//   }, []);

//   const handleAddItem = () => navigate(ADD_PRODUCT_PATH);

//   const handleAddToCart = () => navigate(ADDED_PRODUCT_CART_PATH);

//   return (
//     <>
//       <div className="">
//         <div className="container mt-4 bg-light homeContainer">
//           <div className="row justify-content-center imgContainer">
//             {product.length > 0 ? (
//               product.map((item) => (
//                 <div key={item.item_id} className="col-2 homeItems">
//                   <img
//                     src={item.item_img}
//                     alt="img"
//                     className="img-fluid homeImg"
//                   />
//                   <h5 className="text-centered">{item.item_name}</h5>
//                   <p className="itemDes">{item.item_description}</p>
//                   <button type="button" className="btn btn-warning">
//                     ₹ {item.item_price} / 500g
//                   </button>
//                   &nbsp;
//                   <button
//                     onClick={() => {
//                       if (!userRole) {
//                         alert("Your login is required to add items");
//                       } else if (userRole === "Admin") {
//                         handleAddItem();
//                       } else {
//                         handleAddToCart();
//                       }
//                     }}
//                     type="button"
//                     className="btn btn-primary"
//                   >
//                     {userRole === "Admin" ? "ADD-Item" : "ADD"}
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <span>Loading...</span>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Adminpannel;
